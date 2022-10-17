<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin modal-width">
      <q-card-section class="row justify-between">
        <div class="text-h6 text-primary">Network Details</div>
      </q-card-section>
      <q-card-section class="row q-col-gutter-lg">
        <div class="col-6">
          <strong>ESSID: </strong>{{ network.essid }}
        </div>
        <div class="col-6">
          <strong>BSSID: </strong>{{ network.bssid }}
        </div>
      </q-card-section>
      <q-card-section class="column">
        <div class="row" v-if="network.privacy">
          <strong class="col-2">Security</strong>
          <div>
            <q-badge class="q-mr-xs" align="middle" v-for="p in network.privacy.split(' ')" :key="p">{{ p }}</q-badge>
          </div>
        </div>
        <div class="row" v-if="network.cipher">
          <strong class="col-2">Cipher</strong>
          <div>
            <q-badge class="q-mr-xs" align="middle" v-for="c in network.cipher.split(' ')" :key="c">{{ c }}</q-badge>
          </div>
        </div>
        <div class="row" v-if="network.auth">
          <strong class="col-2">Auth</strong>
          <div>
            <q-badge align="middle">{{ network.auth }}</q-badge>
          </div>
        </div>
        <div class="row" v-if="network.cracked">
          <strong class="col-2">Cracked</strong>
          <div>
            <q-badge align="middle">{{ network.cracked.toUpperCase() }}</q-badge>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="row q-col-gutter-lg">
        <div class="col-6">
          <strong>Latitude: </strong>{{ network.latitude }}
        </div>
        <div class="col-6">
          <strong>Longitude: </strong>{{ network.longitude }}
        </div>
      </q-card-section>
      <q-card-section v-if="network.description">
        <strong>Description:</strong>
        <div class="text-justify">
          {{ network.description }}
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'NetworkDetailsModal',
  props: {
    network: Object
  },
  emits: [ 'ok', 'hide' ],
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      this.$emit('hide');
    },
    onOKClick() {
      this.$emit('ok');
    },
    onCancelClick() {
      this.hide();
    }
  }
}
</script>

<style scoped>
  .modal-width {
    min-width: 550px;
  }
</style>