<template>
  <div class="max-w-screen-2xl m-auto py-6 px-6">
    <h2 class="text-4xl font-black mb-5 text-center w-full">
      See whats trending this week
    </h2>
    <div v-if="loading">
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        <div
          class="bg-slate-700 shadow rounded-md p-4 max-w-sm w-full mx-auto animate-pulse"
          v-for="num in 6"
          :key="num"></div>
      </div>
    </div>
    <div v-else>
      <div
        v-if="currentMoviePage < 3 && movies"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        <MMovie
          :movie="movie"
          :loading="loading"
          v-for="movie in movies.slice(0, 18)"
          :key="movie.id"
          :mtype="movie.media_type" />
      </div>
      <div
        v-else
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        <MMovie
          :movie="movie"
          :loading="loading"
          v-for="movie in movies"
          :key="movie.id"
          :mtype="movie.media_type" />
      </div>
    </div>
    <button
      class="p-2 rounded-md text-center bg-slate-900 mt-6 mx-auto block"
      @click="getMoreMovies(currentMoviePage)">
      {{ loadingMoreMovies ? "Fetching more..." : "Load more" }}
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      movies: null,
      loading: false,
      loadingMoreMovies: false,
      currentMoviePage: 2,
    };
  },
  async created() {
    const api = await $fetch("/api/tmdb");
    this.loading = true;
    const url =
      "https://api.themoviedb.org/3/trending/all/week?api_key=" + api.tmdbAPI;
    const movies = await $fetch(url);
    this.movies = movies.results;
    this.loading = false;
  },

  methods: {
    async getMoreMovies(pageId) {
      const api = await $fetch("/api/tmdb");
      this.loadingMoreMovies = true;
      const url =
        "https://api.themoviedb.org/3/trending/all/week?api_key=" +
        api.tmdbAPI +
        "&page=" +
        pageId;
      const movies = await $fetch(url);
      this.currentMoviePage++;

      movies.results.forEach((v) => {
        this.movies.push(v);
      });
      this.loadingMoreMovies = false;
    },
  },
};
</script>
