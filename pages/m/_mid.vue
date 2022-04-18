<template>
  <div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <h1>{{ movie.original_title }}</h1>
    </div>
  </div>
</template>

<script>
const api = process.env.TMDB_API
export default {
  data() {
    return {
      movie: null,
      loading: false,
      showMore: false,
    }
  },
  async created() {
    this.loading = true
    const url =
      'https://api.themoviedb.org/3/movie/' +
      this.$route.params.mid +
      '?api_key=' +
      api
    const movie = await this.$axios.$get(url)
    this.movie = movie
    this.loading = false
  },
}
</script>
