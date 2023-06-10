<template>
  <div class="mt-6">
    <nuxt-link
      :to="'/collection/' + movie.belongs_to_collection.id"
      :style="backdropImgPath"
      class="rounded-lg p-5 flex h-full relative bg-cover bg-no-repeat bg-center overflow-hidden"
    >
      <div class="absolute w-full h-full backdrop-blur-sm hover:backdrop-blur-0 transition-all duration-500 backdrop-brightness-50 top-0 left-0"></div>
      <h2 class="text-xl pointer-events-none font-semibold z-10">
        Part of the {{ movie.belongs_to_collection.name }}
      </h2>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['movie'],
  data() {
    return {
      backdropImgPath: {
        backgroundImage: '',
      },
    }
  },
  async mounted() {
    this.backdropImgPath.backgroundImage =
      'url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' +
      this.movie.belongs_to_collection.backdrop_path +
      ')'
  },
}
</script>
