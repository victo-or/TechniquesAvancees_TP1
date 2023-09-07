import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.setTitle('Viewing Stock');
    }

    async getHtml() {
        const symbol = this.params.symbol; // Récupérez le symbole à partir de l'URL
        const stockData = await this.getStockData(symbol); // Utilisez une fonction pour obtenir les données de l'action boursière

        console.log("Symbol:", symbol);
        console.log("Stock Data:", stockData);

        // pour faire la conversion string du id en integer
        // const nu = Number(this.params.id)

        // async function getData(url) {
        //     const response = await fetch(url)
        //     return response.json()
        // }

        // const data = await getData('/static/js/views/stocks.json')

        // const article = data.find(item => item.id === nu)

        // return `
        //     <h1>`+article.title+`</h1>
        //     <p>`+article.descr+`</p>
        //     <strong>`+article.Author+`</strong>
        // `

        // Utilisez ces données pour afficher les informations que vous souhaitez dans votre vue
        const metaData = stockData["Meta Data"];
        const timeSeriesData = stockData["Time Series (60min)"];

        return `
            <h1>${symbol} Stock</h1>
            <p>Information: ${metaData["1. Information"]}</p>
            <p>Last Refreshed: ${metaData["3. Last Refreshed"]}</p>
            <p>Interval: ${metaData["4. Interval"]}</p>
            <!-- Affichez d'autres informations pertinentes ici -->
        `;
    }

    async getStockData(symbol) {
        const response = await fetch('/static/js/views/stocks.json');
        const data = await response.json();
        return data[symbol]; // Récupérez les données spécifiques à l'action boursière en utilisant le symbole
    }
}