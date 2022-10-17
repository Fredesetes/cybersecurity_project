<template>
  <q-layout view="lHh lpR lFf">
    <q-header reveal>
      <!-- header content -->
      <q-toolbar class="bg-white text-primary">
        <q-btn dense flat round icon="menu" @click="toggleDrawer" />
        <q-toolbar-title />
        <q-btn-dropdown v-if="loggedUser" flat icon="account_circle" :label="loggedUser">
          <q-list>
            <q-item clickable v-close-popup @click="logoutAccount">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above class="bg-primary" :width="250" v-model="drawerOpen" side="left">
      <!-- drawer content -->
      <q-scroll-area class="fit">
        <q-item dense class="text-white q-mb-md q-mt-xs">
          <q-item-section avatar>
            <q-avatar rounded>
              <q-img src="../assets/logo.png" fit="scale-down"/>
            </q-avatar>
          </q-item-section>
          <q-item-section class="text-h5">
            <span><span class="text-weight-bolder text-secondary">FURY</span> Road</span>
          </q-item-section>
        </q-item>
        <SidebarItem :link="{name: 'dashboard.dashboard'}" :icon="'home'" :label="'Dashboard'" />
        <q-list class="q-mt-md" padding>
          <q-item-label header class="muted-text text-uppercase text-bold q-pb-sm">Networks</q-item-label>
          <SidebarItem :link="{ name: 'dashboard.list' }" :icon="'list'" :label="'List'" />
          <SidebarItem :link="{ name: 'dashboard.create' }" :icon="'add_box'" :label="'Add'" />
          <SidebarItem :link="{ name: 'dashboard.import' }" :icon="'upload'" :label="'Import'" />
        </q-list>
        <q-list class="q-mt-md" padding>
          <q-item-label header class="muted-text text-uppercase text-bold q-pb-sm">Configurations</q-item-label>
          <SidebarItem :link="{ name: 'dashboard.config' }" :icon="'settings'" :label="'Settings'" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="bg-background">
      <!-- page content -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>


<script>
import SidebarItem from '../components/SidebarItem.vue';

export default {
  name: "Dashboard",
  components: {
    SidebarItem
  },
  data() {
    return {
      drawerOpen: false
    }
  },
  computed: {
    loggedUser() {
      return this.$store.getters.user;
    }
  },
  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
    async logoutAccount() {
      try {
        // Don't Forget to Clean your Shit!
        this.cleanStore();
        this.$notify.create({
          message: `User Logged out.`,
          color: 'blue'
        });
        this.$router.push({ name: 'login.login' })
      } catch(err) {
        this.$notify.create({
          message: `There was a Problem Logging out of the Application!`,
          color: 'red'
        });
      }
    },
    async cleanStore() {
      await this.$store.dispatch('logout');
      await this.$store.commit('resetNetworks', null);
    }
  },
  async mounted() {
    await this.$store.dispatch('loadNetworks');
  }
}
</script>

<style lang="scss" scoped>
  .muted-text {
    color: #9EAFC1;
  }

  .bg-background {
    background: $background;
  }
</style>