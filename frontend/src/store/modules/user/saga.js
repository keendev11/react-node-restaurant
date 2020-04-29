import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import * as actions from './actions'

export const doListUser = function* ({ payload }) {
  try {
    const res = yield call(axios.get, '/users/', payload && { params: payload })
    yield put(actions.listUserSuccess(res.data))
  } catch (error) {
    yield put(actions.listUserFail(error))
  }
}

export const doUpdateUser = function* ({ payload }) {
  try {
    const res = yield call(axios.patch, `/users/${payload.id}`, payload)
    yield put(actions.updateUserSuccess(res.data))
    notification.success({ message: 'Successfully updated user' })
  } catch (error) {
    yield put(actions.updateUserFail(error))
  }
}

export const doDeleteUser = function* ({ payload }) {
  try {
    yield call(axios.delete, `/users/${payload}`)
    yield put(actions.deleteUserSuccess(payload))
    yield put(actions.listUser({ page: 1 }))
    notification.success({ message: 'Successfully deleted user' })
  } catch (error) {
    yield put(actions.deleteUserFail(error))
  }
}

export const saga = function* () {
  yield takeLatest(actions.LIST_USER, doListUser)
  yield takeLatest(actions.UPDATE_USER, doUpdateUser)
  yield takeLatest(actions.DELETE_USER, doDeleteUser)
}
