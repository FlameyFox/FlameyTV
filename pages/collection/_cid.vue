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
      <div class="movie pb-5">
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
              :object="movie"
              mtype="collection"
            ></Poster>
          </div>
          <div class="w-full xl:w-2/3 overflow-hidden">
            <MTitle :movie="movie"></MTitle>
            <div v-if="movie.parts" class="seasons mt-3">
              <h3 class="text-2xl mb-2 font-bold">Movies in collection</h3>
              <div class="gap-3 grid grid-cols-2">
                <nuxt-link
                  class="bg-slate-800 p-4 rounded-md flex gap-3 flex-shrink-0 max-w-full"
                  v-for="part in movie.parts"
                  :key="part.id"
                  :to="'/m/' + part.id"
                >
                  <div class="w-1/3">
                    <img
                      v-if="part.poster_path"
                      :src="
                        'https://image.tmdb.org/t/p/w500/' + part.poster_path
                      "
                      :alt="part.title"
                      class="rounded-md w-full"
                    />
                    <img
                      class="bg-slate-900 rounded-md"
                      v-else
                      src="@/assets/img/noPoster.png"
                      alt="No Poster"
                    />
                  </div>
                  <div class="w-2/3">
                    <h3 class="text-xl mb-2 font-bold">{{ part.title }}</h3>
                    <p class="text-sm mb-2">
                      {{ part.overview.replace(/(.{100})..+/, '$1&hellip;') }}
                    </p>
                  </div>
                </nuxt-link>
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
      movie: null,
      loading: false,
      showMore: false,
      backdropImgPath: {
        backgroundImage: '',
      },
      cast: [],
      providers: [],
    }
  },
  async created() {
    const api = this.$config.tmdbAPI
    this.loading = true
    const url =
      'https://api.themoviedb.org/3/collection/' +
      this.$route.params.cid +
      '?api_key=' +
      api
    const movie = await this.$axios.$get(url)
    this.movie = movie
    this.backdropImgPath.backgroundImage =
      'url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' +
      movie.backdrop_path +
      ')'
    this.loading = false
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
