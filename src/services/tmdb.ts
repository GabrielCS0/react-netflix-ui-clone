import axios from 'axios'

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

export default {
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Netflix Originals',
        movies: await tmdb.get('/discover/tv', {
          params: {
            with_network: 213,
            api_key: process.env.NEXT_PUBLIC_API_KEY
          }
        })
      },

      {
        slug: 'trending',
        title: 'Recommended for You',
        movies: await tmdb.get('/trending/all/week', {
          params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY
          }
        })
      },

      {
        slug: 'toprated',
        title: 'Top Rated',
        movies: await tmdb.get('/movie/top_rated', {
          params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY
          }
        })
      },

      {
        slug: 'action',
        title: 'Action',
        movies: await tmdb.get('/discover/movie', {
          params: {
            with_genres: 28,
            api_key: process.env.NEXT_PUBLIC_API_KEY
          }
        })
      },

      {
        slug: 'comedy',
        title: 'Comedy',
        movies: await tmdb.get('/discover/movie', {
          params: {
            with_genres: 35,
            api_key: process.env.NEXT_PUBLIC_API_KEY
          }
        })
      },

      {
        slug: 'animation',
        title: 'Animation',
        movies: await tmdb.get('/discover/movie', {
          params: {
            with_genres: 16,
            api_key: process.env.NEXT_PUBLIC_API_KEY
          }
        })
      },

      {
        slug: 'drama',
        title: 'Drama',
        movies: await tmdb.get('/discover/movie', {
          params: {
            with_genres: 18,
            api_key: process.env.NEXT_PUBLIC_API_KEY
          }
        })
      },

      {
        slug: 'mystery',
        title: 'Mystery',
        movies: await tmdb.get('/discover/movie', {
          params: {
            with_genres: 9648,
            api_key: process.env.NEXT_PUBLIC_API_KEY
          }
        })
      }
    ]
  },

  getMovieInfo: async (movieId: number, type: string) => {
    let info = {}

    if (movieId) {
      switch (type) {
        case 'movie':
          info = await tmdb.get(`/movie/${movieId}`, {
            params: {
              api_key: process.env.NEXT_PUBLIC_API_KEY
            }
          }).then(response => response.data)
          break
        case 'tv':
          info = await tmdb.get(`/tv/${movieId}`, {
            params: {
              api_key: process.env.NEXT_PUBLIC_API_KEY
            }
          }).then(response => response.data)
          break
      }
    }

    return info
  }
}
