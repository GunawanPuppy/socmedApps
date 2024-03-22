const UserController = require('../controllers/UserController')
const router = require('express').Router()

// GET /register
router.get('/register', UserController.registerForm)

// POST /register
router.post('/register', UserController.postRegister)

// GET /login
router.get('/login', UserController.loginForm)

router.post('/login', UserController.postLogin)

router.use(function (req, res, next){
    console.log(req.session);
    if (!req.session.userId){
        const error = 'Please login first!'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
    // console.log('Time:', Date.now());
    // next()
})

router.get('/logout', UserController.getLogout)

// const coba = function (req, res, next){
//     console.log('Time:', Date.now());
//     next()
// }