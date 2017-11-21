import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import SpotifyButton from '../../SpotifyButton'
import CommentBox from './../CommentBox'
import CommentForm from './../CommentForm'

/**
 * AlbumsList - React component.
 * Renders a list of AlbumBox components.
 *
 * Properties
 * - addComment   - The handler for the Comment form button. {Required}
 * - comments     - An array of comments related to the provided album. If not provided it's
 *                  assumed that an error has ocurred.
 * - commentAdded - If a comment was submited this property will be provided indicating if the
 *                  comment was successfully added.
 * - moreComments - A flag to tell the component if there are more comments to be loaded. {Required}
 */
export default class CommentsList extends React.Component {
  static get propTypes() {
    return {
      addComment: PropTypes.func.isRequired,
      comments: PropTypes.array,
      commentAdded: PropTypes.bool,
      moreComments: PropTypes.bool
    }
  }

  constructor() {
    super()
    this.state = {
      showingForm: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ showingForm: !nextProps.commentAdded })
  }

  /**
   * Calls the provided function to add a comment and toggles the form.
   * @param {string} email - Email that identifies the user adding the comment.
   * @param {string} comment - The comment to be added.
   */
  addComment(email, comment) {
    this.props.addComment(email, comment)
  }

  /**
   * Changes the state of the component to toggle the form visibility.
   */
  toggleForm() {
    this.setState({ showingForm: !this.state.showingForm })
  }

  render() {
    // Map the comments array to a react component.
    let comments
    if (this.props.comments) {
      comments = this.props.comments.map(comment => (
        <CommentBox key={comment._id} comment={comment} />
      ))
    }

    // Set the comment form close/open button Class depending on the form's visibility.
    let commentButtonClass = 'fa fa-'
    if (this.state.showingForm) {
      commentButtonClass.concat('close')
    } else {
      commentButtonClass.concat('plus')
    }

    // If no comments were provided show an error message.
    if (!comments) {
      return (
        <div className={style.container}>
          <div className={style.noComments}>
            There was a problem loading the comments.
          </div>
        </div>
      )
    }

    return (
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.commentsLegend}>Comments</div>
          <div className={style.commentAction}>
            {this.state.showingForm ? (
              <button
                className={style.actionContainer}
                onClick={this.toggleForm.bind(this)}
              >
                <i className="material-icons">clear</i>
              </button>
            ) : (
              <div>
                <span className={style.actionLegend}>Add comment</span>
                <button
                  className={style.actionContainer}
                  onClick={this.toggleForm.bind(this)}
                >
                  <i className="material-icons">add</i>
                </button>
              </div>
            )}
          </div>
        </div>
        {this.state.showingForm ? (
          <CommentForm
            addComment={this.addComment.bind(this)}
            commentAdded={this.props.commentAdded}
          />
        ) : null}
        {comments.length ? (
          comments
        ) : (
          <div className={style.noComments}>
            There are no comments to be displayed
          </div>
        )}
        {/* If more comments can be displayed, show the button */}
        {this.props.moreComments ? (
          <SpotifyButton
            text="Show More Comments"
            buttonStyle="bordered-gray"
            onClick={this.loadMoreComments}
          />
        ) : null}
      </div>
    )
  }
}
