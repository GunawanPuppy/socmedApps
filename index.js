const Controller = require('./controllers/controller')
const router = require('express').Router()

router.get('/home', Controller.home)






module.exports= router