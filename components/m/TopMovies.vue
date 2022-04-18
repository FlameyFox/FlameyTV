<template>
  <div class="max-w-screen-2xl m-auto">
    <h2>Top Movies</h2>
    <div v-if="loading">Loading...</div>
    <div v-else class="grid grid-cols-6 gap-4">
      <MMovie :movie="movie" v-for="movie in movies" :key="movie.id" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      movies: null,
      loading: false,
    }
  },
  async created() {
    this.loading = true
    const movies = await this.$axios.$get(
      'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=26166d6d6e294abfd423ab032242cfbd'
    )
    this.movies = movies.results
    this.loading = false
  },
}
</script>
