// setting
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'product') {
  require('dotenv').config()
}

const app = express()
const port = 3000

// template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// mongoose


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`This website is listened on http://localhost:${port}`)
})
