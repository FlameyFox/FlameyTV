<template>
    <div class="max-w-screen-2xl m-auto py-6">
      <h2 class="text-4xl font-black">Search movies</h2>
      <div>
        <input type="text" v-model="query" placeholder="Search..." />
      </div>
      <div class="results">
        <div v-if="loading">
          <div class="grid grid-cols-6 gap-6">
            <div
              class="bg-slate-700 shadow rounded-md p-4 max-w-sm w-full mx-auto animate-pulse"
              v-for="num in 6"
              :key="num"
            ></div>
          </div>
        </div>
        <div v-else-if="movies">
          <div class="grid grid-cols-6 gap-6">
            <MMovie
              :movie="movie"
              :loading="loading"
              v-for="movie in movies.slice(0, 18)"
              :key="movie.id"
            />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
const api = process.env.TMDB_API
export default {
  data() {
    return {
      movies: null,
      loading: false,
      showMore: false,
      query: null,
    }
  },
  watch: {
    query(query) {
      if (query.length > 2) {
        this.search()
      }
    },
  },
  methods: {
    async search() {
      this.loading = true
      const url =
        'https://api.themoviedb.org/3/search/movie?query=' +
        this.query +
        '&api_key=' +
        api
      const results = await this.$axios.$get(url)
      this.movies = results.results
      console.log(this.movies)
      this.loading = false
    },
  },
}
</script>
