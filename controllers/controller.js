const {Post,Tag,TagPost,Comment,User,Profile} = require('../models/index')
const bcrypt = require('bcryptjs');
const {Op} = require('sequelize');


const formatContent = require('../helper/formatContent');

class Controller {

    static async loginForm(req,res){
        try {
            const{errors} = req.query
            res.render('login',{errors})
        } catch (error) {
            res.send(error)
        }
    } 

    // static async postLogin(req,res){
    //     try {
    //         //apakah username dan password yang diinput, usernya ada?
    //         //1. findOne User dari username
    //         //2. kalo user ada, compare plain password apakah sama dengan hash password (di db)
    //         //2a. kalo user gak ada, gak boleh masuk ke home, keluar error
    //         //3. kalo ga sama gaboleh masuk ke home / keluar error
    //         //4. kalo password sesuai maka redirect  ke home
            
    //         const {username,password} = req.body
    //         const user = await User.findOne({ where: { username } });

    //         if (user) {
    //             const isValidPassword = bcrypt.compareSync(password, user.password);
    //             if (isValidPassword) {
    //                 //case berhasil login 
    //                 // req.session.userId = user.id //set session di controller login
    //                 console.log(req.session);
    //                 req.session.userId = user.id
    //                 return res.redirect('/home');
    //             } else {
    //                 const err = "invalid username/password";
    //                 return res.redirect(`/login?errors=${err}`);
    //             }
    //         } else {
    //             const err = "invalid username/password";
    //             return res.redirect(`/login?errors=${err}`);
    //         }

    //     } catch (error) {
    //         res.send(error)
    //     }
    // }

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
                    // console.log(req.session , "ini dari controller");
                    req.session.userId = user.id //set session di controller login
                    // console.log(req.session, "ini dari dibawahnya");
                    console.log(user.id)
                    return res.redirect(`/home/${user.id}`)
                } else {
                  const error = "Invalid Username/Password"
                  return res.redirect(`/login?error=${error}`)
                }
            } else {
              const error = "Invalid Username/Password"
              return res.redirect(`/login?error=${error}`)
            }
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }

 
    static async registerForm(req,res){
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }
    static async postRegister(req,res){
        try {
            const {username,email,password,role}  = req.body
            await User.create({
                username,
                email,
                password,
                role
            })
            res.redirect('/login')
        } catch (error) {
            res.send(error)
        }
    }

    static getLogout (req, res){
        req.session.destroy((err) => {
            if (err) res.send(err)
            else{
                res.redirect('/login')
        }
        })
    }
 
    static async home(req, res) {
        try {
            const {search} = req.query;
            const {userId} = req.params;
            // console.log(req.params);
            // console.log(req.query);
            let options = {};

            if(search){
                options.where = {
                    content : {
                        [Op.iLike]: `%${search}%`
                    }
                }
            }
            let data = await Post.findAll({
                include: {
                    model: User,
                    include: Comment
                },
                ...options //tambahin fitur search 
            });
    
            // console.log(data, "ini data di homeee");
            res.render('home', { data,formatContent });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async profile(req,res){
        try {
            const {id} = req.params
            let data = await Profile.seeProfile(id)
            console.log(data, "ini data profilee");
            res.render('profile',{data})
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async renderAdd(req,res){
        try {
            res.render('add')
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerAdd(req,res){
        try {
            const{userId} = req.session.userId
            const{title,content,imageUrl} = req.body
            console.log(req.body , "ini req bodyyy broo");
            await Post.create({
               title,
               content,
               imageUrl, 
               UserId : userId //Harus ada session dulu 
            })
            res.redirect(`/home/:${userId}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async renderEdit(req,res){
        try {
            const {id} = req.params
            let data = await Post.findByPk(id)
            console.log(data);
            res.render('edit', {data})
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerEdit(req,res){
        try {
            const{id} = req.params
            console.log(req.params,"ini dari id");
            const{title,content,imageUrl} = req.body
            console.log(req.body,"ini dari edit");
            await Post.update({
              title,
              content,
              imageUrl
            },{
                where:{
                    id
                }
            })
            res.redirect('/home')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async deletePost (req,res){
        try {
            const {id} = req.params
            console.log(req.params);
            let data = await Post.destroy({
                where:{
                    id
                }
            })
            console.log(data, "ini delete");
            res.redirect(`/home`)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller