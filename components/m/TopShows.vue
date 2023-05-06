<template>
  <div class="max-w-screen-2xl m-auto py-6 px-6">
    <h2 class="text-4xl w-full text-center font-black mb-2">Most popular shows</h2>
    <p class="text-xl w-full text-center font-medium mb-5">See what shows are trending right now</p>
    <div v-if="loading">
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
      >
        <div
          class="bg-slate-700 shadow rounded-md p-4 max-w-sm w-full mx-auto animate-pulse"
          v-for="num in 6"
          :key="num"
        ></div>
      </div>
    </div>
    <div v-else>
      <div
        v-if="correntShowPage < 3"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
      >
        <MMovie
          :movie="movie"
          :mtype="mtype"
          :loading="loading"
          v-for="movie in movies.slice(0, 12)"
          :key="movie.id"
        />
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        <MMovie
          :movie="movie"
          :mtype="mtype"
          :loading="loading"
          v-for="movie in movies"
          :key="movie.id"
        />
      </div>
    </div>
    <button
      class="p-2 rounded-md text-center bg-slate-900 mt-6 mx-auto block"
      @click="getMoreShows(correntShowPage)"
    >
      {{ loadingMoreShows ? 'Fetching more shows...' : 'Load more' }}
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      movies: null,
      loading: false,
      loadingMoreShows: false,
      correntShowPage: 2,
      mtype: "tv"
    }
  },
  async created() {
    const api = this.$config.tmdbAPI
    this.loading = true
    const url =
      'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&&vote_count.gte=250&api_key=' +
      api
    const movies = await this.$axios.$get(url)
    this.movies = movies.results
    this.loading = false
  },

  methods: {
    async getMoreShows(pageId) {
      const api = this.$config.tmdbAPI
      this.loadingMoreShows = true
      const url =
        'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&&vote_count.gte=250&api_key=' +
        api +
        '&page=' +
        pageId
      const movies = await this.$axios.$get(url)
      console.log(movies.results)
      this.correntShowPage++

      movies.results.forEach((v) => {
        this.movies.push(v)
      })
      this.loadingMoreShows = false
    },
  },
}
</script>
