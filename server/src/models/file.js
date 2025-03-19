module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    file_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sequence_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'messages', // References the `messages` table
        key: 'sequence_number', // References the `sequence_number` column
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
      foreignKey: 'sequence_number', // Foreign key in `media_metadata`
      as: 'message', // Alias for the association
    });
  };

  return File;
};