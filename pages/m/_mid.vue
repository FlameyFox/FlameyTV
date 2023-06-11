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
          class="details w-11/12 xl:w-2/3 mx-auto p-6 flex flex-col xl:flex-row gap-6 bg-slate-900 bg-opacity-40 mt-5 rounded-lg"
        >
          <div class="w-full gap-6 flex flex-wrap  xl:block xl:w-1/3">
            <Poster
              class="w-1/3 xl:w-full basis-1/3 "
              :object="movie"
              mtype="movie"
            ></Poster>
            <Information
              class="w-2/3 xl:w-full flex-1"
              mtype="movie"
              :object="movie"
            ></Information>

            <MCollection
              v-if="movie.belongs_to_collection"
              class="xl:w-full basis-full flex-1"
              :movie="movie"
            ></MCollection>
            <div
              v-if="JSON.stringify(providers.results) != '{}'"
              class="bg-slate-800 rounded-lg p-5 mt-0 xl:mt-6 hidden xl:block"
            >
              <h3 class="mb-4 text-2xl font-bold">Providers</h3>
              <MProviders :providers="providers"></MProviders>
            </div>
          </div>
          <div class="w-full xl:w-2/3 overflow-hidden">
            <MTitle :movie="movie"></MTitle>
            <MCast :cast="cast"></MCast>
          </div>
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
