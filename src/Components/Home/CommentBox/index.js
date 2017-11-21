import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

/**
 * CommentBox - React component.
 * A box that renders a comment with its details.
 *
 * Properties
 * - comment - The comment object containing its details. {Required}
 */
export default class CommentBox extends React.Component {
  static get propTypes() {
    return {
      comment: PropTypes.object.isRequired
    }
  }

  render() {
    return (
      <div className={style.commentBox}>
        <div className={style.avatarContainer}>
          <img src={this.props.comment.avatar} />
        </div>
        <div className={style.commentContainer}>
          <div className={style.email}>{this.props.comment.email}</div>
          <div className={style.text}>
            {'"' + this.props.comment.text + '"'}
          </div>
        </div>
      </div>
    )
  }
}
