'use strict'

module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    'Restaurant',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: 3,
            msg: 'Name must be at least 3 characters in length',
          },
        },
      },
      ownerId: {
        type: DataTypes.INTEGER,
      },
      avgRating: {
        type: DataTypes.FLOAT,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ['ownerId'] },
      },
    },
  )

  // Restaurant.prototype.toJSON = async function (models) {
  //   let restaurant = this.get()
  //   // review with max rating
  //   // restaurant.maxReview = await this.getReviews({
  //   //   order: [['rating', 'DESC']],
  //   //   limit: 1,
  //   // })
  //   // restaurant.avgRating = 4
  //   const values = Object.assign({}, restaurant)
  //   return values
  // }

  Restaurant.associate = function (models) {
    Restaurant.belongsTo(models.User, {
      foreignKey: 'ownerId',
      as: 'owner',
      onDelete: 'cascade',
    })

    Restaurant.hasMany(models.Review, { as: 'reviews' })
  }

  return Restaurant
}
