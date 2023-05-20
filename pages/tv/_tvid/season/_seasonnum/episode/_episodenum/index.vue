<!--

TODO: Make it easy to go between episodes in the same season and show.

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
              v-if="episode.still_path"
              :src="'https://image.tmdb.org/t/p/w500/' + episode.still_path"
              :alt="episode.name"
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
              <p>Air date: {{ episode.air_date }}</p>
              <p>
                Rating:
                {{
                  episode.vote_average ? episode.vote_average.toFixed(1) : '---'
                }}
              </p>
              <p>Runtime: {{ episode.runtime }} min</p>
            </div>
          </div>
          <div class="w-2/3">
            <div class="flex gap-6">
              <div class="bg-slate-800 w-full rounded-lg p-5">
                <nuxt-link
                  class="bg-slate-700 text-sm rounded-md py-1 px-3"
                  :to="
                    '/tv/' +
                    this.$route.params.tvid +
                    '/season/' +
                    this.$route.params.seasonnum
                  "
                  >Go back to season</nuxt-link
                >
                <h1 class="mt-5 text-4xl font-bold mb-2">
                  {{ episode.episode_number }}. {{ episode.name }}
                </h1>
                <hr class="border-slate-900 border-opacity-50 mb-4" />
                <p>{{ episode.overview }}</p>
              </div>
            </div>

            <div
              class="bg-slate-800 rounded-lg p-5 scrollbar mt-6 overflow-x-scroll"
            >
              <h3 class="mb-4 text-2xl font-bold">Cast</h3>
              <TvCast :cast="this.cast"></TvCast>
            </div>
            <div
              class="bg-slate-800 rounded-lg p-5 scrollbar mt-6 overflow-x-scroll"
            >
              <h3 class="mb-4 text-2xl font-bold">Crew</h3>
              <TvCast :cast="episode.crew"></TvCast>
            </div>
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
      season: null,
      tv: null,
      episode: null,
      loading: false,
      backdropImgPath: {
        backgroundImage: '',
      },
      cast: [],
    }
  },
  async created() {
    const api = this.$config.tmdbAPI
    this.tv = this.$route.params.tvid
    this.season = this.$route.params.seasonnum

    this.loading = true
    const url =
      'https://api.themoviedb.org/3/tv/' +
      this.tv +
      '/season/' +
      this.$route.params.seasonnum +
      '/episode/' +
      this.$route.params.episodenum +
      '?api_key=' +
      api
    const result = await this.$axios.$get(url)
    this.episode = result

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
