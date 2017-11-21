import React from 'react'
import style from './style.scss'

/**
 * Loader - React component.
 * Renders a div with a green spinning Circle.
 */
export default function Loader() {
  return (
    <div className={style.loader}>
      <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
    </div>
  )
}
