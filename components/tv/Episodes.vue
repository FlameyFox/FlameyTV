<template>
  <div v-if="season.episodes" class="seasons mt-3">
    <h3 class="text-2xl mb-2 font-bold">Episodes</h3>
    <div class="gap-3 grid grid-cols-2">
      <nuxt-link
        class="bg-slate-800 p-4 rounded-md flex flex-col gap-3 flex-shrink-0 max-w-full"
        v-for="episode in season.episodes"
        :key="episode.id"
        :to="
          '/tv/' +
          tv +
          '/season/' +
          season.season_number +
          '/episode/' +
          episode.episode_number
        "
      >
        <div class="w-full">
          <img
            v-if="episode.still_path"
            :src="'https://image.tmdb.org/t/p/w500/' + episode.still_path"
            :alt="episode.name"
            class="rounded-md w-full"
          />
          <img
            class="bg-slate-900 rounded-md"
            v-else
            src="@/assets/img/noPoster.png"
            alt="No Poster"
          />
        </div>
        <div>
          <h3 class="text-xl mb-2 font-bold">
            {{ episode.episode_number }}. {{ episode.name }}
          </h3>
          <p class="text-sm mb-2">
            {{ episode.overview.replace(/(.{80})..+/, '$1&hellip;') }}
          </p>
          <p class="text-sm">Air date: {{ episode.air_date }}</p>
          <p class="text-sm">
            Rating:
            {{ episode.vote_average ? episode.vote_average.toFixed(1) : '---' }}
          </p>
          <p class="text-sm">Runtime: {{ episode.runtime }} min</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['season', 'tv'],
  setup() {},
}
</script>
