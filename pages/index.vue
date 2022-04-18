<template>
  <section class="bg-slate-800 min-h-screen text-slate-200">

    {{ movies }}
  </section>
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
