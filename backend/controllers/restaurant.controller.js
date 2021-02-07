const Role = require('../helpers/role')
const db = require('../models')
const Restaurant = db.Restaurant

module.exports = {
  index: async (req, res, next) => {
    const page = Number(req.query.page) || 1
    const per_page = Number(req.query.per_page) || 10

    let options = {
      include: [{ model: db.User, as: 'owner', attributes: ['id', 'name'] }],
      order: [['avgRating', 'DESC']],
      page: page,
      paginate: per_page,
    }

    if (req.currentUser.role === Role.OWNER) {
      options.where = { ownerId: req.currentUser.id }
    }

    await Restaurant.paginate(options)
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
    const payload = {
      ...req.body,
      ownerId: req.currentUser.id,
    }

    await Restaurant.create(payload)
      .then((data) => res.json(data))
      .catch((err) => next(err))
  },

  show: async (req, res) => {
    // minReview
    const restaurantId = req.restaurant.id
    const obj = Object.assign({}, req.restaurant.toJSON())
    obj.minReview = await db.Review.findOne({
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      order: [
        ['rating', 'ASC'],
        ['createdAt', 'DESC'],
      ],
      where: { restaurantId },
    })
    // maxReview
    obj.maxReview = await db.Review.findOne({
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      order: [
        ['rating', 'DESC'],
        ['createdAt', 'DESC'],
      ],
      where: { restaurantId },
    })
    // reviewed?
    if (req.currentUser.role === Role.CLIENT) {
      obj.reviewable =
        (await db.Review.findOne({
          where: { restaurantId, userId: req.currentUser.id },
        })) === null
    } else {
      obj.reviewable = false
    }
    res.json(obj)
  },

  update: async (req, res, next) => {
    await req.restaurant
      .update(req.body)
      .then((data) => res.json(data))
      .catch((err) => next(err))
  },

  delete: async (req, res, next) => {
    await req.restaurant
      .destroy()
      .then(() => res.json(true))
      .catch((err) => next(err))
  },
}
