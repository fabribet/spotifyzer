import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import { GetAlbums } from './../../API/Album'
import { Create as createComment, GetComments } from './../../API/Comment'
import SearchBar from './SearchBar'
import AlbumsList from './AlbumsList'
import AlbumView from './AlbumView'
import Loader from '../Loader'

/**
 * Home - React component.
 * Renders the main view.
 *
 * Properties
 * - token - The access token obtained from the spotify authorization. {Required}
 */
export default class Home extends React.Component {
  static get propTypes() {
    return {
      location: PropTypes.object.isRequired,
      token: PropTypes.string.isRequired
    }
  }

  constructor() {
    super()
    this.state = {
      firstLoad: true,
      // Albums gotten from the search
      albums: null,
      // Comments' related state
      selectedAlbum: null,
      albumComments: null,
      commentAdded: null,
      // Search related state
      searching: false,
      errorSearching: null
    }
  }

  /**
   * Triggers the search through the backend API and updates the state based on the result.
   * @param {string} query - The search criteria provided by the user.
   */
  handleSearch(query) {
    // Set the state to 'searching' mode to display the loader
    this.setState({ searching: true })

    let nextState = {
      selectedAlbum: null,
      albumComments: null,
      searching: false
    }

    //
    const search = '?q='.concat(query)
    GetAlbums(search, this.props.token)
      .then(res => {
        res.json().then(data => {
          if (res.ok) {
            const albums = data.albums.items
            nextState.albums = albums
            nextState.errorSearching = null
            this.setState(nextState)
          } else {
            const message = data.message
            nextState.albums = null
            nextState.errorSearching = message
            this.setState(nextState)
          }
        })
      })
      .catch(() => {
        nextState.albums = null
        nextState.errorSearching = 'There was an error perfoming the search'
        this.setState(nextState)
      })
  }

  /**
   * Triggers a GetComments API call, and then updates the state.
   */
  handleViewComments(album) {
    GetComments(album.id)
      .then(res =>
        res.json().then(comments => {
          if (!res.ok) {
            this.setState({
              selectedAlbum: album,
              albumComments: null
            })
            return
          }
          this.setState({
            selectedAlbum: album,
            albumComments: comments
          })
        })
      )
      .catch(() => {
        this.setState({
          selectedAlbum: album,
          albumComments: null
        })
      })
  }

  /**
   * Updates the state to clear the selected album and comments.
   */
  clearComments() {
    this.setState({
      selectedAlbum: null,
      albumComments: null,
      commentAdded: null
    })
  }

  /**
   * Triggers the API call to add a comment and updates the state by adding the comment to the
   * current comments array.
   * @param {string} email - Email that identifies the user adding the comment.
   * @param {string} comment - The comment to be added.
   */
  addComment(email, text) {
    let comment = {
      albumId: this.state.selectedAlbum.id,
      email: email,
      text: text
    }

    createComment(comment)
      .then(res =>
        res.json().then(data => {
          if (res.ok) {
            let comments = this.state.albumComments.slice()
            comments.push(data)
            this.setState({
              albumComments: comments,
              commentAdded: true
            })
          } else {
            this.setState({ commentAdded: false })
          }
        })
      )
      .catch(() => {
        this.setState({ commentAdded: false })
      })
  }

  /**
   * Provides the body to be rendered below the search component based on the current state.
   * @returns {JSX component} - the body.
   */
  getBody() {
    // If the user has triggered a search then display the loader.
    if (this.state.searching) {
      return Loader()
    }

    // If there was an error display it.
    if (this.state.errorSearching) {
      return (
        <div className={style.emptyListMessage}>
          {this.state.errorSearching}
        </div>
      )
    }

    // If there's a selected album the return the AlbumView
    if (this.state.selectedAlbum) {
      return (
        <AlbumView
          album={this.state.selectedAlbum}
          comments={this.state.albumComments}
          commentAdded={this.state.commentAdded}
          onButtonClick={this.clearComments.bind(this)}
          addComment={this.addComment.bind(this)}
        />
      )
    } else if (this.state.albums) {
      // If there are albums to be displayed then return the AlbumsList
      if (this.state.albums.length > 0) {
        return (
          <AlbumsList
            albums={this.state.albums}
            onButtonClick={this.handleViewComments.bind(this)}
          />
        )
      } else {
        // When no albums matched the search criteria, return a div with a message.
        return (
          <div className={style.emptyListMessage}>No albums were found</div>
        )
      }
    }

    // Last option is for the first load, nothing needs to be rendered
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
