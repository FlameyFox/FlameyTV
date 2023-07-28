<template>
  <div class="max-w-screen-2xl m-auto py-6 px-6">
    <div class="flex justify-center flex-col items-center">
      <h2 class="text-4xl font-black text-center">
        Search movies, TV shows, actors and more..
      </h2>
      <input
        class="bg-slate-900 mt-4 text-white p-2 rounded-lg transition-all text-center w-3/12"
        type="text"
        v-model="query"
        s
<<<<<<< HEAD
        placeholder="Search..."
      />
=======
        placeholder="Search..." />
>>>>>>> cd927d0 (nuxt3)

      <div class="d-flex mt-2 gap-2">
        <input
          class="bg-slate-900 mb-1 align-middle border-4 d-inline border-slate-900 checked:bg-blue-400 appearance-none text-white p-1 rounded-sm transition-all text-center"
          v-model="adult"
          name="adult"
          type="checkbox"
<<<<<<< HEAD
          id="adult"
        />
=======
          id="adult" />
>>>>>>> cd927d0 (nuxt3)
        <label class="d-inline-block" for="adult">Enable Adult (18+)</label>
      </div>
    </div>

    <div class="results mt-6">
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
      <div v-else-if="movies && movies.length > 1">
        <div
          v-if="currentMoviePage < 3"
<<<<<<< HEAD
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
        >
=======
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
>>>>>>> cd927d0 (nuxt3)
          <!-- TODO: CHECK WHAT MOVIE TYPE IT IS -->
          <MMovie
            :movie="movie"
            :mtype="movie.media_type"
            :loading="loading"
            v-for="movie in movies.slice(0, 18)"
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
            :key="movie.id"
<<<<<<< HEAD
            :mtype="movie.media_type"
          />
        </div>
        <button
          class="p-2 rounded-md text-center bg-slate-900 mt-6 mx-auto block"
          @click="getMore(currentMoviePage)"
        >
          {{ loadingMoreMovies ? 'Fetching more...' : 'See more results' }}
=======
            :mtype="movie.media_type" />
        </div>
        <button
          class="p-2 rounded-md text-center bg-slate-900 mt-6 mx-auto block"
          @click="getMore(currentMoviePage)">
          {{ loadingMoreMovies ? "Fetching more..." : "See more results" }}
>>>>>>> cd927d0 (nuxt3)
        </button>
      </div>
      <div v-else-if="query && query.length > 2">
        <div class="flex justify-center">
          <p class="text-xl">No results for: {{ query }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: null,
      loading: false,
      showMore: false,
      query: null,
      adult: false,
<<<<<<< HEAD
      mtype: 'tv',
      currentMoviePage: 2,
      loadingMoreMovies: false,
    }
=======
      mtype: "tv",
      currentMoviePage: 2,
      loadingMoreMovies: false,
    };
>>>>>>> cd927d0 (nuxt3)
  },
  watch: {
    query(query) {
      if (query.length > 2) {
<<<<<<< HEAD
        this.search()
=======
        this.search();
>>>>>>> cd927d0 (nuxt3)
      }
    },
  },
  methods: {
    async search() {
<<<<<<< HEAD
      const api = this.$config.tmdbAPI
      this.loading = true
      var url =
        'https://api.themoviedb.org/3/search/multi?query=' +
        this.query +
        '&api_key=' +
        api
      if (this.adult) {
        url += '&include_adult=true'
      }

      const results = await this.$axios.$get(url)
      this.movies = results.results
      this.movies.sort((a, b) => {
        if (a.vote_count > b.vote_count) return -1
        if (a.vote_count < b.vote_count) return 1
        return 0
      })
      this.loading = false
    },
    async getMore(pageId) {
      const api = this.$config.tmdbAPI
      this.loadingMoreMovies = true
      var url =
        'https://api.themoviedb.org/3/search/multi?query=' +
        this.query +
        '&api_key=' +
        api +
        '&page=' +
        pageId
      if (this.adult) {
        url += '&include_adult=true'
      }
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
      this.loading = true;
      var url =
        "https://api.themoviedb.org/3/search/multi?query=" +
        this.query +
        "&api_key=" +
        api.tmdbAPI;
      if (this.adult) {
        url += "&include_adult=true";
      }

      const results = await $fetch(url);
      this.movies = results.results;
      this.movies.sort((a, b) => {
        if (a.vote_count > b.vote_count) return -1;
        if (a.vote_count < b.vote_count) return 1;
        return 0;
      });
      this.loading = false;
    },
    async getMore(pageId) {
      const api = await $fetch("/api/tmdb");
      this.loadingMoreMovies = true;
      var url =
        "https://api.themoviedb.org/3/search/multi?query=" +
        this.query +
        "&api_key=" +
        api.tmdbAPI +
        "&page=" +
        pageId;
      if (this.adult) {
        url += "&include_adult=true";
      }
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
