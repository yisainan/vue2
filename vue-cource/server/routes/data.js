var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/getUserInfo', function (req, res, next) {
  res.send('success')
})

router.post('/formData', function (req, res, next) {
  console.log(req.body)
  if (req.body.name !== 'lison') {
    res.status(401).send({
      name: '姓名不对'
    })
  } else res.send('success')
})

module.exports = router
