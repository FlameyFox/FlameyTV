<template>
  <div v-if="movie.media_type" class="...">
    <div v-if="movie.media_type === 'movie'" class="movie overflow-hidden">
      <nuxt-link :to="'/m/' + movie.id" class="block relative">
        <img
          v-if="movie.poster_path"
          :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
          :alt="movie.title"
        />
        <img
          class="bg-white"
          v-else
          src="@/assets/img/noPoster.png"
          alt="No Poster"
        />
        <div
          class="details w-full flex h-full items-end justify-between p-2 absolute bottom-0"
        >
          <aside>
            <h3>{{ movie.title }}</h3>
            {{ movie.release_date }}
          </aside>
          <aside class="rounded-md p-1 text-center movie-score">
            {{ movie.vote_average ? movie.vote_average.toFixed(1) : '0' }}
          </aside>
        </div>
      </nuxt-link>
    </div>
    <div v-if="movie.media_type === 'tv'" class="movie overflow-hidden">
      <nuxt-link :to="'/tv/' + movie.id" class="block relative">
        <img
          v-if="movie.poster_path"
          :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
          :alt="movie.title"
        />
        <img
          class="bg-white"
          v-else
          src="@/assets/img/noPoster.png"
          alt="No Poster"
        />
        <div
          class="details w-full flex h-full items-end justify-between p-2 absolute bottom-0"
        >
          <aside>
            <h3>{{ movie.name }}</h3>
            {{ movie.first_air_date }}
          </aside>
          <aside class="rounded-md p-1 text-center movie-score">
            {{ movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A' }}
          </aside>
        </div>
      </nuxt-link>
    </div>
  </div>
  <div v-else class="...">
    <div class="movie overflow-hidden">
      <nuxt-link :to="'/m/' + movie.id" class="block relative">
        <img
          v-if="movie.poster_path"
          :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
          :alt="movie.title"
        />
        <img
          class="bg-white"
          v-else
          src="@/assets/img/noPoster.png"
          alt="No Poster"
        />
        <div
          class="details w-full flex h-full items-end justify-between p-2 absolute bottom-0"
        >
          <aside>
            <h3>{{ movie.title }}</h3>
            {{ movie.release_date }}
          </aside>
          <aside class="rounded-md p-1 text-center movie-score">
            {{ movie.vote_average ? movie.vote_average.toFixed(1) : '0' }}
          </aside>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movie'],
}
</script>

<style scoped>
.details {
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.95) 10%,
    rgba(255, 255, 255, 0.01) 100%
  );
  transition: all 0.3s ease-in-out;
  opacity: 0;
}
.movie:hover .details {
  opacity: 1;
}
</style>
