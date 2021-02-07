import axios from 'axios'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import * as actions from './actions'
import { selectRestaurant } from './selectors'
import { getErrorMessage, errorParser } from 'utils/error-handler'

export const doListRestaurant = function* ({ payload }) {
  try {
    const res = yield call(axios.get, '/restaurants/', payload && { params: payload })
    yield put(actions.listRestaurantSuccess(res.data))
  } catch (error) {
    yield put(actions.listRestaurantFail(error))
  }
}

export const doCreateRestaurant = function* ({ payload }) {
  try {
    yield call(axios.post, `/restaurants/`, payload)
    yield put(actions.createRestaurantSuccess())
    yield put(actions.listRestaurant({ page: 1 }))
    notification.success({ message: 'Successfully created restaurant' })
  } catch (error) {
    yield put(actions.createRestaurantFail(error))
  }
}

export const doGetRestaurant = function* ({ payload }) {
  try {
    const res = yield call(axios.get, `/restaurants/${payload}`)
    yield put(actions.getRestaurantSuccess(res.data))
  } catch (error) {
    yield put(actions.getRestaurantFail(errorParser(error)))
  }
}

export const doUpdateRestaurant = function* ({ payload }) {
  try {
    const res = yield call(axios.patch, `/restaurants/${payload.id}`, payload)
    yield put(actions.updateRestaurantSuccess(res.data))
    notification.success({ message: 'Successfully updated restaurant' })
  } catch (error) {
    yield put(actions.updateRestaurantFail(errorParser(error)))
  }
}

export const doDeleteRestaurant = function* ({ payload }) {
  try {
    yield call(axios.delete, `/restaurants/${payload}`)
    yield put(actions.deleteRestaurantSuccess())
    yield put(actions.listRestaurant({ page: 1 }))
    notification.success({ message: 'Successfully deleted restaurant' })
  } catch (error) {
    yield put(actions.deleteRestaurantFail(error))
  }
}

export const doListReview = function* ({ payload }) {
  try {
    const restaurant = yield select(selectRestaurant)
    const res = yield call(
      axios.get,
      `/restaurants/${restaurant.id}/reviews`,
      payload && { params: payload },
    )
    yield put(actions.listReviewSuccess(res.data))
  } catch (error) {
    yield put(actions.listReviewFail(error))
  }
}

export const doCreateReview = function* ({ payload }) {
  try {
    const restaurant = yield select(selectRestaurant)
    yield call(axios.post, `/restaurants/${restaurant.id}/reviews`, payload)
    yield put(actions.createReviewSuccess())
    yield put(actions.getRestaurant(restaurant.id))
    yield put(actions.listReview({ page: 1 }))
    notification.success({ message: 'Successfully left review' })
  } catch (error) {
    yield put(actions.createReviewFail(error))
    notification.error({ message: getErrorMessage(error) })
  }
}

export const doUpdateReview = function* ({ payload }) {
  try {
    const restaurant = yield select(selectRestaurant)
    const res = yield call(
      axios.patch,
      `/restaurants/${restaurant.id}/reviews/${payload.id}`,
      payload,
    )
    yield put(actions.getRestaurant(restaurant.id))
    yield put(actions.updateReviewSuccess(res.data))
    notification.success({ message: 'Successfully updated review' })
  } catch (error) {
    yield put(actions.updateReviewFail(error))
  }
}

export const doDeleteReview = function* ({ payload }) {
  try {
    const restaurant = yield select(selectRestaurant)
    yield call(axios.delete, `/restaurants/${restaurant.id}/reviews/${payload}`)
    yield put(actions.deleteReviewSuccess())
    yield put(actions.getRestaurant(restaurant.id))
    yield put(actions.listReview({ page: 1 }))
    notification.success({ message: 'Successfully deleted review' })
  } catch (error) {
    yield put(actions.deleteReviewFail(error))
  }
}

export const saga = function* () {
  yield takeLatest(actions.LIST_RESTAURANT, doListRestaurant)
  yield takeLatest(actions.CREATE_RESTAURANT, doCreateRestaurant)
  yield takeLatest(actions.GET_RESTAURANT, doGetRestaurant)
  yield takeLatest(actions.UPDATE_RESTAURANT, doUpdateRestaurant)
  yield takeLatest(actions.DELETE_RESTAURANT, doDeleteRestaurant)

  yield takeLatest(actions.LIST_REVIEW, doListReview)
  yield takeLatest(actions.CREATE_REVIEW, doCreateReview)
  yield takeLatest(actions.UPDATE_REVIEW, doUpdateReview)
  yield takeLatest(actions.DELETE_REVIEW, doDeleteReview)
}
