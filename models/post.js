'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User,{foreignKey:'UserId'})
      Post.belongsToMany(models.Tag,{through: 'TagPosts'},{foreignKey:'PostId'})
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true,
        notNull : true,
       
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true,
        notNull : true,
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true,
        notNull : true,
        max : 255
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};