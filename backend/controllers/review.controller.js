const Role = require('../helpers/role')
const db = require('../models')
const Review = db.Review
const User = db.User
const Restaurant = db.Restaurant

module.exports = {
  index: async (req, res, next) => {
    const page = Number(req.query.page) || 1
    const per_page = Number(req.query.per_page) || 10

    Review.paginate({
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      page: page,
      paginate: per_page,
      order: [['id', 'ASC']],
    })
      .then((data) =>
        res.json({
          results: data.docs,
          currentPage: page,
          totalCount: data.total,
        }),
      )
      .catch((err) => next(err))
  },

  create: async (req, res, next) => {
    const rating = parseInt(req.body.rating) || 0
    const comment = req.body.comment || ''

    if (rating <= 0) {
      return res.status(400).json({ message: 'Rating is blank' })
    }

    if (comment.length == 0) {
      return res.status(400).json({ message: 'Comment is blank' })
    }

    let review = await Review.findOne({
      where: {
        restaurantId: req.restaurant.id,
        userId: req.currentUser.id,
      },
    })

    if (review) {
      return res.status(400).json({ message: 'Already left comment' })
    }

    review = Review.build({
      rating: rating,
      comment: comment,
      userId: req.currentUser.id,
      restaurantId: req.restaurant.id,
    })

    review
      .save()
      .then((data) => res.json(data))
      .catch((error) => next(error))
  },

  show: (req, res) => {
    res.json(req.review)
  },

  update: (req, res, next) => {
    let attributes
    if (req.currentUser.role === Role.OWNER) {
      attributes = {
        reply: req.body.reply,
      }
    } else {
      attributes = req.body
    }

    req.review
      .update(attributes)
      .then((data) => {
        // data.setDataValue('user', data.getUser())
        res.json(data)
      })
      .catch((err) => next(err))
  },

  delete: (req, res, next) => {
    req.review
      .destroy()
      .then(() => res.json(true))
      .catch((err) => next(err))
  },
}
