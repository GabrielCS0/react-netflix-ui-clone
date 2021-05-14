import React, { useState } from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { IMovieResult } from '../../pages'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

interface IPropsMovieRow {
  title: string
  movies: {
    results: Array<IMovieResult>
  }
}

export function MovieRow ({ title, movies }: IPropsMovieRow) {
  const [scrollX, setScrollX] = useState(0)

  const handleLeftArrow = () => {
    let left = scrollX + Math.round(window.innerWidth / 2)
    if (left > 0) { left = 0 }
    setScrollX(left)
  }

  const handleRightArrow = () => {
    let right = scrollX - Math.round(window.innerWidth / 2)
    const listW = movies.results.length * 205
    if ((window.innerWidth - listW) > right) {
      right = (window.innerWidth - listW) - 64
    }
    setScrollX(right)
  }

  return (
    <div className={styles.movieRow}>
      <h2>{title}</h2>

      <div className={styles.movieRowLeft} onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>

      <div className={styles.movieRowRight} onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>

      <div className={styles.movieRowListArea}>
        <div className={styles.movieRowList} style={{
          marginLeft: scrollX,
          width: movies.results.length * 205
        }}>

        { movies.results.length > 0 && movies.results.map((movie, key: number) => (
          <div key={key} className={styles.movieRowItem}>
            <Image
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.original_name}
              width={300}
              height={450}
              objectFit='cover'
            />
          </div>
        )) }

        </div>
      </div>
    </div>
  )
}
