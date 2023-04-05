// setting
const express = require('express')
const exphbs = require('express-handlebars')
const hbs = exphbs.create({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoProperties: true,
    allowProtoMethods: true
  }
})
const mongoose = require('mongoose')
const URL = require('./models/shortener')
const bodyParser = require('body-parser')
const randomCode = require('./randomCode')


if (process.env.NODE_ENV !== 'product') {
  require('dotenv').config()
}

const app = express()
const port = 3000

// template engine
// app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

// mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log(`mongodb error`)
})

db.once('open', () => {
  console.log(`mongodb is connected`)
})


// routes
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/:url', (req, res) => {
  const { url } = req.params
  res.render('succeed')
})

app.post('/', (req, res) => {
  const originLink = req.body.originLink

  if (originLink.trim() === '') {
    return res.redirect('/')
  }

  const code = randomCode()
  const shortenLink = `http://localhost:${port}/${code}`

  const url = {
    originLink: originLink.toString(),
    shortenLink: shortenLink.toString()
  }


  URL.findOne({ originLink: req.body.originLink })
    .then(urlData => {
      if (urlData) {
        const url = urlData
        const originUrl = url.originLink
        const shortenUrl = url.shortenLink
        console.log(`資料庫有查到相同網紙 返回存取過的`)
        res.render('succeed', { url: { originLink: originUrl, shortenLink: shortenUrl } })
      } else {
        URL.create(url)
          .then(() => res.render('succeed', { url }))
          .catch(err => {
            console.log(err)
            res.render('errPage', { error: err.message })
          })
      }
    })
    .catch(err => {
      console.log(err)
    })

})



// listen website
app.listen(port, () => {
  console.log(`This website is listened on http://localhost:${port}`)
})
