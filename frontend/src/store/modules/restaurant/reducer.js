import { handleActions, combineActions } from 'redux-actions'
import { RESET_ERROR } from 'store/modules/global'
import { resolvedAction, rejectedAction } from 'utils/actions'

import {
  LIST_RESTAURANT,
  GET_RESTAURANT,
  CREATE_RESTAURANT,
  UPDATE_RESTAURANT,
  DELETE_RESTAURANT,
  CLEAR_RESTAURANT,
  LIST_REVIEW,
  CREATE_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
} from './actions'

const initialState = {
  restaurants: {
    currentPage: 1,
    totalCount: 0,
    results: [],
  },
  restaurant: null,
  reviews: {
    currentPage: 1,
    totalCounts: 0,
    results: [],
  },
  status: 'INIT',
  error: null,
}

export const reducer = handleActions(
  {
    [combineActions(
      LIST_RESTAURANT,
      GET_RESTAURANT,
      CREATE_RESTAURANT,
      UPDATE_RESTAURANT,
      DELETE_RESTAURANT,
      LIST_REVIEW,
      CREATE_REVIEW,
      UPDATE_REVIEW,
      DELETE_REVIEW,
    )]: (state, { type }) => ({
      ...state,
      error: null,
      status: type,
    }),
    [resolvedAction(LIST_RESTAURANT)]: (state, { payload, type }) => ({
      ...state,
      restaurants: payload,
      status: type,
    }),
    [resolvedAction(CREATE_RESTAURANT)]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [resolvedAction(GET_RESTAURANT)]: (state, { payload, type }) => ({
      ...state,
      restaurant: payload,
      status: type,
    }),
    [resolvedAction(UPDATE_RESTAURANT)]: (state, { payload, type }) => ({
      ...state,
      restaurants: {
        ...state.restaurants,
        results: state.restaurants.results.map((restaurant) =>
          restaurant.id === payload.id ? payload : restaurant,
        ),
      },
      status: type,
    }),
    [resolvedAction(DELETE_RESTAURANT)]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [CLEAR_RESTAURANT]: (state, { type }) => ({
      ...state,
      restaurant: null,
      reviews: {
        ...initialState.reviews,
      },
      status: type,
    }),
    [resolvedAction(LIST_REVIEW)]: (state, { payload, type }) => ({
      ...state,
      reviews: payload,
      status: type,
    }),
    [resolvedAction(CREATE_REVIEW)]: (state, { type }) => ({
      ...state,
      restaurant: {
        ...state.restaurant,
        reviewable: false,
      },
      status: type,
    }),
    [resolvedAction(UPDATE_REVIEW)]: (state, { payload, type }) => ({
      ...state,
      reviews: {
        ...state.reviews,
        results: state.reviews.results.map((review) =>
          review.id === payload.id ? payload : review,
        ),
      },
      status: type,
    }),
    [resolvedAction(DELETE_REVIEW)]: (state, { type }) => ({
      ...state,
      status: type,
    }),
    [combineActions(
      rejectedAction(LIST_RESTAURANT),
      rejectedAction(CREATE_RESTAURANT),
      rejectedAction(GET_RESTAURANT),
      rejectedAction(UPDATE_RESTAURANT),
      rejectedAction(DELETE_RESTAURANT),
      rejectedAction(LIST_REVIEW),
      rejectedAction(CREATE_REVIEW),
      rejectedAction(UPDATE_REVIEW),
      rejectedAction(DELETE_REVIEW),
    )]: (state, { payload, type }) => ({
      ...state,
      error: payload,
      status: type,
    }),
    [RESET_ERROR]: (state) => ({
      ...state,
      error: null,
    }),
  },
  initialState,
)
