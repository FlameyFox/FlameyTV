<template>
  <div class="max-w-screen-2xl m-auto py-6 px-6">
<<<<<<< HEAD
    <h2 class="text-4xl font-black mb-5 text-center w-full">See whats trending this week</h2>
    <div v-if="loading">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        <div
          class="bg-slate-700 shadow rounded-md p-4 max-w-sm w-full mx-auto animate-pulse"
          v-for="num in 6"
          :key="num"
        ></div>
      </div>
    </div>
    <div v-else>
      <div v-if="currentMoviePage < 3" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
=======
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
>>>>>>> cd927d0 (nuxt3)
        <MMovie
          :movie="movie"
          :loading="loading"
          v-for="movie in movies.slice(0, 18)"
          :key="movie.id"
<<<<<<< HEAD
          :mtype="movie.media_type"
        />
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
=======
          :mtype="movie.media_type" />
      </div>
      <div
        v-else
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
>>>>>>> cd927d0 (nuxt3)
        <MMovie
          :movie="movie"
          :loading="loading"
          v-for="movie in movies"
          :key="movie.id"
<<<<<<< HEAD
          :mtype="movie.media_type"
        />
=======
          :mtype="movie.media_type" />
>>>>>>> cd927d0 (nuxt3)
      </div>
    </div>
    <button
      class="p-2 rounded-md text-center bg-slate-900 mt-6 mx-auto block"
<<<<<<< HEAD
      @click="getMoreMovies(currentMoviePage)"
    >
      {{ loadingMoreMovies ? 'Fetching more...' : 'Load more' }}
=======
      @click="getMoreMovies(currentMoviePage)">
      {{ loadingMoreMovies ? "Fetching more..." : "Load more" }}
>>>>>>> cd927d0 (nuxt3)
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
<<<<<<< HEAD
    }
  },
  async created() {
    const api = this.$config.tmdbAPI
    this.loading = true
    const url = 'https://api.themoviedb.org/3/trending/all/week?api_key=' + api
    const movies = await this.$axios.$get(url)
    this.movies = movies.results
    this.loading = false
=======
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
>>>>>>> cd927d0 (nuxt3)
  },

  methods: {
    async getMoreMovies(pageId) {
<<<<<<< HEAD
      const api = this.$config.tmdbAPI
      this.loadingMoreMovies = true
      const url =
        'https://api.themoviedb.org/3/trending/all/week?api_key=' +
        api +
        '&page=' +
        pageId
      const movies = await this.$axios.$get(url)
      this.currentMoviePage++

      movies.results.forEach((v) => {
        this.movies.push(v)
      })
      this.loadingMoreMovies = false
    },
  },
}
=======
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
>>>>>>> cd927d0 (nuxt3)
</script>
