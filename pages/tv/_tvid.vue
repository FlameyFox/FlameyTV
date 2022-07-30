<template>
  <div>
    <div v-if="loading">Loading...</div>
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
              v-if="tv.poster_path"
              :src="'https://image.tmdb.org/t/p/w500/' + tv.poster_path"
              :alt="tv.name"
              class="rounded-md"
            />
            <img
              class="bg-slate-900 rounded-md"
              v-else
              src="@/assets/img/noPoster.png"
              alt="No Poster"
            />

            <div class="bg-slate-800 rounded-lg p-5 mt-6">
              <h3 class="text-2xl mb-3">Information</h3>
              <p>Rating: {{ tv.vote_average ? tv.vote_average.toFixed(1) : '---' }}</p>
              <p>Season: {{ tv.number_of_seasons }}</p>
              <p>Episodes: {{ tv.number_of_episodes }}</p>
            </div>
          </div>
          <div class="w-2/3">
            <div class="flex gap-6">
              <div class="bg-slate-800 rounded-lg p-5">
                <h1 class="text-4xl font-bold mb-2">
                  {{ tv.name }} ( {{ tv.original_name }} )
                </h1>

                <!-- 
                  
                  TODO: MAKE IT MORE DETAILED - DISPLAY EPISODE INFO
                  
                  {{ tv }} -->

                <h4 class="text-xl italic mb-4">{{ tv.tagline }}</h4>
                <hr class="border-slate-900 border-opacity-50 mb-4" />
                <p>{{ tv.overview }}</p>
              </div>
            </div>

            <div
              class="bg-slate-800 rounded-lg p-5 scrollbar mt-6 overflow-x-scroll"
            >
              <h3 class="mb-4 text-lg font-bold">Cast</h3>
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
      tv: null,
      loading: false,
      showMore: false,
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
      '?api_key=' +
      api
    const result = await this.$axios.$get(url)
    this.tv = result
    this.backdropImgPath.backgroundImage =
      'url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' +
      result.backdrop_path +
      ')'

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
