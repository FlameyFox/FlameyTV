<template>
  <div>
    <div v-if="loading">
      <div
        class="bg-slate-700 shadow rounded-md p-4 h-96 w-full mx-auto animate-pulse"></div>
      <div
        class="details w-2/3 mx-auto p-6 flex gap-6 bg-opacity-40 mt-5 bg-slate-700 shadow rounded-lg h-96 animate-pulse"></div>
      Loading...
    </div>
    <div v-else-if="tv">
      <div class="tv pb-5">
        <div
          class="banner bg-cover bg-no-repeat bg-center relative h-96"
          :style="backdropImgPath"></div>
        <div
          class="details w-11/12 xl:w-2/3 mx-auto p-6 flex flex-col xl:flex-row gap-6 bg-slate-900 bg-opacity-40 mt-5 rounded-lg">
          <div class="w-full gap-6 flex xl:block xl:w-1/3">
            <Poster class="w-1/3 xl:w-full" :object="tv" mtype="tv"></Poster>
            <Information
              class="w-2/3 xl:w-full"
              :object="tv"
              mtype="tv"></Information>
          </div>
          <div class="w-full xl:w-2/3 overflow-hidden">
            <div class="flex gap-6">
              <div class="bg-slate-800 w-full rounded-lg p-5">
                <h1
                  v-if="tv.name === tv.original_name"
                  class="text-4xl font-bold mb-2">
                  {{ tv.name }}
                </h1>
                <h1
                  v-else-if="tv.original_name"
                  class="text-4xl font-bold mb-2">
                  {{ tv.name }} ( {{ tv.original_name }} )
                </h1>
                <h1 v-else class="text-4xl font-bold mb-2">
                  {{ tv.name }}
                </h1>
                <h4 v-if="tv.tagline" class="text-xl italic mb-4">
                  {{ tv.tagline }}
                </h4>
                <hr class="border-slate-900 border-opacity-50 mb-4" />
                <p>{{ tv.overview }}</p>
              </div>
            </div>

            <div
              class="bg-slate-800 rounded-lg p-5 scrollbar mt-6 overflow-x-scroll"
              v-if="cast.length > 0">
              <h3 class="mb-4 text-2xl font-bold">Cast</h3>
              <TvCast :cast="cast"></TvCast>
            </div>
            <div
              class="bg-slate-800 rounded-lg p-5 scrollbar mt-6 overflow-x-scroll"
              v-if="crew.length > 0">
              <h3 class="mb-4 text-2xl font-bold">Crew</h3>
              <TvCast :cast="crew"></TvCast>
            </div>
            <div v-if="tv.seasons" class="seasons mt-3">
              <h3 class="text-2xl mb-2 font-bold">Seasons</h3>
              <div class="gap-3 grid grid-cols-2">
                <nuxt-link
                  class="bg-slate-800 p-4 rounded-md flex gap-3 flex-shrink-0 max-w-full"
                  v-for="season in tv.seasons"
                  :key="season.id"
                  :to="'/tv/' + tv.id + '/season/' + season.season_number">
                  <div class="w-1/3">
                    <img
                      v-if="season.poster_path"
                      :src="
                        'https://image.tmdb.org/t/p/w500/' + season.poster_path
                      "
                      :alt="season.name"
                      class="rounded-md w-full" />
                    <img
                      class="bg-slate-900 rounded-md"
                      v-else
                      src="@/assets/img/noPoster.png"
                      alt="No Poster" />
                  </div>
                  <div class="w-2/3">
                    <h3 class="text-xl mb-2 font-bold">{{ season.name }}</h3>
                    <p class="text-sm mb-2">
                      {{ season.overview.replace(/(.{80})..+/, "$1&hellip;") }}
                    </p>
                    <p class="text-sm">Episodes: {{ season.episode_count }}</p>
                  </div>
                </nuxt-link>
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
export default {
  data() {
    return {
      tv: null,
      loading: true,
      showMore: false,
      backdropImgPath: {
        backgroundImage: "",
      },
      cast: [],
      crew: [],
      season: [],
    };
  },
  async created() {
    const api = await $fetch("/api/tmdb");
    this.loading = true;
    const url =
      "https://api.themoviedb.org/3/tv/" +
      this.$route.params.tvid +
      "?api_key=" +
      api.tmdbAPI;
    const result = await $fetch(url);
    this.tv = result;
    this.backdropImgPath.backgroundImage =
      "url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/" +
      result.backdrop_path +
      ")";

    this.getMovieCredits(this.$route.params.tvid);
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
      this.crew = credits.crew;
    },
    async getTVSeasons(ID, seasonNum) {
      const api = await $fetch("/api/tmdb");
      const url =
        "https://api.themoviedb.org/3/tv/" + ID + "/season/" + seasonNum;
      const season = await $fetch(url);
      this.season = season;
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
.creator:last-child .sep {
  display: none;
}
</style>
