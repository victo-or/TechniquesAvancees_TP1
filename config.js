const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    PORT: process.env.PORT,
    API_KEY: process.env.API_KEY,
    // tableau avec les 10 stocks sélectionnés
    stocks: ["TSLA", "NIO", "GME", "AMC", "PLTR", "SPCE", "MVIS", "MARA", "RIOT", "SNDL"]
};