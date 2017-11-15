import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import SpotifyButton from '../../SpotifyButton'

export default class AlbumBox extends React.Component {
  static get propTypes() {
    return {
      album: PropTypes.object.isRequired,
      isListView: PropTypes.bool
    }
  }

  getDefaultProps() {
    return {
      isListView: true
    }
  }

  render() {
    let buttonText
    if (this.props.isListView) {
      buttonText = 'View Comments'
    } else {
      buttonText = 'Back to Search'
    }

    return (
      <div className={style.albumBox}>
        <img src={this.props.album.image} />
        <div className={style.artist}>
          {this.props.album.artists.join(', ')}
        </div>
        <div className={style.cdName}>{this.props.album.name}</div>
        <div className={style.listenButton}>Listen on Spotify</div>
        <SpotifyButton text={buttonText} buttonStyle="bordered" />
      </div>
    )
  }
}
