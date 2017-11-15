import React from 'react'
import PropTypes from 'prop-types'
import AlbumBox from './../AlbumBox'
import CommentsList from './../CommentsList'

export default class AlbumsList extends React.Component {
  static get propTypes() {
    return {
      album: PropTypes.object.isRequired,
      comments: PropTypes.arrray.isRequired
    }
  }

  render() {
    return (
      <div>
        <AlbumBox album={this.props.album} />
        <CommentsList comments={this.props.comments} />
      </div>
    )
  }
}
