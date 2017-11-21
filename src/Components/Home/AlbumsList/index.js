import React from 'react'
import PropTypes from 'prop-types'
import AlbumBox from './../AlbumBox'
import style from './style.scss'

/**
 * AlbumsList - React component.
 * Renders a list of AlbumBox components.
 *
 * Properties
 * - onButtonClick - The handler of the rendered button to View Comments.
 * - albums        - The array of albums to be listed. {Required}
 */
export default class AlbumsList extends React.Component {
  static get propTypes() {
    return {
      onButtonClick: PropTypes.func,
      albums: PropTypes.array.isRequired
    }
  }

  render() {
    // Generate the AlbumBox components from the albums array.
    const albums = this.props.albums.map(album => (
      <AlbumBox
        key={album.id}
        album={album}
        onButtonClick={this.props.onButtonClick}
      />
    ))
    return <div className={style.albumList}>{albums}</div>
  }
}
