<template>
  <div>
<<<<<<< HEAD
    <div v-if="this.mtype === 'tv'">
=======
    <div class="relative" v-if="this.mtype === 'tv'">
>>>>>>> cd927d0 (nuxt3)
      <img
        v-if="object.poster_path"
        :src="'https://image.tmdb.org/t/p/w500/' + object.poster_path"
        :alt="object.name"
<<<<<<< HEAD
        class="rounded-md"
      />
=======
        class="rounded-md" />
>>>>>>> cd927d0 (nuxt3)
      <img
        class="bg-slate-900 rounded-md"
        v-else
        src="@/assets/img/noPoster.png"
<<<<<<< HEAD
        alt="No Poster"
      />
=======
        alt="No Poster" />
>>>>>>> cd927d0 (nuxt3)
    </div>
    <div class="relative" v-else-if="this.mtype === 'movie'">
      <img
        v-if="object.poster_path"
        :src="'https://image.tmdb.org/t/p/w500/' + object.poster_path"
        :alt="object.name"
<<<<<<< HEAD
        class="rounded-md"
      />
=======
        class="rounded-md" />
>>>>>>> cd927d0 (nuxt3)
      <img
        class="bg-slate-900 rounded-md"
        v-else
        src="@/assets/img/noPoster.png"
<<<<<<< HEAD
        alt="No Poster"
      />
      <div
        class="absolute top-3 left-3 bg-slate-700 py-1 px-2 rounded-md text-sm"
        v-if="this.videos && this.fetching === false"
      >
=======
        alt="No Poster" />
      <div
        class="absolute top-3 left-3 bg-slate-700 py-1 px-2 rounded-md text-sm"
        v-if="this.videos && this.fetching === false">
>>>>>>> cd927d0 (nuxt3)
        <a
          target="_blank"
          :href="'https://youtube.com/watch?v=' + this.videos.results[0].key"
          v-if="this.videos.results.length > 0"
          >Watch Trailer</a
        >
      </div>
      <div
        class="absolute top-3 left-3 bg-slate-700 py-1 px-2 rounded-md text-sm"
<<<<<<< HEAD
        v-if="this.object.adult"
      >
=======
        v-if="this.object.adult">
>>>>>>> cd927d0 (nuxt3)
        <span class="text-xl">18+</span>
      </div>
    </div>
    <div v-else-if="this.mtype === 'person'">
      <img
        v-if="object.profile_path"
        :src="'https://image.tmdb.org/t/p/w500/' + object.profile_path"
        :alt="object.name"
<<<<<<< HEAD
        class="rounded-md"
      />
=======
        class="rounded-md" />
>>>>>>> cd927d0 (nuxt3)
      <img
        class="bg-slate-900 rounded-md"
        v-else
        src="@/assets/img/noPoster.png"
<<<<<<< HEAD
        alt="No Poster"
      />
=======
        alt="No Poster" />
>>>>>>> cd927d0 (nuxt3)
    </div>
    <div v-else-if="this.mtype === 'collection'">
      <img
        v-if="object.poster_path"
        :src="'https://image.tmdb.org/t/p/w500/' + object.poster_path"
        :alt="object.name"
<<<<<<< HEAD
        class="rounded-md"
      />
=======
        class="rounded-md" />
>>>>>>> cd927d0 (nuxt3)
      <img
        class="bg-slate-900 rounded-md"
        v-else
        src="@/assets/img/noPoster.png"
<<<<<<< HEAD
        alt="No Poster"
      />
=======
        alt="No Poster" />
    </div>
    <div v-else>
      <img
        v-if="object.poster_path"
        :src="'https://image.tmdb.org/t/p/w500/' + object.poster_path"
        :alt="object.name"
        class="rounded-md" />
      <img
        class="bg-slate-900 rounded-md"
        v-else
        src="@/assets/img/noPoster.png"
        alt="No Poster" />
>>>>>>> cd927d0 (nuxt3)
    </div>
  </div>
</template>

<script>
export default {
<<<<<<< HEAD
  props: ['object', 'mtype'],
=======
  props: ["object", "mtype"],
>>>>>>> cd927d0 (nuxt3)
  data() {
    return {
      videos: null,
      fetching: false,
<<<<<<< HEAD
    }
  },
  mounted() {
    if (this.mtype === 'movie') {
      this.getVideos()
=======
    };
  },
  mounted() {
    if (this.mtype === "movie") {
      this.getVideos();
>>>>>>> cd927d0 (nuxt3)
    }
  },
  methods: {
    async getVideos() {
<<<<<<< HEAD
      this.fetching = true

      const api = this.$config.tmdbAPI
      const url =
        'https://api.themoviedb.org/3/movie/' +
        this.$route.params.mid +
        '/videos' +
        '?api_key=' +
        api

      const data = await this.$axios.$get(url)
      this.videos = data
      this.fetching = false
    },
  },
}
=======
      this.fetching = true;

      const api = await $fetch("/api/tmdb");
      const url =
        "https://api.themoviedb.org/3/movie/" +
        this.$route.params.mid +
        "/videos" +
        "?api_key=" +
        api.tmdbAPI;

      const data = await $fetch(url);
      this.videos = data;
      this.fetching = false;
    },
  },
};
>>>>>>> cd927d0 (nuxt3)
</script>
