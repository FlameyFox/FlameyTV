<!-- 

TODO: 

- Make all images more uniform
- optimization?

-->



<template>
  <div v-if="movie.media_type" class="...">
    <div v-if="movie.media_type === 'movie'" class="movie overflow-hidden">
      <nuxt-link :to="'/m/' + movie.id" class="flex h-full relative">
        <img
          v-if="movie.poster_path"
          :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
          :alt="movie.title"
          class="h-full w-full object-cover"
        />
        <img
          class="h-full w-full object-cover bg-white"
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
      <nuxt-link :to="'/tv/' + movie.id" class="flex h-full relative">
        <img
          v-if="movie.poster_path"
          :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
          :alt="movie.title"
          class="h-full w-full object-cover"
        />
        <img
          class="bg-white h-full w-full object-cover"
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
    <div v-if="movie.media_type === 'person'" class="movie overflow-hidden">
      <nuxt-link :to="'/actor/' + movie.id" class="block relative">
        <img
          v-if="movie.profile_path"
          :src="'https://image.tmdb.org/t/p/w500/' + movie.profile_path"
          :alt="movie.name"
        />
        <img
          class="bg-white"
          v-else
          src="@/assets/img/noActor.png"
          alt="No Poster"
        />
        <div
          class="details w-full flex h-full items-end justify-between p-2 absolute bottom-0"
        >
          <aside>
            <h3>{{ movie.name }}</h3>
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

// TODO: improve logic for media types

export default {
  props: ['movie','mtype'],
  async created() {
    this.movie.media_type = this.mtype
  },
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
.movie{
  height: 100%;
}
.movie:hover .details {
  opacity: 1;
}
</style>
