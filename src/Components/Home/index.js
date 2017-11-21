import { withRouter } from 'react-router-dom'
import { actions as userActions } from '../../Actions/User'
import { connect } from 'react-redux'
import Home from './Home'

const mapDispatchToProps = dispatch => ({
  onSpotifyAuthorization(token) {
    dispatch(userActions.spotifyAuthorization(token))
  }
})

const mapStateToProps = state => {
  return {
    token: state.User.token
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
