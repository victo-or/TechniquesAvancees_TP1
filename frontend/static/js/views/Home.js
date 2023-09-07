import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor() {
        super()
        this.setTitle('Home')
    }

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
        <h1>Welcome to Meme Stocks Insider</h1>
        <p>Here's a list of our current meme stocks :</p>
        ${listStocks}
        `;
    }
    
}