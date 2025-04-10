//"use strict"

const express = require('express')

const axios = require('axios')

const bodyParser = require('body-parser')

const app = express()

const PORT = 3000

app.set('view engine', 'ejs')

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

async function getData(fromCUR){
	try{
		//console.log("HI " + toCUR, fromCUR)
		const response = await axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCUR}.json`)	
		return response.data
	}
	catch(err){
		console.error(err)
	}
}

app.post('/', async (req, res) => {
	const toCUR = req.body.toCUR
	const fromCUR = req.body.fromCUR
	const result = await getData(fromCUR);
	console.log(result)
	//var jsonObj = JSON.parse(JSON.stringify(result))
	//console.log(typeof jsonObj)
	//res.json(result[fromCUR][toCUR])
	let ansCUR = result[fromCUR][toCUR]
	res.render('index', {ansCUR: ansCUR})
	
	
})

app.get('/', (req, res) => {
	res.render('index', {ansCUR: null})
})

app.listen(PORT, ()=>{
	console.log('server running on 3000')
})