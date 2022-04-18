<template>
  <div>
    <div>
      <input type="text" v-model="query" placeholder="Search..." />
    </div>
    <div class="results">
      <div v-if="loading">Loading...</div>
      <div v-else>{{ results }}</div>
    </div>
  </div>
</template>

<script>
const api = process.env.TMDB_API
export default {
  data() {
    return {
      results: null,
      loading: false,
      showMore: false,
      query: null,
    }
  },
  async created() {
    this.loading = true
    const url =
      'https://api.themoviedb.org/3/search/movie?query=' +
      this.query +
      '&api_key=' +
      api
    const results = await this.$axios.$get(url)
    this.movies = results.results
    this.loading = false
  },
}
</script>
