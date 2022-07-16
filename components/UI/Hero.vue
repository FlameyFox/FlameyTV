<template>
  <div>
    <section class="h-96 bg-slate-900 bg-opacity-60 overflow-hidden">
      <div class="pt-1 pl-1 opacity-60" v-if="loading">Loading</div>
      <div class="h-full relative" v-else-if="movies">
        <img
          :src="
            'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' +
            movies[this.number].backdrop_path
          "
          alt="movie.title"
          class="opacity-40 h-full w-full object-cover"
        />
        <nuxt-link
          class="absolute top-1 left-1 opacity-60 hover:opacity-100 transition-all"
          :to="'/m/' + movies[this.number].id"
          >{{ movies[this.number].title }}</nuxt-link
        >
      </div>
    </section>
  </div>
</template>

<script>
const api = process.env.TMDB_API
export default {
  data() {
    return {
      movies: null,
      loading: false,
      number: 0,
    }
  },
  async created() {
    this.loading = true
    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + api
    const movies = await this.$axios.$get(url)
    this.movies = movies.results
    this.number = Math.floor(Math.random() * 20) + 1
    this.loading = false
  },
}
</script>
