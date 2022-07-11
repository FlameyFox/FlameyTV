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
              <h3>Stats</h3>
              <p>Rating: {{ tv.vote_average }}</p>
              <p>Season: {{ tv.number_of_seasons }}</p>
              <p>Episodes: {{ tv.number_of_episodes }}</p>
              <p>
                <a
                  target="_blank"
                  rel="noopener nofollow"
                  :href="'https://www.imdb.com/title/' + tv.imdb_id"
                  class="w-fit block mt-2"
                  ><svg
                    id="imdb_logo"
                    class="ipc-logo opacity-40 hover:opacity-100 transition-all"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="32"
                    viewBox="0 0 64 32"
                    version="1.1"
                  >
                    <g fill="#F5C518">
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="4"
                      ></rect>
                    </g>
                    <g
                      transform="translate(8.000000, 7.000000)"
                      fill="#000000"
                      fill-rule="nonzero"
                    >
                      <polygon points="0 18 5 18 5 0 0 0"></polygon>
                      <path
                        d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"
                      ></path>
                      <path
                        d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"
                      ></path>
                      <path
                        d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"
                      ></path>
                    </g></svg
                ></a>
              </p>
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
const api = process.env.TMDB_API
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
