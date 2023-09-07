import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor() {
        super()
        this.setTitle('Home')
    }

    // async getHtml(){
    //     return `
    //         <h1>Bienvenue SPA</h1>
    //         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore, sequi laboriosam. Ratione quos harum ad excepturi aliquam, repellat aliquid assumenda eum cupiditate earum, quae tempora neque ea temporibus, at eligendi!</p>
    //         <p>
    //             <a href="/posts" data-link>Voir les posts</a>
    //         </p>
    //     `
    // }

    // async getHtml() {

    //     async function getData (url) {
    //         const response  = await  fetch(url)
    //         return response.json()
    //     }

    //     const data = await getData('/static/js/views/stocks.json')

    //     let listStocks = "<ul>"
    //     for(let i in data){
    //         listStocks +="<li><a href='/stock-view/"+data[i]['id']+"' data-link>"+data[i]['title']+"</a></li>"
    //     }
    //     listStocks +="</ul>"
    //     return `
    //     <h1>Stocks</h1>
    //     `+listStocks
    // }

    async getHtml() {
        async function getData(url) {
            const response = await fetch(url);
            return response.json();
        }
    
        const data = await getData('/static/js/views/stocks.json');
    
        let listStocks = "<ul>";
        for (let symbol in data) {
            listStocks += `<li><a href='/stock-view/${symbol}' data-link>${symbol}</a></li>`;
        }
        listStocks += "</ul>";
    
        return `
        <h1>Stocks</h1>
        ${listStocks}
        `;
    }
    
}