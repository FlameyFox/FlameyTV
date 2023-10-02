<template>
  <div>
    <div v-if="loading">
      <div
        class="bg-slate-700 shadow rounded-md p-4 h-96 w-full mx-auto animate-pulse"></div>
      <div
        class="details w-2/3 mx-auto p-6 flex gap-6 bg-opacity-40 mt-5 bg-slate-700 shadow rounded-lg h-96 animate-pulse"></div>
      Loading...
    </div>
    <div v-else-if="season">
      <div class="tv pb-5">
        <!-- TODO: MAKE ALT BANNER PICTURE -->
        <div
          class="banner bg-cover bg-no-repeat bg-center relative h-96"
          :style="backdropImgPath"></div>
        <div
          class="details w-2/3 mx-auto p-6 flex gap-6 bg-slate-900 bg-opacity-40 mt-5 rounded-lg">
          <div class="w-1/3">
            <img
              v-if="season.poster_path"
              :src="'https://image.tmdb.org/t/p/w500/' + season.poster_path"
              :alt="season.name"
              class="rounded-md" />
            <img
              class="bg-slate-900 rounded-md"
              v-else
              src="@/assets/img/noPoster.png"
              alt="No Poster" />

            <div class="bg-slate-800 rounded-lg p-5 mt-6">
              <h3 class="text-2xl mb-3 font-bold">Information</h3>
              <p>
                Rating:
                {{
                  season.vote_average ? season.vote_average.toFixed(1) : "---"
                }}
              </p>
            </div>
          </div>
          <div class="w-2/3">
            <div class="flex gap-6">
              <div class="bg-slate-800 w-full rounded-lg p-5">
                <nuxt-link
                  class="bg-slate-700 text-sm rounded-md py-1 px-3"
                  :to="'/tv/' + this.$route.params.tvid"
                  >Go back to show</nuxt-link
                >
                <h1 v-if="!!this.tvname" class="mt-5 text-4xl font-bold mb-2">
                  {{ this.tvname + " – " + season.name }}
                </h1>
                <h1 v-else class="mt-5 text-4xl font-bold mb-2">
                  {{ season.name }}
                </h1>
                <hr class="border-slate-900 border-opacity-50 mb-4" />
                <p>{{ season.overview }}</p>
              </div>
            </div>

            <div
              class="bg-slate-800 rounded-lg p-5 scrollbar mt-6 overflow-x-scroll">
              <h3 class="mb-4 text-2xl font-bold">Cast</h3>
              <TvCast :cast="cast"></TvCast>
            </div>
            <TvEpisodes
              v-if="season.episodes"
              :tv="tv"
              :season="season"></TvEpisodes>
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
      season: null,
      tv: null,
      loading: true,
      backdropImgPath: {
        backgroundImage: "",
      },
      cast: [],
      tvname: null,
    };
  },
  async created() {
    const api = await $fetch("/api/tmdb");
    this.tv = this.$route.params.tvid;
    this.loading = true;
    const url =
      "https://api.themoviedb.org/3/tv/" +
      this.tv +
      "/season/" +
      this.$route.params.seasonnum +
      "?api_key=" +
      api.tmdbAPI;
    const result = await $fetch(url);
    this.season = result;

    this.getMovieCredits(this.$route.params.tvid);
    this.getTVName();

    this.loading = false;
  },

  methods: {
    async getMovieCredits(ID) {
      const api = await $fetch("/api/tmdb");
      const url =
        "https://api.themoviedb.org/3/tv/" +
        ID +
        "/credits?api_key=" +
        api.tmdbAPI;
      const credits = await $fetch(url);
      this.cast = credits.cast;
    },
    async getTVName() {
      const api = await $fetch("/api/tmdb");
      const url =
        "https://api.themoviedb.org/3/tv/" +
        this.$route.params.tvid +
        "?api_key=" +
        api.tmdbAPI;
      const tv = await $fetch(url);
      this.tvname = tv.name;
    },
  },
};
</script>

<style scoped>
.banner:before {
  content: "";
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
