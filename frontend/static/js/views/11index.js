// 6 load view
import Home from "./views/Home.js"
import Settings from "./views/Settings.js"
import Stocks from "./views/Stocks.js"
import StockView from "./views/StockView.js"

// 9
// Ex.:    /stock-view/2
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    //console.log(Array.from(match.route.path.matchAll(/:(\w+)/g)))
    //return {}

    return Object.fromEntries(keys.map((key, i) =>{
        return [key, values[i]]
    }))
}


// 1 router
const router = async () => {
// console.log(pathToRegex("/stock-view/:id"));
    const routes = [
        {path: '/', view: Home},
        {path: '/stocks', view: Stocks},
        {path: '/stock-view/:id', view: StockView},
        {path: '/settings', view: Settings}
    ]

    // 2 match function
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            // isMatch: location.pathname === route.path
            // 9
            result: location.pathname.match(pathToRegex(route.path))
        }
    })
    // console.log(potentialMatches)

    // 3
    // let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null)

    // s'il n'y a pas de match, ça va simplement afficher la page '/'
    if(!match) {
        match = {
            route: routes[0],
            // isMatch: true
            result:[location.pathname]
        }
    }
    // console.log(match.result)

    // 7 instance de la classe
    // console.log(match.routeview())
    const view = new match.route.view(getParams(match));
    // console.log(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml()

}

// 4 récupérer le pathname
const navigateTo = url => {
    history.pushState(null, null, url)
    router()
}

// 8 history

window.addEventListener('popstate', router)

// 5
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        // ça fait que les liens avec attributs data-link ne vont pas refresh avec le e.preventDefault()
        if(e.target.matches("[data-link]")){
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })
    router()
})