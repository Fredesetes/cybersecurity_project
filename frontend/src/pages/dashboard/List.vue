<template>
  <q-page padding>
    <div class="row justify-between">
      <h5 class="column q-my-xs text-bold text-dark">Networks</h5>
      <div class="column">
        <div class="row q-gutter-x-md">
          <q-input dense outlined bg-color="white" debounce="100" v-model="filter" placeholder="Search Network">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn-dropdown color="primary" label="Export" icon="download">
            <q-list>
              <q-item clickable v-close-popup @click="exportNetworks('json')">
                <q-item-section>
                  <q-item-label>JSON</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="exportNetworks('csv')">
                <q-item-section>
                  <q-item-label>CSV</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
    </div>
    <div class="q-py-sm">
      <q-table :rows="networks" :columns="columns"
        row-key="bssid"
        :pagination="{ rowsPerPage: '9' }"
        :rows-per-page-options="[ 9 ]"
        :filter="filter">
        <template v-slot:body-cell-icons="props">
          <q-td :props="props">
            <q-icon :name="getNetworkIcon(props.row.cracked)" :color="getNetworkIconColor(props.row.cracked)" size="1.75rem" />
          </q-td>
        </template>
        <template v-slot:body-cell-options="props">
          <q-td class="q-gutter-x-md text-dark" :props="props">
            <q-btn @click="displayDetails(props.row)" flat round size="sm" icon="visibility" />
            <q-btn :to="{ name : 'dashboard.edit', params: props.row }" flat round size="sm" icon="edit" />
            <q-btn @click="deleteConfirmation(props.row)" flat round size="sm" icon="delete" />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page> 
</template>

<script>
import { ref } from 'vue';
import NetworkDetailsModal from '../../components/NetworkDetailsModal.vue';

export default {
  name: "Dashboard",
  data() {
    return {
      columns: [
        {
          name: "icons",
          label: "",
          align: "center",
          headerStyle: 'width: 64px',
        },
        {
          name: "bssid",
          label: "BSSID",
          field: row => row.bssid,
          align: "left"
        },
        {
          name: "essid",
          label: "ESSID",
          field: row => row.essid,
          align: "left"
        },
        {
          name: "privacy",
          label: "Privacy",
          field: row => row.privacy,
          align: "left" 
        },
        {
          name: "cipher",
          label: "Cipher",
          field: row => row.cipher,
          align: "left" 
        },
        {
          name: "options",
          label: "Options",
          align: "right"
        }
      ],
      filter: ref('')
    }
  },
  computed: {
    networks() {
      return this.$store.getters.networks;
    }
  },
  methods: {
    getNetworkIcon(cracked) {
      const icons = {
        'yes': 'thumb_up',
        'no': 'thumb_down',
        'handshake': 'handshake'
      };

      return icons[cracked.toLowerCase()];
    },
    getNetworkIconColor(cracked) {
      const colors = {
        'yes': 'green',
        'no': 'red',
        'handshake': 'primary'
      };

      return colors[cracked.toLowerCase()];
    },
    displayDetails(network) {
      this.$dialog.create({
        component: NetworkDetailsModal,
        componentProps: {
          network: network
        }
      });
    },
    deleteConfirmation(network) {
      this.$dialog.create({
        title: "Delete Confirmation",
        message: `Are you sure you want to delete <strong>${network.essid}</strong>?`,
        html: true,
        cancel: true
      }).onOk(() => {
        this.deleteNetwork(network);
      });
    },
    async deleteNetwork(network) {
      try {
        await this.$store.dispatch('deleteNetwork', network);
      } catch (error) {
        console.error(error);
      }
    },
    async exportNetworks(type) {
      const { data } = await this.$axios({
        url: `networks/export?type=${type}`,
        method: 'GET',
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `networks.${type}`);
      document.body.appendChild(link);
    
      link.click();
    }
  },
}
</script>