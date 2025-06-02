
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Account = require('./account');

const Destination = sequelize.define('Destination', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  httpMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  headers: {
    type: DataTypes.JSON,
    allowNull: false
  }
});

Account.hasMany(Destination, { onDelete: 'CASCADE' });
Destination.belongsTo(Account);

module.exports = Destination;
