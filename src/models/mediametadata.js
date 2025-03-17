module.exports = (sequelize, DataTypes) => {
  const MediaMetadata = sequelize.define('MediaMetadata', {
    media_id: {
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
      type: DataTypes.ENUM('image', 'video', 'audio', 'document'),
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
    tableName: 'media_metadata', // Explicitly define the table name
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  });

  MediaMetadata.associate = (models) => {
    MediaMetadata.belongsTo(models.Message, {
      foreignKey: 'message_id', // Foreign key in `media_metadata`
      as: 'message', // Alias for the association
    });
  };

  return MediaMetadata;
};