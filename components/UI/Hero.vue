<template>
  <div>
    <section class="h-96 bg-slate-900 bg-opacity-60 overflow-hidden">
      <div class="pt-1 pl-1 opacity-20" v-if="loading">Loading</div>
      <div
        class="h-full hero relative bg-cover bg-no-repeat bg-center"
        :style="backdropImgPath"
        v-else-if="movies"
      >
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
      backdropImgPath: {
        backgroundImage: '',
      },
    }
  },
  async created() {
    this.loading = true
    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + api
    const movies = await this.$axios.$get(url)
    this.movies = movies.results
    this.number = Math.floor(Math.random() * 20)

    this.backdropImgPath.backgroundImage =
      'url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' +
      this.movies[this.number].backdrop_path +
      ')'
    this.loading = false
  },
}
</script>

<style scoped>
.hero:before {
  content: '';
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
