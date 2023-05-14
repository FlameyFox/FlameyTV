<!--
        
        
        TODO: 
        
        - MAKE ALT BANNER PICTURE
        - Make cast function more useful and make subpage to see full cast
        
        -->

<template>
  <div>
    <div v-if="loading">
      <div
        class="bg-slate-700 shadow rounded-md p-4 h-96 w-full mx-auto animate-pulse"
      ></div>

      <div
        class="details w-2/3 mx-auto p-6 flex gap-6 bg-opacity-40 mt-5 bg-slate-700 shadow rounded-lg h-96 animate-pulse"
      ></div>
      Loading...
    </div>
    <div v-else>
      <div class="movie pb-5">
        <div
          class="banner bg-cover bg-no-repeat bg-center relative h-96"
          :style="backdropImgPath"
        ></div>
        <div
          class="details w-2/3 mx-auto p-6 flex gap-6 bg-slate-900 bg-opacity-40 mt-5 rounded-lg"
        >
          <div class="w-1/3">
            <img
              v-if="movie.poster_path"
              :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
              :alt="movie.title"
              class="rounded-md"
            />
            <img
              class="bg-slate-900 rounded-md"
              v-else
              src="@/assets/img/noPoster.png"
              alt="No Poster"
            />

            <div class="bg-slate-800 rounded-lg p-5 mt-6">
              <h3 class="text-2xl font-bold mb-3">Information</h3>
              <MInformation :movie="movie"></MInformation>
            </div>
            <div
              v-if="JSON.stringify(providers.results) != '{}'"
              class="bg-slate-800 rounded-lg p-5 mt-6"
            >
              <h3 class="mb-4 text-2xl font-bold">Providers</h3>
              <MProviders :providers="providers"></MProviders>
            </div>
          </div>
          <div class="w-2/3 overflow-hidden">
            <div class="flex gap-6">
              <div class="bg-slate-800 rounded-lg p-5 w-full">
                <h1 class="text-4xl font-bold mb-2">{{ movie.title }}</h1>
                <h4 class="text-xl italic mb-4">{{ movie.tagline }}</h4>
                <hr class="border-slate-900 border-opacity-50 mb-4" />
                <p>{{ movie.overview }}</p>
              </div>
            </div>

            <div
              class="bg-slate-800 rounded-lg p-5 scrollbar mt-6 overflow-x-scroll"
            >
              <h3 class="mb-4 text-xl font-bold">Cast</h3>
              <MCast :cast="cast"></MCast>
            </div>
          </div>

          <!-- TODO: Make actor info prettier -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      providers: [],
    }
  },
  async created() {
    const api = this.$config.tmdbAPI
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
    this.getMovieProviders(this.$route.params.mid)
    this.loading = false
  },

  methods: {
    async getMovieCredits(movieID) {
      const api = this.$config.tmdbAPI
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
    async getMovieProviders(movieID) {
      const api = this.$config.tmdbAPI
      this.loading = true
      const url =
        'https://api.themoviedb.org/3/movie/' +
        movieID +
        '/watch/providers?api_key=' +
        api
      const providers = await this.$axios.$get(url)
      this.providers = providers
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
