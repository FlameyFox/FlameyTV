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
              <h3>Stats</h3>
              <p>Rating: {{ movie.vote_average }}</p>
              <p>
                Budget:
                {{
                  Intl.NumberFormat(`en-US`, {
                    currency: `USD`,
                    style: 'currency',
                  }).format(movie.budget)
                }}
              </p>
              <p>
                Revenue:
                {{
                  Intl.NumberFormat(`en-US`, {
                    currency: `USD`,
                    style: 'currency',
                  }).format(movie.revenue)
                }}
              </p>
              <p>
                <a
                  target="_blank"
                  rel="noopener nofollow"
                  :href="'https://www.imdb.com/title/' + movie.imdb_id"
                  >IMDB link</a
                >
              </p>
            </div>
          </div>
          <div class="w-2/3">
            <div class="flex gap-6">
              <div class="bg-slate-800 rounded-lg p-5">
                <h1 class="text-4xl font-bold mb-2">{{ movie.title }}</h1>
                <h4 class="text-xl italic mb-4">{{ movie.tagline }}</h4>
                <hr class="border-slate-900 border-opacity-50 mb-4" />
                <p>{{ movie.overview }}</p>
              </div>
            </div>

            <div
              class="bg-slate-800 rounded-lg p-5 scrollbar mt-6 overflow-x-scroll"
            >
              <h3 class="mb-4 text-lg font-bold">Cast</h3>
              <div>
                <div class="flex gap-3 min-w-fit">
                  <div
                    v-for="member in cast.slice(0, 12)"
                    :key="member.id"
                    class="w-36"
                  >
                    <nuxt-link
                      :to="'/actor/' + member.id"
                      class="flex flex-col gap-4 hover:bg-slate-700 bg-opacity-10 p-2 rounded-lg transition-all"
                    >
                      <img
                        :src="
                          'https://image.tmdb.org/t/p/w300_and_h300_bestv2/' +
                          member.profile_path
                        "
                        :alt="member.original_name"
                        class="w-32 h-32 rounded-md"
                        v-if="member.profile_path"
                      />
                      <img
                        class="bg-slate-900 w-32 h-32 object-cover rounded-md"
                        v-else
                        src="@/assets/img/noPoster.png"
                        alt="No Profile Image"
                      />
                      <div>
                        {{ member.original_name }}
                        <span v-if="member.character"
                          ><br />
                          as {{ member.character }}</span
                        >
                      </div>
                    </nuxt-link>
                  </div>
                  <button
                    class="bg-slate-900 w-36 rounded-lg px-2 py-6 mr-4 my-auto transition-all hover:bg-opacity-75"
                    v-if="!seeAllActors && cast.length > 12"
                    @click="seeAllActors = true"
                  >
                    See all actors
                  </button>
                  <div v-if="seeAllActors" class="flex gap-3 min-w-fit">
                    <div
                      v-for="member in cast.slice(12, 999)"
                      :key="member.id"
                      class="w-36"
                    >
                      <nuxt-link
                        :to="'/actor/' + member.id"
                        class="flex flex-col gap-4 hover:bg-slate-700 bg-opacity-10 p-2 rounded-lg transition-all"
                      >
                        <img
                          :src="
                            'https://image.tmdb.org/t/p/w300_and_h300_bestv2/' +
                            member.profile_path
                          "
                          :alt="member.original_name"
                          class="w-32 h-32 rounded-md"
                          v-if="member.profile_path"
                        />
                        <img
                          class="bg-slate-900 w-32 h-32 object-cover rounded-md"
                          v-else
                          src="@/assets/img/noPoster.png"
                          alt="No Profile Image"
                        />
                        <div>
                          {{ member.original_name }}
                          <span v-if="member.character"
                            ><br />
                            as {{ member.character }}</span
                          >
                        </div>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
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
      movie: null,
      loading: false,
      showMore: false,
      backdropImgPath: {
        backgroundImage: '',
      },
      cast: [],
      seeAllActors: false,
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
