<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <img
        v-if="movie.poster_path"
        :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
        :alt="movie.title"
        class="w-60"
      />
      <img
        class="bg-white w-60"
        v-else
        src="@/assets/img/noPoster.svg"
        alt="No Poster"
      />
      <h1>{{ movie.title }}</h1>
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
