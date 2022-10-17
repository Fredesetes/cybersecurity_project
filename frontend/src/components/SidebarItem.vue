<template>
  <q-item class="q-py-sm inactive-link" clickable v-ripple dense :to="link" active-class="active-link" exact>
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>{{ label }}</q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    link: null,
    icon: String,
    label: String
  }
}
</script>

<style scoped>
  .inactive-link {
    color: #9EAFC1;
  }
  .active-link {
    color: white;
    background: #0F2D69;
  }
</style>