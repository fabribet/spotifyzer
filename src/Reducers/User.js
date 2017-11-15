import { types } from '../Actions/User'

export default (state = {}, action) => {
  switch (action.type) {
    case `${types.LOGOUT_INTENT}_RESOLVED`:
      return {
        ...state,
        ...action.payload
      }
    case types.SPOTIFY_AUTH:
      return {
        ...state,
        token: action.data.token
      }
    case types.LOGOUT_INTENT:
      return {}

    default:
      return state
  }
}
