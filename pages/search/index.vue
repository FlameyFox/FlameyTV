<template>
  <div class="max-w-screen-2xl m-auto py-6 px-6">
    <div class="flex justify-center flex-col items-center">
      <h2 class="text-4xl font-black text-center">
        Search movies, TV shows, actors and more..
      </h2>
      <input
        class="bg-slate-900 mt-4 text-white p-2 rounded-lg transition-all text-center w-3/12"
        type="text"
        v-model="query"
        placeholder="Search..."
      />
      <div class="d-flex mt-2 gap-2">
        <input
          class="bg-slate-900 mb-1 align-middle border-4 d-inline border-slate-900 checked:bg-blue-400 appearance-none text-white p-1 rounded-sm transition-all text-center"
          v-model="adult"
          name="adult"
          type="checkbox"
          id="adult"
        />
        <label class="d-inline-block" for="adult">Enable Adult (18+)</label>
      </div>
    </div>

    <div class="results mt-6">
      <div v-if="loading">
        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
        >
          <div
            class="bg-slate-700 shadow rounded-md p-4 max-w-sm w-full mx-auto animate-pulse"
            v-for="num in 6"
            :key="num"
          ></div>
        </div>
      </div>
      <div v-else-if="movies && movies.length > 1">
        <SearchMovieGrid :movies="visibleMovies" />
        <button
          class="p-2 rounded-md text-center bg-slate-900 mt-6 mx-auto block"
          @click="getMore(currentMoviePage)"
        >
          {{ loadingMoreMovies ? 'Fetching more...' : 'See more results' }}
        </button>
      </div>
      <div v-else-if="query && query.length > 2">
        <div class="flex justify-center">
          <p class="text-xl">No results for: {{ query }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const BASE_URL = 'https://api.themoviedb.org/3/search/multi'

export default {
  data() {
    return {
      movies: null,
      loading: false,
      showMore: false,
      query: null,
      adult: false,
      mtype: 'tv',
      currentMoviePage: 2,
      loadingMoreMovies: false,
    }
  },
  computed: {
    visibleMovies() {
      return this.currentMoviePage < 3 ? this.movies.slice(0, 18) : this.movies
    },
  },
  watch: {
    query(query) {
      if (query.length > 2) {
        this.search()
      }
    },
  },
  methods: {
    async fetchApi(url) {
      const api = await $fetch('/api/tmdb')
      return $fetch(`${url}&api_key=${api.tmdbAPI}`)
    },
    async search() {
      this.loading = true
      const url = `${BASE_URL}?query=${this.query}${
        this.adult ? '&include_adult=true' : ''
      }`
      const results = await this.fetchApi(url)
      this.movies = results.results.sort((a, b) => b.vote_count - a.vote_count)
      this.loading = false
    },
    async getMore() {
      this.loadingMoreMovies = true
      const url = `${BASE_URL}?query=${this.query}&page=${
        this.currentMoviePage
      }${this.adult ? '&include_adult=true' : ''}`
      const movies = await this.fetchApi(url)
      this.currentMoviePage++
      this.movies.push(...movies.results)
      this.loadingMoreMovies = false
    },
  },
}
</script>
