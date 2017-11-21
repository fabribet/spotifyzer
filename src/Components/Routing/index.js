import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import { actions } from '../../Actions/User'
import OnlyLoggedIn from './OnlyLoggedIn'
import OnlyLoggedOut from './OnlyLoggedOut'

const mapDispatchToProps = dispatch => ({
  onSpotifyAuthorization(token) {
    dispatch(actions.spotifyAuthorization(token))
  }
})

const mapStateToProps = (state, ownProps) => {
  // Get the token from the query string.
  const requestHash = ownProps.location.hash
  const spotifyResponse = queryString.parse(requestHash)
  let token
  if (!state.User.token && spotifyResponse && spotifyResponse['access_token']) {
    token = spotifyResponse['access_token']
  }
  return {
    user: state.User,
    token: token
  }
}

export const PrivateRoute = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OnlyLoggedIn)
)
export const OnlyPublicRoute = withRouter(
  connect(mapStateToProps)(OnlyLoggedOut)
)
