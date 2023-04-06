const express = require('express')
const randomCode = require('../../randomCode')
const router = express.Router()
const URL = require('../../models/shortener')
const port = 3000


// routes
router.get('/', (req, res) => {
  res.render('index')
})


router.post('/', (req, res) => {
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

module.exports = router