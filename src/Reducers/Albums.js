import { types } from '../Actions/Albums'

export default (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_ALBUMS:
      return {
        ...state,
        albums: action.data.albums
      }
    default:
      return state
  }
}
