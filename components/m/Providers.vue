<template>
  <div v-if="providers.results">
    <select
      class="bg-slate-900 max-w-full rounded-md p-2"
      v-model="selectedCountry"
      placeholder="Please select country"
      name="providers"
    >
      <option disabled value="null" selected>Please select country</option>
      <option
        v-for="provider in providers.results"
        :key="provider.provider_id"
        :value="provider.link.slice(-2)"
      >
        {{ provider.link.slice(-2) }}
      </option>
    </select>
    <!-- TODO: MAKE BETTER PROVIDER LIST
                - show places where you can watch, not only buy
                - optimize?
     -->
    <div v-for="provider in providers.results" :key="provider.provider_id">
      <div v-if="provider.link.includes('=' + selectedCountry)">
        <div class="grid grid-cols-4 gap-5 mt-5" v-if="provider.buy">
          <div v-for="buy in provider.buy" :key="buy.provider_id">
            <a target="_blank" rel="noopener nofollow" :href="provider.link">
              <img
                :src="'https://image.tmdb.org/t/p/original/' + buy.logo_path"
                :alt="buy.provider_name"
                class="rounded-lg hover:scale-105 transition-all"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <span class="text-sm opacity-25">Powered by JustWatch</span>
  </div>
</template>

<script>
export default {
  props: ['providers'],
  data() {
    return {
      selectedCountry: 'null',
    }
  },
}
</script>
