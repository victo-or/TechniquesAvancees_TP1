const express = require('express');
const app = express();
const request = require('request');
const { PORT } = require('./config.js');
const { API_KEY } = require('./config.js');
const fs = require('fs');
const path = require("path");
const stocks = ["TSLA", "AAPL", "PLTR", "NIO", "GME", "AMC", "MARA", "RIOT"];

// Fonction pour mettre à jour les fichiers JSON au démarrage du serveur
function updateStockFiles() {
    stocks.forEach(ticker => {
        const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + ticker + '&interval=60min&apikey=' + API_KEY;

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
                var newData = JSON.stringify(data);
                fs.writeFile(__dirname + '/' + ticker + '.json', newData, err => {
                    if (err) throw err;
                    console.log('Mise à jour du fichier ' + ticker + '.json réussie!');
                });
            }
        });
    });
}

// Mettez à jour les fichiers au démarrage du serveur
updateStockFiles();

app.use("/static", express.static(path.resolve(__dirname, 'frontend', 'static')))

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"))
});

app.listen(PORT, () => {
    console.log("Le serveur est en cours d'exécution sur le PORT", PORT);
});
