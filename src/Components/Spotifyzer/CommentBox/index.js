import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

export default class CommentBox extends React.Component {
  static get propTypes() {
    return {
      comment: PropTypes.object.isRequired
    }
  }

  render() {
    return (
      <div className={style.commentBox}>
        <img src={this.props.comment.image} />
        <div className={style.email}>{this.props.comment.email}</div>
        <div className={style.text}>{this.props.comment.text}</div>
      </div>
    )
  }
}
