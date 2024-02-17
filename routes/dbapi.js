let express = require('express')
const seq = require('../dbmodels')
let router = express.Router()


router.post('/dbapi', async function(req, res, next) {
    // console.log(req.body)
    // res.send([{dayId: 1707771600000, text: 'helhjhjlo'},{dayId: 1709067600000, text: 'abcdfnjsnfjsnfjsnfj'}])
    res.send(await seq.Note.findAll({raw: true}))
    // res.sendStatus(200)
    // await seq.Note.create({userId: 31234, text: 'do??', primaryNote: 1})
    const t = await seq.Note.findAll({raw: true})
    console.log(t)
})

module.exports = router
