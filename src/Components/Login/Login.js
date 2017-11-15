import style from './style.scss'
import React from 'react'
import PropTypes from 'prop-types'
import SpotifyButton from '../SpotifyButton'

export default class Login extends React.Component {
  static get propTypes() {
    return {
      onLogin: PropTypes.func,
      onRegister: PropTypes.func,
      history: PropTypes.object.isRequired
    }
  }

  constructor() {
    super()
  }

  _spotifyLogin() {
    const client_id = 'client_id=704bab56aa8a456fbae1949d5107d08c'
    const response_type = 'response_type=token'
    const redirect_uri = 'redirect_uri=http://localhost:3000/spotifyzer'
    const location =
      'https://accounts.spotify.com/authorize?' +
      client_id +
      '&' +
      response_type +
      '&' +
      redirect_uri
    window.location = location
  }

  render() {
    return (
      <div className={style.parentView}>
        <SpotifyButton
          onClick={this._spotifyLogin}
          text="Log in with Spotify"
        />
      </div>
    )
  }
}
