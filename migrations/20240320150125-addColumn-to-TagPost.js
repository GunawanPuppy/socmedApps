'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('TagPosts', 'TagId', {
      type : Sequelize.INTEGER,
      references: {
        model: "Tags",
        key:"id",
      },
      onUpdate : "cascade",
      onDelete: "cascade"
    })
    await queryInterface.addColumn('TagPosts', 'PostId', {
      type : Sequelize.INTEGER,
      references: {
        model: "Posts",
        key:"id",
      },
      onUpdate : "cascade",
      onDelete: "cascade"
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('TagPosts', 'TagId')
    await queryInterface.removeColumn('TagPosts','PostId')
  }
};
