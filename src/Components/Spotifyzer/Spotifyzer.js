import React from 'react'
import PropTypes from 'prop-types'
import { GetAlbums } from './../../API/Album'
import { Create as createComment, GetComments } from './../../API/Comment'
import SearchBar from './SearchBar'
import AlbumsList from './AlbumsList'
import AlbumView from './AlbumView'

export default class Spotifyzer extends React.Component {
  static get propTypes() {
    return {
      location: PropTypes.object.isRequired,
      token: PropTypes.string.isRequired,
      onSpotifyAuthorization: PropTypes.func.isRequired,
      onSearch: PropTypes.func.isRequired,
      albums: PropTypes.array
    }
  }

  constructor() {
    super()
    this.state = {
      selectedAlbum: null
    }
  }

  /**
   * Triggers the search through the backend API and fires the onSearch
   */
  handleSearch(query) {
    const search = '?'.concat(query)
    const albums = GetAlbums(search, this.props.token)
    // to prevent a form submition
  }

  /**
   * Selects an album to display its comments
   */
  handleViewComments() {
    const albumId = ''
    this.setState({ selectedAlbum: albumId })
  }

  /**
   * Handles the comment post
   */
  addComment() {
    // TODO complete with inputs
    let comment = {
      albumId: '',
      email: '',
      text: ''
    }
    createComment(comment)
    // to prevent a form submition
    return false
  }

  getBody() {
    if (this.props.albums) {
      return <AlbumsList albums={this.props.albums} />
    } else if (this.state.selectedAlbum) {
      return <AlbumView album={this.state.selectedAlbum} />
    }
    return null
  }

  render() {
    return (
      <div>
        <SearchBar
          ref={input => {
            this.searchBar = input
          }}
          handleSearch={this.handleSearch.bind(this)}
        />
        {this.getBody()}
      </div>
    )
  }
}
