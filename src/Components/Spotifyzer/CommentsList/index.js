import React from 'react'
import PropTypes from 'prop-types'
import SpotifyButton from '../../SpotifyButton'
import CommentBox from './../CommentBox'
import CommentForm from './../CommentForm'

export default class CommentsList extends React.Component {
  static get propTypes() {
    return {
      comments: PropTypes.array.isRequired,
      addComment: PropTypes.func
    }
  }

  getInitialState() {
    return {
      addingComment: false
    }
  }

  toggleForm() {
    this.setState({ addingComment: !this.state.addingComment })
  }

  render() {
    const comments = this.props.comments.map(comment => {
      ;<CommentBox key={comment.id} comment={comment} />
    })
    return (
      <div>
        <div className="commentsLegend">Comments</div>
        {this.state.addingComment ? (
          <div className="cancelComment" onClick={this.toggleForm}>
            x
          </div>
        ) : (
          <div className="addComment" onClick={this.toggleForm}>
            Add Comment +
          </div>
        )}
        {this.state.addingComment ? (
          <CommentForm addComment={this.props.addComment} />
        ) : (
          ''
        )}
        {comments}
        <SpotifyButton
          text="Show More Comments"
          buttonStyle="blackAndWhite"
          onClick={this.loadMoreComments}
        />
      </div>
    )
  }
}
