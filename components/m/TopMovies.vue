<template>
  <div class="max-w-screen-2xl m-auto py-6 px-6">
    <h2 class="text-4xl w-full text-center font-black mb-2">
      Most popular movies
    </h2>
    <p class="text-xl w-full text-center font-medium mb-5">
      See what movies are trending right now
    </p>
    <div v-if="loading">
      <div
<<<<<<< HEAD
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
      >
        <div
          class="bg-slate-700 shadow rounded-md p-4 max-w-sm w-full mx-auto animate-pulse"
          v-for="num in 6"
          :key="num"
        ></div>
=======
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        <div
          class="bg-slate-700 shadow rounded-md p-4 max-w-sm w-full mx-auto animate-pulse"
          v-for="num in 6"
          :key="num"></div>
>>>>>>> cd927d0 (nuxt3)
      </div>
    </div>
    <div v-else>
      <div
        v-if="currentMoviePage < 3"
<<<<<<< HEAD
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
      >
=======
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
>>>>>>> cd927d0 (nuxt3)
        <MMovie
          :movie="movie"
          :loading="loading"
          v-for="movie in movies.slice(0, 12)"
<<<<<<< HEAD
          :key="movie.id"
        />
      </div>
      <div
        v-else
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
      >
=======
          :key="movie.id" />
      </div>
      <div
        v-else
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
>>>>>>> cd927d0 (nuxt3)
        <MMovie
          :movie="movie"
          :loading="loading"
          v-for="movie in movies"
<<<<<<< HEAD
          :key="movie.id"
        />
=======
          :key="movie.id" />
>>>>>>> cd927d0 (nuxt3)
      </div>
    </div>
    <button
      class="p-2 rounded-md text-center bg-slate-900 mt-6 mx-auto block"
<<<<<<< HEAD
      @click="getMoreMovies(currentMoviePage)"
    >
      {{ loadingMoreMovies ? 'Fetching more movies...' : 'Load more' }}
=======
      @click="getMoreMovies(currentMoviePage)">
      {{ loadingMoreMovies ? "Fetching more movies..." : "Load more" }}
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
    const url =
      'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&&vote_count.gte=250&api_key=' +
      api
    const movies = await this.$axios.$get(url)
    this.movies = movies.results
    this.loading = false
=======
    };
  },
  async created() {
    const api = this.$config.tmdbAPI;
    this.loading = true;
    const url =
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&&vote_count.gte=250&api_key=" +
      api;
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
        'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&&vote_count.gte=250&api_key=' +
        api +
        '&page=' +
        pageId
      const movies = await this.$axios.$get(url)
      console.log(movies.results)
      this.currentMoviePage++

      movies.results.forEach((v) => {
        this.movies.push(v)
      })
      this.loadingMoreMovies = false
    },
  },
}
=======
      const api = this.$config.tmdbAPI;
      this.loadingMoreMovies = true;
      const url =
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&&vote_count.gte=250&api_key=" +
        api +
        "&page=" +
        pageId;
      const movies = await $fetch(url);
      console.log(movies.results);
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
