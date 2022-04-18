<template>
  <div class="...">
    {{ movie }}
    <h3>{{ movie.original_title }}</h3>
    <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="movie.original_title" />
    <p>{{ movie.overview }}</p>
  </div>
</template>

<script>
export default {
  props: ['movie'],
}
</script>
