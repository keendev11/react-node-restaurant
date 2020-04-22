'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: 3,
            msg: 'Name must be at least 3 characters in length',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 128],
            msg: 'Email address must be between 6 and 128 characters in length',
          },
          isEmail: {
            msg: 'Email address must be valid',
          },
        },
        unique: {
          args: true,
          msg: 'Email is already in use!',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: 8,
          },
        },
      },
      role: {
        type: DataTypes.ENUM,
        values: ['admin', 'owner', 'client'],
      },
    },
    // {
    //   defaultScope: {
    //     attributes: { exclude: ['password'] },
    //   },
    // },
  )

  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get())

    delete values.password
    return values
  }

  return User
}
