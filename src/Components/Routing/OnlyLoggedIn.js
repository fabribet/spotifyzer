import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const onlyLoggedIn = ({
  component: Component,
  user: User,
  token: token,
  onSpotifyAuthorization: onSpotifyAuthorization,
  ...rest
}) => {
  // if the token was provided,then update the user's object.
  if (token) {
    onSpotifyAuthorization(token)
    return (
      <Route
        {...rest}
        render={props => (
          <Redirect
            to={{
              pathname: '/home',
              state: { from: props.location }
            }}
          />
        )}
      />
    )
  }
  return (
    <Route
      {...rest}
      render={props =>
        User && User.token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

onlyLoggedIn.propTypes = {
  component: PropTypes.func,
  onSpotifyAuthorization: PropTypes.func.isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  location: PropTypes.any
}

export default onlyLoggedIn
