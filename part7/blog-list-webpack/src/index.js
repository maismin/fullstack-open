import 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './App.css'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
