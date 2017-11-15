import React from 'react'
import PropTypes from 'prop-types'

export default class Home extends React.Component {
  static get propTypes() {
    return {
      token: PropTypes.string,
      location: PropTypes.object.isRequired
    }
  }

  render() {
    return <div>Home token: {this.token}</div>
  }
}
