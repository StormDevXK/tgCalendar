const { Sequelize, DataTypes} = require('sequelize')
// module.exports = new Sequelize({
const sequelize = new Sequelize({
    storage: 'db.sqlite',
    dialect: 'sqlite',
})

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
        },
        username: {
            type: DataTypes.STRING,
            defaultValue: 'None',
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    }
)

const Note = sequelize.define(
    'Note',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            defaultValue: 'None',
        },
        primaryNote: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
    }
)

// User.sync({ alter: true })
// Note.sync({ alter: true })
// Note.sync()

module.exports = {User, Note}