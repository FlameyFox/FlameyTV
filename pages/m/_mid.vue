<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="movie" :style="backdropImgPath">
        <div class="details p-8">
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
          <h1>{{ movie.title }}</h1>
          <p>Rating: {{ movie.vote_average }}</p>
          <p>Budget: {{ movie.budget }}</p>
          <p>Revenue: {{ movie.revenue }}</p>
          <p>IMDB id: {{ movie.imdb_id }}</p>
          <p>Description: {{ movie.overview }}</p>
          <p>Cast: {{ mCredits }}</p>

          <div class="flex flex-wrap">
            <span
              v-for="member in cast"
              :key="member.id"
              class="inline-block mx-1"
              ><nuxt-link :to="'/actor/' + member.id">{{
                member.original_name
              }}</nuxt-link>
              as {{ member.character }},</span
            >
          </div>

          <!-- TODO: Make actor info prettier -->
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
      movie: null,
      loading: false,
      showMore: false,
      backdropImgPath: {
        backgroundImage: '',
      },
      cast: [],
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
    this.backdropImgPath.backgroundImage =
      'url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' +
      movie.backdrop_path +
      ')'

    this.getMovieCredits(this.$route.params.mid)
    this.loading = false
  },

  methods: {
    async getMovieCredits(movieID) {
      this.loading = true
      const url =
        'https://api.themoviedb.org/3/movie/' +
        movieID +
        '/credits?api_key=' +
        api
      const credits = await this.$axios.$get(url)
      this.cast = credits.cast
      this.loading = false
    },
  },
}
</script>

<style scoped>
.details {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
