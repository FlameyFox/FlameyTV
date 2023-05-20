<template>
  <div>
    <UITheHeader />
    <section class="bg-slate-800 min-h-screen text-slate-200">
      <Nuxt keep-alive />
    </section>
    <UITheFooter />
  </div>
</template>

<script>
export default {
  transition: 'home',
}
</script>
