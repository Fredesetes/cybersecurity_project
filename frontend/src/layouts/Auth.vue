<template>
  <q-layout view="lHh lpR lFf">
    <q-page-container class="bg-background window-height">
      <!-- page content -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return { }
  }
}
</script>

<style lang="scss" scoped>
  .bg-background {
    background: $background;
  }
</style>