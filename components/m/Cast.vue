<template>
  <div>
    <div class="flex gap-3 min-w-fit">
      <div v-for="member in cast.slice(0, 12)" :key="member.id" class="w-36">
        <nuxt-link
          :to="'/actor/' + member.id"
          class="flex flex-col gap-4 hover:bg-slate-700 bg-opacity-10 p-2 rounded-lg transition-all"
        >
          <img
            :src="
              'https://image.tmdb.org/t/p/w300_and_h300_bestv2/' +
              member.profile_path
            "
            :alt="member.original_name"
            class="w-32 h-32 rounded-md"
            v-if="member.profile_path"
          />
          <img
            class="bg-slate-900 w-32 h-32 object-cover rounded-md"
            v-else
            src="@/assets/img/noActor.png"
            alt="No Profile Image"
          />
          <div>
            {{ member.original_name }}
            <span v-if="member.character"
              ><br />
              as {{ member.character }}</span
            >
          </div>
        </nuxt-link>
      </div>
      <button
        class="bg-slate-900 w-36 rounded-lg px-2 py-6 mr-4 my-auto transition-all hover:bg-opacity-75"
        v-if="!seeAllActors && cast.length > 12"
        @click="seeAllActors = true"
      >
        See all actors
      </button>
      <div v-if="seeAllActors" class="flex gap-3 min-w-fit">
        <div
          v-for="member in cast.slice(12, 999)"
          :key="member.id"
          class="w-36"
        >
          <nuxt-link
            :to="'/actor/' + member.id"
            class="flex flex-col gap-4 hover:bg-slate-700 bg-opacity-10 p-2 rounded-lg transition-all"
          >
            <img
              :src="
                'https://image.tmdb.org/t/p/w300_and_h300_bestv2/' +
                member.profile_path
              "
              :alt="member.original_name"
              class="w-32 h-32 rounded-md"
              v-if="member.profile_path"
            />
            <img
              class="bg-slate-900 w-32 h-32 object-cover rounded-md"
              v-else
              src="@/assets/img/noActor.png"
              alt="No Profile Image"
            />
            <div>
              {{ member.original_name }}
              <span v-if="member.character"
                ><br />
                as {{ member.character }}</span
              >
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['cast'],
  data() {
    return {
      seeAllActors: false,
    }
  },
}
</script>
