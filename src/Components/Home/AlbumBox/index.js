import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import SpotifyButton from '../../SpotifyButton'

/**
 * AlbumBox - React component.
 * Renders an album with its details inside.
 *
 * Properties
 * - album          - The album object with its details to be rendered inside {Required}
 * - onButtonClick  - The handler of the rendered button [View Comments | Back to Search] {Required}
 * - isCommentsView - Boolean to determine wether it is a Comments View or List view.
 */
export default class AlbumBox extends React.Component {
  static get propTypes() {
    return {
      album: PropTypes.object.isRequired,
      onButtonClick: PropTypes.func.isRequired,
      isCommentsView: PropTypes.bool
    }
  }

  render() {
    let artists
    // Concatenate the artists in one comma separated string.
    this.props.album.artists.forEach(artist => {
      if (artists) {
        artists.concat(', ').concat(artist.name)
      } else {
        artists = artist.name
      }
    })

    let buttonText
    let onClick
    let buttonIcon
    // Configure button text and handler depending on the view type (Album list by default)
    if (!this.props.isCommentsView) {
      buttonText = 'View Comments'
      onClick = () => {
        this.props.onButtonClick(this.props.album)
      }
    } else {
      buttonText = 'Back to Search'
      onClick = this.props.onButtonClick
      buttonIcon = 'chevron_left'
    }

    // Add the image of the album to the background-image css property
    const divStyle = {
      backgroundImage: 'url(' + this.props.album.images[0].url + ')',
      'background-position': 'center'
    }

    return (
      <div style={divStyle}>
        <div className={style.albumBox}>
          <div className={style.albumImage}>
            <img src={this.props.album.images[0].url} />
          </div>
          <div className={style.albumDetails}>
            <div className={style.detailsContainer}>
              <div className={style.artist}>{artists}</div>
              <div className={style.albumName}>{this.props.album.name}</div>
              <div className={style.linkContainer}>
                <a
                  className={style.listenLink}
                  href={this.props.album['external_urls'].spotify}
                >
                  <button className={style.listenButton}>
                    <i className="material-icons">volume_up</i>
                  </button>
                  <span>Listen on Spotify</span>
                </a>
              </div>
            </div>
          </div>
          <div className={style.buttonColumn}>
            <div className={style.buttonContainer}>
              <SpotifyButton
                text={buttonText}
                onClick={onClick}
                iconClass={buttonIcon}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
