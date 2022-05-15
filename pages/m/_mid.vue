<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <img
        v-if="movie.backdrop_path"
        :src="
          'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' +
          movie.backdrop_path
        "
        :alt="movie.title"
        class="w-60"
      />
      <h1>{{ movie.title }}</h1>
      <div class="details">
        <img
          v-if="movie.poster_path"
          :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
          :alt="movie.title"
          class="w-60"
        />
        <img
          class="bg-white w-60"
          v-else
          src="@/assets/img/noPoster.png"
          alt="No Poster"
        />
        <p>Rating: {{ movie.vote_average }}</p>
        <p>Budget: {{ movie.budget }}</p>
        <p>Revenue: {{ movie.revenue }}</p>
        <p>IMDB id: {{ movie.imdb_id }}</p>
        <p>Description: {{ movie.overview }}</p>


        <!-- TODO: Get actor info -->
      </div>
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
