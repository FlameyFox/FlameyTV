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
      <div class="actor pb-5">
        <!-- TODO: MAKE ALT BANNER PICTURE -->
        <div
          class="banner bg-cover bg-no-repeat bg-center relative h-96"
          :style="backdropImgPath"
        ></div>
        <div
          class="details w-11/12 xl:w-2/3 mx-auto p-6 flex flex-col xl:flex-row gap-6 bg-slate-900 bg-opacity-40 mt-5 rounded-lg"
        >
          <div class="w-full gap-6 flex xl:block xl:w-1/3">
            <Poster
              class="w-1/3 xl:w-full"
              :object="person"
              mtype="person"
            ></Poster>
            <Information mtype="person" class="w-2/3 xl:w-full" :object="person"></Information>
          </div>
          <div class="w-full xl:w-2/3 overflow-hidden">
            <div class="flex gap-6">
              <div class="bg-slate-800 w-full rounded-lg p-5">
                <h1 class="text-4xl font-bold mb-2">
                  {{ person.name }}
                </h1>
                <hr class="border-slate-900 border-opacity-50 mb-4" />
                <p>{{ person.biography }}</p>
              </div>
            </div>
            <div class="bg-slate-800 rounded-lg p-5 mt-6">
              <h3 class="mb-4 text-2xl font-bold">Filmography</h3>
              <div v-if="credits && credits.length > 1">
                <div class="grid grid-cols-4 gap-6">
                  <!-- FIXME: TODO:
                        Remove duplicate entries when an actor voices more characters
                        maybe check media type and show which character if it's a tv show
                         -->
                  <MMovie
                    :movie="movie"
                    :loading="loading"
                    v-for="movie in credits.slice(0, 20)"
                    :key="movie.id"
                    :mtype="movie.media_type"
                  />
                </div>
              </div>
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
      person: null,
      loading: false,
      showMore: false,
      backdropImgPath: {
        backgroundImage: '',
      },
      credits: [],
    }
  },
  async created() {
    const api = this.$config.tmdbAPI
    this.loading = true
    const url =
      'https://api.themoviedb.org/3/person/' +
      this.$route.params.pid +
      '?api_key=' +
      api
    const person = await this.$axios.$get(url)
    this.person = person
    this.getPersonMovieCredits()
    this.loading = false
  },
  methods: {
    async getPersonMovieCredits() {
      const api = this.$config.tmdbAPI
      this.loading = true
      const url =
        'https://api.themoviedb.org/3/person/' +
        this.$route.params.pid +
        '/combined_credits?api_key=' +
        api
      const credits = await this.$axios.$get(url)
      this.credits = credits.cast
      this.credits.sort((a, b) => b.vote_count - a.vote_count)
      // TODO: Maybe sort movies differently

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
