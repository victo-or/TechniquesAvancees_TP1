// 6. Charger les vues
import Home from "./views/Home.js"
import About from "./views/About.js"
import StockView from "./views/StockView.js"

// 9. Définir une expression régulière pour les routes
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

// 10. Obtenir les paramètres à partir d'une correspondance de route
const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]
    }))
}

// 1. Gérer les routes
const router = async () => {
    // 2. Définir les routes possibles avec leurs vues correspondantes
    const routes = [
        { path: '/', view: Home },
        // { path: '/stocks', view: Stocks },
        { path: '/stock-view/:symbol', view: StockView },
        { path: '/about', view: About }
    ]

    // 3. Rechercher une correspondance entre l'URL actuelle et les routes
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    })

    // 4. Trouver la première correspondance
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null)

    // 5. Si aucune correspondance, afficher la page par défaut ('/')
    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        }
    }

    // 6. Créer une instance de la vue correspondante
    const view = new match.route.view(getParams(match));

    // 7. Mettre à jour le contenu de l'élément HTML avec la vue
    document.querySelector("#app").innerHTML = await view.getHtml()
}

// 8. Naviguer vers une nouvelle URL
const navigateTo = url => {
    history.pushState(null, null, url)
    router()
}

// 9. Écouter les modifications de l'historique de navigation
window.addEventListener('popstate', router)

// 10. Exécuter le routeur lors du chargement du document
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        // 11. Empêcher le comportement par défaut des liens avec l'attribut data-link
        if (e.target.matches("[data-link]")) {
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })
    router()
})
