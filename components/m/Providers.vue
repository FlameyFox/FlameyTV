<template>
  <div>
    <select v-model="selectedCountry">
      <option disabled value>Please select country</option>
      <option value="GB">Great Britain</option>
      <option value="DK">Danmark</option>
    </select>
    <div v-for="provider in providers.results" :key="provider.provider_id">
      <div v-if="provider.link.includes('=' + selectedCountry)">
        <div class="grid grid-cols-2 gap-5 mt-5" v-if="provider.buy.length > 1">
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
  </div>
</template>

<script>
export default {
  props: ['providers'],
  data() {
    return {
      selectedCountry: false,
    }
  },
}
</script>
