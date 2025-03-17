'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('media_metadata', {
      media_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'messages', // References the `messages` table
          key: 'message_id', // References the `message_id` column
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      file_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_type: {
        type: Sequelize.ENUM('image', 'video', 'audio', 'document'),
        allowNull: false,
      },
      file_size: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      upload_status: {
        type: Sequelize.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('media_metadata');
  },
};