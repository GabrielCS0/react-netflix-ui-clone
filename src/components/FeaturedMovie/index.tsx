import React from 'react'
import { IMovieResult } from '../../pages'
import styles from './styles.module.scss'

interface IFeaturedMovie {
  movie: IMovieResult
}

export function FeaturedMovie ({ movie }: IFeaturedMovie) {
  const firstDate = new Date(movie.first_air_date)

  const genres = []

  for (const i in movie.genres) {
    genres.push(movie.genres[i].name)
  }

  return (
    <section className={styles.featured} style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
    }}>
      <div className={styles.featuredVertical}>
        <div className={styles.featuredHorizontal}>

          <div className={styles.featuredName}>{movie.original_name}</div>

          <div className={styles.featuredInfo}>
            <div className={styles.featuredPoints}>{movie.vote_average} Points</div>
            <div className={styles.featuredYear}>{firstDate.getFullYear()}</div>
            <div className={styles.featuredSeasons}>
              {movie.number_of_seasons} Season
              {movie.number_of_seasons !== 1 ? 's' : ''}
            </div>
          </div>

          <div className={styles.featuredDescription}>
            {movie.overview.length > 305
              ? movie.overview.slice(0, 305) + '...'
              : movie.overview}
          </div>

          <div className={styles.featuredButtons}>
            <a href='/watch/...' className={styles.featuredPlayBtn}>▶ Play</a>
            <a href='/list/add/...' className={styles.featuredMyListBtn}>+ My List</a>
          </div>

          <div className={styles.featuredGenres}><strong>Genres:</strong> {genres.join(', ')}</div>

        </div>
      </div>
    </section>
  )
}
