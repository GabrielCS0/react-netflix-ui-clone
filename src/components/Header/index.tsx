import React from 'react'
import styles from './styles.module.scss'

export function Header ({ background }) {
  return (
    <header className={styles.headerContainer}
      id={background ? styles.headerBackground : ''}
    >
      <div className={styles.headerLogo}>
        <a href='/'>
          <img src='/logo.png' alt='Netflix' />
        </a>
      </div>

      <div className={styles.headerUser}>
        <a href='/'>
          <img src='/user.png' alt='User' />
        </a>
      </div>
    </header>
  )
}
