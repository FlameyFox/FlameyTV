<template>
    <div class="max-w-screen-2xl m-auto py-6">
      <h2 class="text-4xl font-black">Top Movies</h2>
      <div v-if="loading">
        <div class="grid grid-cols-6 gap-6">
          <div
            class="bg-slate-700 shadow rounded-md p-4 max-w-sm w-full mx-auto animate-pulse"
            v-for="num in 6"
            :key="num"
          ></div>
        </div>
      </div>
      <div v-else>
        <div v-if="!showMore" class="grid grid-cols-6 gap-6">
          <MMovie
            :movie="movie"
            :loading="loading"
            v-for="movie in movies.slice(0, 6)"
            :key="movie.id"
          />
        </div>
        <div v-else class="grid grid-cols-6 gap-6">
          <MMovie
            :movie="movie"
            :loading="loading"
            v-for="movie in movies.slice(0, 18)"
            :key="movie.id"
          />
        </div>
      </div>
      <button
        v-if="!showMore"
        class="p-2 rounded-md text-center bg-slate-900 mt-6 mx-auto block"
        @click="showMore = true"
      >
        Show more
      </button>
    </div>
</template>
<script>
const api = process.env.TMDB_API
export default {
  data() {
    return {
      movies: null,
      loading: false,
      showMore: false,
    }
  },
  async created() {
    this.loading = true
    const url =
      'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&&vote_count.gte=250&api_key=' +
      api
    const movies = await this.$axios.$get(url)
    this.movies = movies.results
    this.loading = false
  },
}
</script>
