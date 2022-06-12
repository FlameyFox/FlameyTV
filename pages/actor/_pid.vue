<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="actor">
        <img
          :src="'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + person.profile_path"
          class="w-40"
        />
        <h2>{{ person.name }}</h2>
        {{ person }}

        <!-- TODO: SHOW 6-12 MOVIES THAT ACTOR IS IN -->
      </div>
    </div>
  </div>
</template>

<script>
const api = process.env.TMDB_API
export default {
  data() {
    return {
      person: null,
      loading: false,
      showMore: false,
      backdropImgPath: {
        backgroundImage: '',
      },
      cast: [],
    }
  },
  async created() {
    this.loading = true
    const url =
      'https://api.themoviedb.org/3/person/' +
      this.$route.params.pid +
      '?api_key=' +
      api
    const person = await this.$axios.$get(url)
    this.person = person
    this.loading = false
  },
}
</script>

<style scoped>
.details {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
