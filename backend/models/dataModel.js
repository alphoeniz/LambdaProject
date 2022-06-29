const Sequelize = require('sequelize');
const db = require ("../config/database").db;
const { DataTypes } = Sequelize;

const User = db.define('User', {
    Name: {
       type: DataTypes.STRING
    },
    UID: {
    type: DataTypes.STRING
    },
    Password: {
    type: DataTypes.STRING
    },
    Gender: {
    type: DataTypes.CHAR
    },
    DOB: {
    type: DataTypes.DATE
    },
    // mailId: {
    // type: DataTypes.DOUBLE
    // }
}, {
freezeTableName: true,
timestamps: false
});
module.exports = {User};
