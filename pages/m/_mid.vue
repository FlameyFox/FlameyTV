<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="movie pb-5">
        <!-- TODO: MAKE ALT BANNER PICTURE -->
        <div
          class="banner bg-cover bg-no-repeat bg-center relative h-96"
          :style="backdropImgPath"
        ></div>
        <div
          class="details w-2/3 mx-auto p-6 bg-slate-900 bg-opacity-40 mt-5 rounded-lg"
        >
          <div class="flex gap-6">
            <img
              v-if="movie.poster_path"
              :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
              :alt="movie.title"
              class="w-72 rounded-md"
            />
            <img
              class="bg-slate-900 w-72 rounded-md"
              v-else
              src="@/assets/img/noPoster.png"
              alt="No Poster"
            />
            <div>
              <div class="bg-slate-800 rounded-lg p-5">
                <h1 class="text-4xl font-bold mb-2">{{ movie.title }}</h1>
                <h4 class="text-xl italic mb-4">{{ movie.tagline }}</h4>
                <hr class="border-slate-800 mb-4" />
                <p>{{ movie.overview }}</p>
              </div>
            </div>
          </div>
          <div class="bg-slate-800 rounded-lg p-5 w-72 mt-6">
            <h3>Stats</h3>
            <p>Rating: {{ movie.vote_average }}</p>
            <p>Budget: {{ movie.budget }}</p>
            <p>Revenue: {{ movie.revenue }}</p>
            <p>IMDB id: {{ movie.imdb_id }}</p>
          </div>
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
.banner:before {
  content: '';
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
