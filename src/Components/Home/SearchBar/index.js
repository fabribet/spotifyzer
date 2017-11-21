import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

/**
 * SearchBar - React component.
 * Renders a bar with a search input.
 *
 * Properties
 * - handleSearch - The handler for the search action. {Required}
 */
export default class SearchBar extends React.Component {
  constructor() {
    super()
    this.query = ''
  }

  static get propTypes() {
    return {
      handleSearch: PropTypes.func.isRequired
    }
  }

  /**
   * Validates that the query is not empty and calls the handler.
   */
  search() {
    if (this.query) {
      this.props.handleSearch(this.query)
    }
  }

  /**
   * Clears the input.
   */
  clearInput() {
    this.query = ''
    this.searchInput.value = ''
  }

  render() {
    return (
      <div className={style.searchBar}>
        <form
          ref={form => {
            this.form = form
          }}
          className={style.inputContainer}
        >
          <div className={style.searchIconContainer}>
            <i className="material-icons">search</i>
          </div>
          <input
            ref={input => {
              this.searchInput = input
            }}
            onChange={event => {
              this.query = event.target.value
            }}
            onKeyDown={event => {
              switch (event.key) {
                case 'Enter':
                  event.preventDefault()
                  this.search()
                  break
                case 'Escape':
                  this.clearInput()
                  break
                default:
                  break
              }
            }}
            className={style.searchBox}
            type="text"
            placeholder="Search"
          />
        </form>
      </div>
    )
  }
}
