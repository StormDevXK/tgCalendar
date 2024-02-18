let express = require('express')
const seq = require('../dbmodels')
let router = express.Router()


router.post('/dbapi', async function(req, res, next) {
    console.log(req.body)
    if(req.body.func === 'getData') {
        res.send(await seq.Note.findAll({raw: true}))
    }
    else if(req.body.func === 'sendNewNote') {
        await seq.Note.create({userId: req.body.userId, text: req.body.text.toString(), primaryNote: 0})
        res.sendStatus(200)
    }
    const t = await seq.Note.findAll({raw: true})
    console.log(t)
})

module.exports = router
