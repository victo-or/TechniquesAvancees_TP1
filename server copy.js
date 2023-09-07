const express = require('express');
const app = express();
const request = require('request');
const { PORT } = require('./config.js');
const { API_KEY } = require('./config.js');
const fs = require('fs');
const path = require("path");
const stocks = ["TSLA", "AAPL", "PLTR", "NIO", "GME", "AMC", "MARA", "RIOT"];


app.use("/static", express.static(path.resolve(__dirname, 'frontend', 'static')))

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"))
})

// app.get('/ticker=:id', function(req, res){
//     // res.end(req.params.id)
//     var ticker = req.params.id;
//     const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+ticker+'&interval=60min&apikey=+'+API_KEY;

//     request.get({
//         url: url,
//         json: true,
//         headers: {'User-Agent': 'request'}
//       }, (err, res, data) => {
//         if (err) {
//           console.log('Error:', err);
//         } else if (res.statusCode !== 200) {
//           console.log('Status:', res.statusCode);
//         } else {
//           // data is successfully parsed as a JSON object:
//           var newData = JSON.stringify(data);
//           fs.writeFile(__dirname+'/'+ticker+'.json', newData, err => {
//             if(err) throw err;
//             console.log('Success!')
//           })
//           // console.log(data);

//         }
//     });
//     // res.send('success!');
// });

// app.get('/list-result=:id', function (req, res) {
//     var ticker = req.params.id;
//     fs.readFile(__dirname+'/'+ticker+".json", "utf-8", function(err, data){
//         if(err) throw err;
//         // console.log(data);
//         res.send(JSON.parse(data));
//     })
// })

app.get('/update-stocks', function(req, res) {
    // Boucle sur les actions boursières
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
    res.send('Mise à jour des fichiers JSON en cours...');
});

app.listen(PORT, () => {
    console.log("Server is running on PORT", PORT);
});