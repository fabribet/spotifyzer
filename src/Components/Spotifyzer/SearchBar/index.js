import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

export default class SearchBar extends React.Component {
  constructor() {
    super()
    this.query = ''
  }

  static get propTypes() {
    return {
      handleSearch: PropTypes.func
    }
  }

  render() {
    return (
      <form
        onSubmit={event => {
          event.preventDefault()
          /*console.log(this.props.handleSearch)*/
          if (this.query) {
            this.props.handleSearch(this.query)
          }
        }}
      >
        <div className={style.searchBar}>
          <input
            ref={input => {
              this.searchInput = input
            }}
            onChange={event => {
              /*console.log('here: ' + event.target.value)*/
              this.query = event.target.value
            }}
            className={style.searchBox}
            type="text"
            placeholder="Search"
          />
        </div>
      </form>
    )
  }
}
