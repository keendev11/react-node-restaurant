import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { notification } from 'antd'
import axios from 'axios'

import { API_URL } from 'utils/config'
import { store, history } from 'store'
import { getAuthToken } from 'utils/token'
import 'styles/core.scss'

import * as serviceWorker from './serviceWorker'

import App from './App'

axios.defaults.baseURL = API_URL
axios.interceptors.request.use((config) => {
  const token = getAuthToken()

  if (!config) {
    config = {}
  }

  if (token) {
    config.headers['Authorization'] = token
  }

  return config
})

notification.config({
  placement: 'bottomLeft',
  duration: 2,
})

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
