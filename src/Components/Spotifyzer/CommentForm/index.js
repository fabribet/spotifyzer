import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import SpotifyButton from '../../SpotifyButton'

export default class CommentForm extends React.Component {
  static get propTypes() {
    return {
      addComment: PropTypes.func.isRequired
    }
  }

  render() {
    return (
      <div className={style.commentBox}>
        <form onSubmit={this.props.addComment}>
          <div className={style.avatarContainer} />
          <input type="text" hint="e-mail" className={style.email} />
          <textarea>Your comment here</textarea>
          <SpotifyButton text="Add" buttonStyle="bordered" />
        </form>
      </div>
    )
  }
}
