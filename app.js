// setting
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
const hbs = exphbs.create({ defaultLayout: 'main', runtimeOptions: { allowProtoProperties: true, allowProtoMethods: true } })

if (process.env.NODE_ENV !== 'product') {
  require('dotenv').config()
}
const app = express()
const port = 3000

// mongoose
require('./config/mogoose')
// template engine
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// routes
app.use(routes)

// listen website
app.listen(port, () => {
  console.log(`This website is listened on http://localhost:${port}`)
})
