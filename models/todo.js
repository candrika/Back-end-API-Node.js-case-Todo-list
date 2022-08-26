'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todo.init({
    activity_id: DataTypes.INTEGER,
    is_active: DataTypes.TINYINT,
    title: DataTypes.STRING,
    priority:{
      type: DataTypes.ENUM('verry-high','high','medium','low','verry-low'),
      defaultValue: 'verry-high',
    } 
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};