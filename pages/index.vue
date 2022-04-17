<template>
  <div>
    <Tutorial />
    {{ movies }}
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $axios }) {
    const movies = await $axios.$get('https://api.themoviedb.org/3/movie/550?api_key=26166d6d6e294abfd423ab032242cfbd')
    return { movies }
  }
}
</script>
