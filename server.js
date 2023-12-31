const express = require('express');
const app = express();
const request = require('request');
const { PORT } = require('./config.js');
const { API_KEY } = require('./config.js');
const { stocks } = require('./config.js');
const fs = require('fs');
const path = require("path");


// Fonction pour mettre à jour les données des stocks et les enregistrer dans stocks.json
function updateStockData() {
    const stockData = {}; // Créez un objet vide pour stocker les données des stocks

    // Boucle sur le tableau des stocks 
    stocks.forEach(ticker => {
        const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + ticker + '&interval=5min&apikey=' + API_KEY;

        request.get({
            url: url,
            json: true,
            headers: { 'User-Agent': 'request' }
        }, (err, response, data) => {
            if (err) {
                console.log('Error:', err);
            } else if (response.statusCode !== 200) {
                console.log('Status:', response.statusCode);
            } else {
                // Données avec succès récupérées en tant qu'objet JSON
                stockData[ticker] = data; // Stockez les données dans l'objet par symbole d'action
                console.log('Mise à jour des données pour ' + ticker + ' réussie!');

                // Vérifiez si toutes les données sont mises à jour avant d'enregistrer le fichier JSON
                if (Object.keys(stockData).length === stocks.length) {
                    fs.writeFile(path.resolve(__dirname, 'frontend', 'static', 'js', 'views', 'stocks.json'), JSON.stringify(stockData), err => {
                        if (err) throw err;
                        console.log('Mise à jour du fichier stocks.json réussie!');
                    });
                }
            }
        });
    });
}

// Mettre à jour les données des stocks au démarrage du serveur
updateStockData();

app.use("/static", express.static(path.resolve(__dirname, 'frontend', 'static')))

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"))
});

app.listen(PORT, () => {
    console.log("Le serveur est en cours d'exécution sur le PORT", PORT);
});
