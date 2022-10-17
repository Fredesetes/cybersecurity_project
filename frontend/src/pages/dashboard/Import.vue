<template>
  <q-page padding>
    <div class="row justify-between">
      <h5 class="column q-my-xs text-bold text-dark">Import Networks</h5>
    </div>
    <div class="row column q-py-sm">
      <q-card>
        <q-card-section>
          <q-uploader
            :url="uploadUrl"
            :headers="[{ name: 'Authorization', value: `Bearer ${this.token}` }]"
            @uploaded="onUploaded"
            label="Upload file"
            accept=".csv"
            field-name="networks_file"
            flat bordered
            style="width: 100%" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Import",
  data() {
    return {
      uploadUrl: `${this.$server}/networks/import`,
    }
  },
  computed: {
    token() {
      return this.$store.getters.token ?? '';
    }
  },
  methods: {
    async onUploaded({ xhr }) {
      await this.$store.dispatch('loadNetworks');
      this.$notify.create({
        message: `Networks Imported with Success!`,
        color: 'blue',
        icon: 'done'
      });
    }
  }
}
</script>