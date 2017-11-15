import React from 'react'
import PropTypes from 'prop-types'
import AlbumBox from './../AlbumBox'

export default class AlbumsList extends React.Component {
  static get propTypes() {
    return {
      albums: PropTypes.array.isRequired
    }
  }

  render() {
    const albums = this.props.albums.map(album => {
      ;<AlbumBox key={album.id} album={album} />
    })
    return { albums }
  }
}
