const {Post,Tag,TagPost,Comment,User,Profile} = require('../models/index')

class Controller {
    static async home (req,res){
        try {
            res.render('home')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller