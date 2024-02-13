let express = require('express')
let router = express.Router()

router.post('/dbapi', function(req, res, next) {
    console.log(req.body)
    res.send([{dayId: 1707771600000, text: 'helhjhjlo'},{dayId: 1709067600000, text: 'abcdfnjsnfjsnfjsnfj'}])
    // res.sendStatus(200)
})

module.exports = router
