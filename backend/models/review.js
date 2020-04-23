'use strict'

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      comment: DataTypes.STRING,
      reply: {
        type: DataTypes.STRING,
      },
      rating: DataTypes.INTEGER,
      userId: {
        type: DataTypes.INTEGER,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ['userId', 'restaurantId'] },
      },
    },
  )

  Review.associate = function (models) {
    Review.belongsTo(models.Restaurant, {
      onDelete: 'cascade',
    })
    Review.belongsTo(models.User, { as: 'user', onDelete: 'cascade' })
  }

  const updateAvgRating = async (review, options) => {
    await review.reload()
    const restaurant = await review.getRestaurant()
    const ratings = await restaurant.getReviews({
      attributes: ['rating'],
    })
    const count = ratings.length
    let sum = 0

    if (count > 0) {
      sum = ratings.reduce((a, b) => a + b.rating, 0)
    }

    restaurant.set('avgRating', count > 0 ? sum / count : 0)
    await restaurant.save()
  }

  Review.addHook('afterSave', (review, options) => {
    updateAvgRating(review, options)
  })

  Review.addHook('afterDestroy', (review, options) => {
    updateAvgRating(review, options)
  })

  return Review
}
