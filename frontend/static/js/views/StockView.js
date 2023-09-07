import AbstractView from "./AbstractView.js";
const stocks = ["TSLA", "NIO", "GME", "AMC", "PLTR", "SPCE", "MVIS", "MARA", "RIOT", "SNDL"];

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.setTitle('Viewing Stock');
    }

    async getHtml() {
        const symbol = this.params.symbol; // Récupérer le symbole à partir de l'URL

        // Convertir le symbole entré en majuscules
        const symbolUpperCase = symbol.toUpperCase();
        const stockData = await this.getStockData(symbolUpperCase); // Utiliser une fonction pour obtenir les données du stock

        console.log("Symbol:", symbolUpperCase);
        console.log("Stock Data:", stockData);

        // Vérifier si le symbole existe dans le tableau "stocks" (en majuscules)
        if (!stocks.includes(symbolUpperCase)) {
            return `
                <h1>Stock not found</h1>
                <p>The symbol "${symbolUpperCase}" does not exist among our stock list.</p>
                <p><a href="/" data-link>See our current meme stocks</a></p>
            `;
        }

        // Vérifiez si la note existe dans les données (lorsque l'api ne renvoie pas les données)
        if ("Note" in stockData) {
            return `
                <a href="/" data-link><< Back to list</a>
                <h1>${symbolUpperCase} Stock</h1>
                <p>Data is temporarily not available. Please try again later!</p>
            `;
        }

        const metaData = stockData["Meta Data"];

        // Obtenez la première date du tableau "Time Series (5min)"
        const firstDate = Object.keys(stockData["Time Series (5min)"])[0];
        const firstData = stockData["Time Series (5min)"][firstDate];

        return `
            <a href="/" data-link><< Back to list</a>
            <h1>${symbolUpperCase} Stock</h1>
            <p>Information: ${metaData["1. Information"]}</p>
            <p>Last Refreshed: ${metaData["3. Last Refreshed"]}</p>
            <p>Interval: ${metaData["4. Interval"]}</p>
            <p>Open: ${firstData["1. open"]}</p>
            <p>High: ${firstData["2. high"]}</p>
            <p>Low: ${firstData["3. low"]}</p>
            <p>Close: ${firstData["4. close"]}</p>
            <p>Volume: ${firstData["5. volume"]}</p>
        `;

    }

    async getStockData(symbolUpperCase) {
        const response = await fetch('/static/js/views/stocks.json');
        const data = await response.json();
        return data[symbolUpperCase]; // Récupérez les données spécifiques au stock en utilisant le symbole
    }
}