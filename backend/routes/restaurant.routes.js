const express = require('express')
const router = express.Router()
const authorize = require('../helpers/authorize')
const Role = require('../helpers/role')
const controller = require('../controllers/restaurant.controller')
const reviewsRoute = require('./review.routes')

const db = require('../models')
const Restaurant = db.Restaurant

const setRestaurant = async (req, res, next) => {
  console.log('restaurant.routes', req.method)
  await Restaurant.findByPk(req.params.id, {
    include: [{ model: db.User, as: 'owner', attributes: ['id', 'name'] }],
  })
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(404).json({ message: 'Not found' })
      }

      if (
        req.method !== 'GET' &&
        req.currentUser.role === Role.OWNER &&
        req.currentUser.id !== restaurant.ownerId
      ) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      req.restaurant = restaurant
      next()
    })
    .catch((err) => res.status(400).json({ message: err.message }))
}

const setRestaurantForReview = async (req, res, next) => {
  await Restaurant.findByPk(req.params.restaurantId)
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(404).json({ message: 'Not found' })
      }

      req.restaurant = restaurant
      next()
    })
    .catch((err) => res.status(400).json({ message: err.message }))
}

router.get('/', authorize(), controller.index)
router.post('/', authorize(Role.OWNER), controller.create)
router.get('/:id', authorize(), setRestaurant, controller.show)
router.patch(
  '/:id',
  authorize([Role.ADMIN, Role.OWNER]),
  setRestaurant,
  controller.update,
)
router.delete('/:id', authorize([Role.ADMIN]), setRestaurant, controller.delete)
router.use('/:restaurantId/reviews', setRestaurantForReview, reviewsRoute)

module.exports = router
