const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const User = sequelize.define('User', {
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pros: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cons: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'reviews' ,
    timestamps: false
});

module.exports = User;
