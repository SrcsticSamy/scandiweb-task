import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import styles from "../Styles/ErrorPage.module.css"

class Error extends Component {
  render() {
    return (
      <div className={styles.container}>

          <div>
            <h1>404</h1>
            <h2>There Is Nothing Here.</h2>
          </div>

          <Link to="/">
            <button className={styles.button} aria-label="Navigate to home button">Go back Home</button>
          </Link>

      </div>
    )
  }
}

export default Error