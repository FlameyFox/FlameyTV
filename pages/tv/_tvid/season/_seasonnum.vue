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
      <div class="tv pb-5">
        <!-- TODO: MAKE ALT BANNER PICTURE -->
        <div
          class="banner bg-cover bg-no-repeat bg-center relative h-96"
          :style="backdropImgPath"
        ></div>
        <div
          class="details w-2/3 mx-auto p-6 flex gap-6 bg-slate-900 bg-opacity-40 mt-5 rounded-lg"
        >
          <div class="w-1/3">
            <img
              v-if="season.poster_path"
              :src="'https://image.tmdb.org/t/p/w500/' + season.poster_path"
              :alt="season.name"
              class="rounded-md"
            />
            <img
              class="bg-slate-900 rounded-md"
              v-else
              src="@/assets/img/noPoster.png"
              alt="No Poster"
            />

            <div class="bg-slate-800 rounded-lg p-5 mt-6">
              <h3 class="text-2xl mb-3 font-bold">Information</h3>
              <p>
                Rating:
                {{
                  season.vote_average ? season.vote_average.toFixed(1) : '---'
                }}
              </p>
            </div>
          </div>
          <div class="w-2/3">
            <div class="flex gap-6">
              <div class="bg-slate-800 rounded-lg p-5">
                <nuxt-link :to="'/tv/' + this.$route.params.tvid"
                  >Go back to show</nuxt-link
                >
                <h1 class="mt-5 text-4xl font-bold mb-2">
                  {{ season.name }}
                </h1>
                <hr class="border-slate-900 border-opacity-50 mb-4" />
                <p>{{ season.overview }}</p>

                <strong class="mt-5 block"
                  >TODO: Episodes coming soon...</strong
                >
              </div>
            </div>

            <div
              class="bg-slate-800 rounded-lg p-5 scrollbar mt-6 overflow-x-scroll"
            >
              <h3 class="mb-4 text-2xl font-bold">Cast</h3>
              <TvCast :cast="cast"></TvCast>
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
      season: null,
      loading: false,
      backdropImgPath: {
        backgroundImage: '',
      },
      cast: [],
    }
  },
  async created() {
    const api = this.$config.tmdbAPI
    this.loading = true
    const url =
      'https://api.themoviedb.org/3/tv/' +
      this.$route.params.tvid +
      '/season/' +
      this.$route.params.seasonnum +
      '?api_key=' +
      api
    const result = await this.$axios.$get(url)
    this.season = result

    this.getMovieCredits(this.$route.params.tvid)

    this.loading = false
  },

  methods: {
    async getMovieCredits(ID) {
      const api = this.$config.tmdbAPI
      this.loading = true
      const url =
        'https://api.themoviedb.org/3/tv/' + ID + '/credits?api_key=' + api
      const credits = await this.$axios.$get(url)
      this.cast = credits.cast
      this.loading = false
    },
    async getTVSeasons(ID, seasonNum) {
      const api = this.$config.tmdbAPI
      this.loading = true
      const url =
        'https://api.themoviedb.org/3/tv/' + ID + '/season/' + seasonNum
      const season = await this.$axios.$get(url)
      this.season = season
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
