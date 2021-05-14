import React, { useEffect, useState } from 'react'
import styles from './home.module.scss'
import Head from 'next/head'
import tmdb from '../services/tmdb'
import { GetStaticProps } from 'next'
import { MovieRow } from '../components/MovieRow'
import { FeaturedMovie } from '../components/FeaturedMovie'
import { Header } from '../components/Header'

export interface IMovieResult {
  poster_path: string
  backdrop_path: string
  original_name: string
  vote_average: number
  number_of_seasons: number
  overview: string
  first_air_date: string
  genres: [{ name: string }]
}

interface ICategory {
  slug: string
  title: string
  movies: {
    results: Array<IMovieResult>
  }
}

interface IHomeProps {
  categoryList: Array<ICategory>
  featuredData: IMovieResult
}

export default function Home ({ categoryList, featuredData }: IHomeProps) {
  const [headerBackground, setHeaderBackground] = useState(false)

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setHeaderBackground(true)
      } else {
        setHeaderBackground(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Netflix</title>
      </Head>

      <Header background={headerBackground} />

      { featuredData &&
        <FeaturedMovie movie={featuredData} />
      }

      <section className={styles.movieList}>
        {categoryList.map((category, key: number) => (
          <MovieRow
            key={key}
            title={category.title}
            movies={category.movies}
          />
        ))}
      </section>

      <footer className={styles.footerContainer}>
        Image rights for Netflix.
        <br />
        Data taken from the website themoviedb.org
      </footer>

      { categoryList.length <= 0 &&

        <div className={styles.loading}>
          <img src='/loading.gif' alt='Loading' />
        </div>
      }
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await tmdb.getHomeList()

  const categoryList = data.map(category => {
    return {
      slug: category.slug,
      title: category.title,
      movies: category.movies.data
    }
  })

  const originals = categoryList.filter(category => category.slug === 'originals')
  const randomChosen = Math.floor(
    Math.random() * (originals[0].movies.results.length - 1)
  )
  const chosen = originals[0].movies.results[randomChosen]

  const featuredData = await tmdb.getMovieInfo(chosen.id, 'tv')

  return {
    props: { categoryList, featuredData },
    revalidate: 60 * 60 // 1 Hour
  }
}
