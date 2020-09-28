const immoCtrl = require('./controllers/immo');
require('dotenv').config();

// Appelle la fonction getData() et affichage les données retournées
let leboncoin = {
    url: process.env.BC_URL,
    title: process.env.BC_TITLE,
    price: process.env.BC_PRICE
}

let seloger = {
    url: process.env.SL_URL,
    title: process.env.SL_TITLE,
    price: process.env.SL_PRICE
}



immoCtrl.getData(seloger).then(value => {
    console.log(value)
})