<template>
  <div>
    <Tutorial />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $supabase }) {
    return {
      //events: await $supabase.from('movies').select('*'),
    }
  },
}
</script>
