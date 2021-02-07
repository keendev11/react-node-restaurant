const express = require('express')
const router = express.Router()
const authorize = require('../helpers/authorize')
const Role = require('../helpers/role')
const authRoute = require('./auth.routes')
const meRoute = require('./me.routes')
const userRoute = require('./user.routes')
const restaurantRoute = require('./restaurant.routes')

router.use('/auth', authRoute)
router.use('/me', authorize(), meRoute)
router.use('/users', authorize(Role.ADMIN), userRoute)
router.use('/restaurants', restaurantRoute)

module.exports = router
