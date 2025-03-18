module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('sent', 'delivered', 'read'),
      defaultValue: 'sent',
    },
    sequence_number: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'messages', // Explicitly define the table name
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  });

  Message.associate = (models) => {
    Message.hasMany(models.File, {
      foreignKey: 'message_id', // Foreign key in `media_metadata`
      as: 'media', // Alias for the association
    });

    Message.belongsTo(models.User, {
      foreignKey: 'sender_id', // Foreign key in `messages`
      as: 'sender', // Alias for the association
    });

    Message.belongsTo(models.User, {
      foreignKey: 'receiver_id', // Foreign key in `messages`
      as: 'receiver', // Alias for the association
    });
  };

  return Message;
};