import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from "../Styles/Navbar.module.css"
import bag from "../Static/bag.svg"
import home from "../Static/home.svg"


export default class Navbar extends Component {
  render() {
    return (
      <nav className={styles.navbar}>
          <Link to="/">
            <img src={home} alt="home icon" width="38"  className={styles.home}/>
          </Link>

          <div className={styles.categories}>
              <span className={styles.category}>All</span>
              <span className={styles.category}>Tech</span>
              <span className={styles.category}>Clothes</span>
          </div>

          

          <div className={styles.misc}>
              <select className={styles.currency}>
                  <option value="USD" className={styles.currencyOption}>USD</option>
                  <option value="EUR" className={styles.currencyOption}>EUR</option>
                  <option value="JPY" className={styles.currencyOption}>JPY</option>
              </select>

                <button aria-label="show shopping bag button">
                    <img src={bag} alt="shopping bag icon" />
                    <span className={styles.badge}>10</span>
                </button>
          </div>
      </nav>
    )
  }
}
