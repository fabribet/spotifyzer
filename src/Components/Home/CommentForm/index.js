import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import SpotifyButton from '../../SpotifyButton'

/**
 * CommentForm - React component.
 * A form to add a comment to the displayed album, inserting a proper email and a comment (longer
 * than 2 letters).
 *
 * Properties
 * - addComment   - The handler for the 'Add' button. {Required}
 * - commentAdded - If a comment was submited this property will be provided indicating if the
 *                  comment was successfully added.
 */
export default class CommentForm extends React.Component {
  static get propTypes() {
    return {
      addComment: PropTypes.func.isRequired,
      commentAdded: PropTypes.bool
    }
  }

  constructor() {
    super()
    this.state = {
      comment: '',
      email: '',
      invalidEmail: false,
      invalidComment: false,
      attempedSubmit: false
    }
  }

  /**
   * Validates form inputs. Updates the state if one the inputs is found invalid.
   *
   * @return {boolean} - True if both imputs are valid.
   */
  validImputs() {
    const validEmail = this.validateEmail(this.state.email)
    const validComment = this.validateComment(this.state.comment)
    if (!(validEmail && validComment)) {
      this.setState({
        invalidEmail: !validEmail,
        invalidComment: !validComment
      })
      return false
    }

    return true
  }

  /**
   * Validate Email Text
   * @param {string} email - Email to validate
   * @return {boolean} - Input is Valid
   */
  validateEmail(email) {
    if (email === '') return false
    else if (!/\S+@\S+\.\S+/.test(email)) return false
    else return true
  }

  /**
   * Validates the Comment textarea.
   *
   * @param {string} comment - Comment to validate.
   * @return {boolean} - returns true if the comment is longer than 2 chars.
   */
  validateComment(comment) {
    return comment && comment.trim().length > 2
  }

  render() {
    return (
      <div className={style.formContainer}>
        <div className={style.avatarContainer} />
        <div className={style.inputsContainer}>
          <input
            className={
              this.state.invalidEmail
                ? style.email + ' ' + style.inputError
                : style.email
            }
            type="text"
            placeholder="e-mail"
            value={this.state.email}
            onChange={event => {
              let state = { email: event.target.value }
              if (this.state.attempedSubmit) {
                state.invalidEmail = !this.validateEmail(event.target.value)
              }
              this.setState(state)
            }}
            autoFocus
          />
          {this.state.invalidEmail ? (
            <div className={`${style.errorLegend} ${style.inputErrorLegend}`}>
              Invalid email
            </div>
          ) : null}
          <textarea
            className={
              this.state.invalidComment
                ? style.comment + ' ' + style.inputError
                : style.comment
            }
            placeholder="Write your comment"
            rows="4"
            onChange={event => {
              let state = { comment: event.target.value }
              if (this.state.attempedSubmit) {
                state.invalidComment = !this.validateComment(event.target.value)
              }
              this.setState(state)
            }}
          >
            {this.state.comment}
          </textarea>
          {this.state.invalidComment ? (
            <div className={`${style.errorLegend} ${style.inputErrorLegend}`}>
              Comment is too short (minimum 3 letters)
            </div>
          ) : null}
        </div>
        <div className={style.buttonContainer}>
          {this.props.commentAdded === false ? (
            <div className={style.errorLegend}>
              There was an error adding the comment, please try again later.
            </div>
          ) : null}
          <SpotifyButton
            text="Add"
            onClick={() => {
              if (this.validImputs()) {
                this.props.addComment(this.state.email, this.state.comment)
              } else {
                this.setState({ attempedSubmit: true })
              }
            }}
            buttonStyle="bordered"
          />
        </div>
      </div>
    )
  }
}
