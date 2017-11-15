import style from './style.scss'
import React from 'react'
import PropTypes from 'prop-types'

import Input from 'react-toolbox/lib/input'
import { Button } from 'react-toolbox/lib/button'
import { Redirect } from 'react-router-dom'

export default class LoginForm extends React.Component {
  static get propTypes() {
    return {
      onSubmit: PropTypes.func,
      onRegisterPressed: PropTypes.func,
      onSpotifyPressed: PropTypes.func.isRequired
    }
  }

  constructor() {
    super()
  }

  render() {
    return (
      <section>
        <article className={style.buttonContainer}>
          <Button
            label="Log In with Spotify"
            onClick={this.props.onSpotifyPressed}
            primary
          />
        </article>
      </section>
    )
  }
}
