<template>
  <div class="...">
    <div>
      <h3>{{ movie.original_title }}</h3>
      <nuxt-link :to="'/m/' + movie.id">
        <img
          v-if="movie.poster_path"
          :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
          :alt="movie.original_title"
        />
        <img
          class="bg-white"
          v-else
          src="@/assets/img/noPoster.svg"
          alt="No Poster"
        />
      </nuxt-link>
      <!-- TODO: Add fallback image -->
      <div class="details flex justify-between mt-1">
        <aside>
          {{ movie.release_date }}
        </aside>
        <aside class="bg-slate-900 rounded-md p-1">
          {{ movie.vote_average }}
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movie'],
}
</script>
