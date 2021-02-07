import { createAction } from 'redux-actions'
import { resolvedAction, rejectedAction } from 'utils/actions'

/**
 * Constants
 */

export const LIST_RESTAURANT = 'LIST_RESTAURANT'
export const CREATE_RESTAURANT = 'CREATE_RESTAURANT'
export const GET_RESTAURANT = 'GET_RESTAURANT'
export const UPDATE_RESTAURANT = 'UPDATE_RESTAURANT'
export const DELETE_RESTAURANT = 'DELETE_RESTAURANT'
export const CLEAR_RESTAURANT = 'CLEAR_RESTAURANT'

export const LIST_REVIEW = 'LIST_REVIEW'
export const CREATE_REVIEW = 'CREATE_REVIEW'
export const UPDATE_REVIEW = 'UPDATE_REVIEW'
export const DELETE_REVIEW = 'DELETE_REVIEW'

/**
 * Action Creators
 */

export const listRestaurant = createAction(LIST_RESTAURANT)
export const listRestaurantSuccess = createAction(
  resolvedAction(LIST_RESTAURANT),
)
export const listRestaurantFail = createAction(rejectedAction(LIST_RESTAURANT))

export const createRestaurant = createAction(CREATE_RESTAURANT)
export const createRestaurantSuccess = createAction(
  resolvedAction(CREATE_RESTAURANT),
)
export const createRestaurantFail = createAction(
  rejectedAction(CREATE_RESTAURANT),
)

export const getRestaurant = createAction(GET_RESTAURANT)
export const getRestaurantSuccess = createAction(resolvedAction(GET_RESTAURANT))
export const getRestaurantFail = createAction(rejectedAction(GET_RESTAURANT))

export const updateRestaurant = createAction(UPDATE_RESTAURANT)
export const updateRestaurantSuccess = createAction(
  resolvedAction(UPDATE_RESTAURANT),
)
export const updateRestaurantFail = createAction(
  rejectedAction(UPDATE_RESTAURANT),
)

export const deleteRestaurant = createAction(DELETE_RESTAURANT)
export const deleteRestaurantSuccess = createAction(
  resolvedAction(DELETE_RESTAURANT),
)
export const deleteRestaurantFail = createAction(
  rejectedAction(DELETE_RESTAURANT),
)

export const clearRestaurant = createAction(CLEAR_RESTAURANT)

export const listReview = createAction(LIST_REVIEW)
export const listReviewSuccess = createAction(resolvedAction(LIST_REVIEW))
export const listReviewFail = createAction(rejectedAction(LIST_REVIEW))

export const createReview = createAction(CREATE_REVIEW)
export const createReviewSuccess = createAction(resolvedAction(CREATE_REVIEW))
export const createReviewFail = createAction(rejectedAction(CREATE_REVIEW))

export const updateReview = createAction(UPDATE_REVIEW)
export const updateReviewSuccess = createAction(resolvedAction(UPDATE_REVIEW))
export const updateReviewFail = createAction(rejectedAction(UPDATE_REVIEW))

export const deleteReview = createAction(DELETE_REVIEW)
export const deleteReviewSuccess = createAction(resolvedAction(DELETE_REVIEW))
export const deleteReviewFail = createAction(rejectedAction(DELETE_REVIEW))
