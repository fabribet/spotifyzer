import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

export default class CommentBox extends React.Component {
  static get propTypes() {
    return {
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func
    }
  }

  render() {
    return (
      <div
        className={`${style.spotifyBtn} ${style.spotifyBtnGreen}`}
        onClick={this.props.onClick ? this.props.onClick : ''}
      >
        {this.props.text}
      </div>
    )
  }
}
