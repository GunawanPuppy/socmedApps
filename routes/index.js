const Controller = require('../controllers/controller')
const router = require('express').Router()

/*
middleware bisa lebih dari 1 , global dengan yang tidak global
router.use(function(req,res,next){
    console.log('Time:', Date.now(), "Halohaaaa")
    next()
})
*/
//perlu get register 
router.get('/register',Controller.registerForm)
//post register
router.post('/register',Controller.postRegister)

router.get('/login',Controller.loginForm)
router.post('/login',Controller.postLogin)

// router.use(function(req,res,next){
//         console.log(req.session);
//         if(!req.session.user.id){
//             const errors = "Please login first"
//             res.redirect(`/login?errors=${errors}`)
//         }else{
//             next()
//         }
// })


router.get('/home', Controller.home)
router.get('/profile', Controller.seeProfile)
router.get('/home/add', Controller.renderAdd)
router.post('/home/add',Controller.handlerAdd)
router.get('/home/edit/:id',Controller.renderEdit)
router.post('/home/edit/:id',Controller.handlerEdit)
router.get('/home/delete/:id', Controller.deletePost)







module.exports= router