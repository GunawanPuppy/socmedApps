const { User } = require ('../models')
const bcrypt = require ('bcryptjs')

class UserController {

    static loginForm(req, res){
        const { error } = req.query
        res.render('auth-pages/login-form', { error })
    }

    static registerForm(req, res){
        res.render('auth-pages/register-form')
    }

    static postRegister(req, res){
        //create user baru
        const { username, password, role } = req.body
        User.create({ username, password, role })
            .then(newUser => {
                res.redirect('/login')
            })
            .catch(err => res.send(err))
    }

    static postLogin(req, res){
        //apakah username dan password yang diinput, usernya ada
        //1. findOne User dari username
        //2. kalo user ada, compare plain password sama dengan hash password
        //2a. kalo user gak ada, gak boleh masuk ke home, keluar error  
        //3. kalo gak sama, gak boleh masuk ke home, keluar error
        //4. kalo pass sesuai, maka redirect ke home

        const { username, password } = req.body

        User.findOne({where: {username}})
        .then(user => {
            if (user){
                const isValidPassword = bcrypt.compareSync(password, user.password) //true or false

                if (isValidPassword){
                    //case berhasil login
                    req.session.userId = user.id //set session di controller login

                    return res.redirect('/')
                } else {
                  const error = "Invalid Username/Password"
                  return res.redirect(`/login?error=${error}`)
                }
            } else {
              const error = "Invalid Username/Password"
              return res.redirect(`/login?error=${error}`)
            }
        })
        .catch(err => res.send(err))
    }

    static getLogout (req, res){
        req.session.destroy((err) => {
            if (err) res.send(err)
            else{
                res.redirect('/login')
        }
        })
    }
}

module.exports = UserController