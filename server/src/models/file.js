module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    file_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'messages', // References the `messages` table
        key: 'message_id', // References the `message_id` column
      },
    },
    file_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_size: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    upload_status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      defaultValue: 'pending',
    },
  }, {
    tableName: 'file', // Explicitly define the table name
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  });

  File.associate = (models) => {
    File.belongsTo(models.Message, {
      foreignKey: 'message_id', // Foreign key in `media_metadata`
      as: 'message', // Alias for the association
    });
  };

  return File;
};