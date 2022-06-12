<template>
  <div>
    <header class="bg-slate-900 text-slate-200 flex p-6">
      <nuxt-link class="w-1/3" to="/"
        ><div class="font-black text-lg tracking-wider">FLAMEY TV</div></nuxt-link
      >
      <nav class="flex w-1/3 justify-center">
        <li class="list-none px-2">
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li class="list-none px-2">
          <nuxt-link to="#">Newest</nuxt-link>
        </li>
        <li class="list-none px-2">
          <nuxt-link to="/100">Top 100</nuxt-link>
        </li>
        <li class="list-none px-2">
          <nuxt-link to="/search">Search</nuxt-link>
        </li>
      </nav>
    </header>
  </div>
</template>
