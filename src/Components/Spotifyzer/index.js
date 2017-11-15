import { withRouter } from 'react-router-dom'
import { actions } from '../../Actions/User'
import { connect } from 'react-redux'
import Spotifyzer from './Spotifyzer'

const mapDispatchToProps = dispatch => ({
  onSpotifyAuthorization(token) {
    dispatch(actions.spotifyAuthorization(token))
  },
  onSearch({ albums }) {
    dispatch(actions.insertAlbums(albums))
  }
})

const mapStateToProps = state => {
  return {
    user: state.User.token
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Spotifyzer)
)
