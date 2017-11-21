import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import AlbumBox from './../AlbumBox'
import CommentsList from './../CommentsList'

/**
 * AlbumView - React component.
 * Renders an AlbumBox and the CommentsList to display the detailed view of the album.
 *
 * Properties
 * - album         - The album object with its details. {Required}
 * - onButtonClick - The handler of the rendered button to go Back to Search. {Required}
 * - addComment    - The handler for the Comment form button of the CommentsList. {Required}
 * - comments      - An array of comments related to the provided album. If not provided it's
 *                   assumed that an error has ocurred.
 * - commentAdded  - If a comment was submited this property will be provided indicating if the
 *                   comment was successfully added.
 */
export default class AlbumView extends React.Component {
  static get propTypes() {
    return {
      album: PropTypes.object.isRequired,
      onButtonClick: PropTypes.func.isRequired,
      addComment: PropTypes.func.isRequired,
      comments: PropTypes.array,
      commentAdded: PropTypes.bool
    }
  }

  render() {
    return (
      <div className={style.container}>
        <AlbumBox
          album={this.props.album}
          onButtonClick={this.props.onButtonClick}
          isCommentsView={true}
        />
        <CommentsList
          comments={this.props.comments}
          commentAdded={this.props.commentAdded}
          addComment={this.props.addComment}
          moreComments={false}
        />
      </div>
    )
  }
}
