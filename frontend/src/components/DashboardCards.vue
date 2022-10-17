<template>
  <q-card>
    <q-card-section>
      <p class="text-caption q-mb-xs card-text-header">{{ title }}</p>
      <q-skeleton v-if="!netValue" type="rect" />
      <span v-else class="text-h6">{{ netValue }}</span>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    title: String,
    netValue: String
  }
}
</script>

<style scoped>
  .card-text-header {
    color: #9EAFC1;
  }
</style>