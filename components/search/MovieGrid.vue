<template>
  <div :class="gridClasses">
    <MMovie
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      :mtype="movie.media_type"
      :loading="loading"
    />
  </div>
</template>

<script>
export default {
  props: {
    movies: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    gridClasses() {
      return [
        'grid',
        'gap-6',
        {
          'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6':
            !this.loading,
        },
      ]
    },
  },
}
</script>
