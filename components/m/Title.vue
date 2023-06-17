<template>
  <div class="flex gap-6">
    <div class="bg-slate-800 rounded-lg p-5 w-full">
      <h1 v-if="movie.name" class="text-4xl font-bold mb-2">{{ movie.name }}</h1>
      <h1 v-else class="text-4xl font-bold mb-2">{{ movie.title }}</h1>
      <h4 class="text-xl italic mb-4">{{ movie.tagline }}</h4>
      <hr class="border-slate-900 border-opacity-50 mb-4" />
      <p>{{ movie.overview }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movie'],
}
</script>
