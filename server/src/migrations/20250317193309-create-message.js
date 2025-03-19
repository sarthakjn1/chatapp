'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      sender_id: {
        type: Sequelize.INTEGER
      },
      receiver_id: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM('sent', 'delivered', 'read')
      },
      sequence_number: {
        type: Sequelize.BIGINT,
        primaryKey: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};