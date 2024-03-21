'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post,{foreignKey:'UserId'})
      User.hasOne(models.Profile,{foreignKey:'UserId'})
      User.hasMany(models.Comment,{foreignKey:'UserId'})
    }
  }
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull : false,
      validate :{
        notEmpty : true,
        min : 5
      }
       },
    email: {
      type:DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true,
        min : 8
      }
    },
    role: {
      type:DataTypes.STRING,
      allowNull : false,
    }
  }, {
    hooks : {
      //akan dijalankan sebelum query
      //CompareSync hasilnya true and false buat bandingin
      beforeCreate(instance,options){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password,salt);
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};