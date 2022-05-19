module.exports = (sequelize, Sequelize) => {
  var Users = sequelize.define('users', {
    id: {
      type: Sequelize.UUID, 
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    picture: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  },{
    timestamps: true,
    underscored: true,
    freezeTableName: true
  });
  return Users;
}