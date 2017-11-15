import { combineReducers } from 'redux'

import User from './User'
import Notifications from './Notifications'
import Albums from './Albums'

export default combineReducers({
  User,
  Notifications,
  Albums
})
