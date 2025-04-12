/**
currency converter program that reads the currency and provides
the exchange rate that is fetched from the api
 */

// using strict mode
"use strict"

// importing express axios and body-parser
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

// instantiate express app
const app = express()

// server running on port 3000
const PORT = 3000

// set ejs as view engine
app.set('view engine', 'ejs')

// body-parser middleware to read form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true
    }));
	
// function that gets the input currency and returns the data from api call
async function getData(fromCUR) {
    try {
        //console.log("HI " + toCUR, fromCUR)
        const response = await axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCUR}.json`)
            return response.data
    } catch (err) {
        console.error(err)
    }
}

// post function that calls and returns the api for the currency pair
app.post('/', async(req, res) => {
    const toCUR = req.body.toCUR
        const fromCUR = req.body.fromCUR
        const result = await getData(fromCUR);
    console.log(result)
    //var jsonObj = JSON.parse(JSON.stringify(result))
    //console.log(typeof jsonObj)
    //res.json(result[fromCUR][toCUR])
    let ansCUR = result[fromCUR][toCUR]
        res.render('index', {
            ansCUR: ansCUR,
            fromCUR: fromCUR,
            toCUR: toCUR
        })

})

// returns the home page
app.get('/', (req, res) => {
    res.render('index', {
        ansCUR: null,
        fromCUR: null,
        toCUR: null
    })
})

// server intialized on port 3000
app.listen(PORT, () => {
    console.log('server running on 3000')
})
