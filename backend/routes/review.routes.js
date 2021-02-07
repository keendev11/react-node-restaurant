const express = require('express')
const router = express.Router()
const authorize = require('../helpers/authorize')
const Role = require('../helpers/role')
const controller = require('../controllers/review.controller')
const db = require('../models')
const Review = db.Review

const setReview = async (req, res, next) => {
  await Review.findOne({
    include: [
      { model: db.User, as: 'user', attributes: ['id', 'name'] },
      { model: db.Restaurant, attributes: [] },
    ],
    where: {
      id: req.params.id,
      restaurantId: req.restaurant.id,
    },
  })
    .then((review) => {
      if (!review) {
        return res.status(404).json({ message: 'Not found' })
      }

      req.review = review
      next()
    })
    .catch((err) => res.status(400).json({ message: err.message }))
}

router.get('/', authorize(), controller.index)
router.post('/', authorize(Role.CLIENT), controller.create)
router.get('/:id', authorize(), setReview, controller.show)
router.patch(
  '/:id',
  authorize([Role.ADMIN, Role.OWNER]),
  setReview,
  controller.update,
)
router.delete('/:id', authorize([Role.ADMIN]), setReview, controller.delete)

module.exports = router
