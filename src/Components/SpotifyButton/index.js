import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

/**
 * SpotifyButton - React component.
 * Renders a div that looks like a Spotify Button.
 *
 * Properties
 * - text        - The text to be displayed inside the button. {Required}
 * - onClick     - The handler click action.
 * - iconClass   - A material-icons icon class to show an icon before the text.
 * - buttonStyle - The style of the button [green | bordered | bordered-gray]. {default= 'bordered'}
 */
export default class SpotifyButton extends React.Component {
  constructor() {
    super()
    this.defaultStyle = 'bordered'
  }

  static get propTypes() {
    return {
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      iconClass: PropTypes.string,
      buttonStyle: PropTypes.string
    }
  }

  render() {
    let buttonClass = `${style.spotifyBtn} `
    switch (this.props.buttonStyle) {
      case 'green':
        buttonClass += style.spotifyBtnGreen
        break
      case 'bordered-gray':
        buttonClass += style.spotifyBtnGray
        break
      case 'bordered':
        buttonClass += style.spotifyBtnBordered
        break
      default:
        buttonClass += style.spotifyBtnBordered
        break
    }

    return (
      <div
        className={buttonClass}
        onClick={this.props.onClick ? this.props.onClick : null}
      >
        <div className={style.textContainer}>
          {this.props.iconClass ? (
            <i className="material-icons">{this.props.iconClass}</i>
          ) : null}
          <span>{this.props.text}</span>
        </div>
      </div>
    )
  }
}
