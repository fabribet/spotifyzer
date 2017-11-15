import React from 'react'
import style from './style.scss'

export default class SearchBar extends React.Component {
  render() {
    return (
      <div className={style.searchBar}>
        <input
          className={style.searchBox}
          type="text"
          hint="Search"
          value={this.state.email}
          onChange={}
          error={this.state.validations.email.text}
        >
          <i className="sm-icon">search</i>
        </input>
      </div>
    )
  }
}
