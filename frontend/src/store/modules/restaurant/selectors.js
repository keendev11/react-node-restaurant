import { get } from 'lodash'

export const selectRestaurants = (state) => get(state, 'restaurant.restaurants')

export const selectRestaurant = (state) => get(state, 'restaurant.restaurant')

export const selectReviews = (state) => get(state, 'restaurant.reviews')

export const selectRestaurantStatus = (state) => get(state, 'restaurant.status')

export const selectRestaurantError = (state) => get(state, 'restaurant.error')
