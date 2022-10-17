<template>
  <q-page padding>
    <div class="row justify-between">
      <h5 class="column q-my-xs text-bold text-dark">Edit Network</h5>
    </div>
    <div class="q-py-sm">
      <q-card>
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-sm">
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <div class="column">
                  <div>
                    <p class="q-mb-xs q-ml-sm text-bold">BSSID</p>
                    <q-input outlined dense v-model="bssid" disable placeholder="Enter BSSID" lazy-rules :rules="rules" />
                  </div>
                  <div>
                    <p class="q-mb-xs q-ml-sm text-bold">ESSID</p>
                    <q-input outlined dense v-model="network.essid" placeholder="Enter ESSID" lazy-rules :rules="rules" />
                  </div>
                </div>
              </div>

              <div class="col-6">
                <p class="q-mb-xs q-ml-sm text-bold">Description</p>
                <q-input outlined dense v-model="network.description" placeholder="Enter Description" type="textarea" />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-3">
                <p class="q-mb-xs q-ml-sm text-bold">Privacy</p>
                <q-select outlined dense v-model="network.privacy" :options="privacyOptions" label="Enter Privacy" lazy-rules :rules="rules" />
              </div>

              <div class="col-3">
                <p class="q-mb-xs q-ml-sm text-bold">Cipher</p>
                <q-select outlined dense v-model="network.cipher" :options="cipherOptions" label="Enter Cipher" lazy-rules :rules="rules" />
              </div>
              
              <div class="col-3">
                <p class="q-mb-xs q-ml-sm text-bold">Authentication</p>
                <q-select outlined dense v-model="network.auth" :options="authOptions" label="Enter Authentication" lazy-rules :rules="rules" />
              </div>
              
              <div class="col-3">
                <p class="q-mb-xs q-ml-sm text-bold">Cracked</p>
                <q-select outlined dense v-model="network.cracked" :options="crackedOptions" label="Enter Cracked" lazy-rules :rules="rules" />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-6">
                <p class="q-mb-xs q-ml-sm text-bold">Latitude</p>
                <q-input outlined type="number" min="-90" max="90" dense v-model="network.latitude" placeholder="Enter Latitude"/>
              </div>
              <div class="col-6">
                <p class="q-mb-xs q-ml-sm text-bold">Longitude</p>
                <q-input outlined type="number" min="-180" max="180" dense v-model="network.longitude" placeholder="Enter Longitude"/>
              </div>
            </div>

            <div>
              <q-btn label="Edit" type="submit" color="primary" />
              <q-btn class="q-ml-md" label="Reset" type="reset" color="primary" flat @click="resetForm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script>
import { privacy, cipher, auth, cracked } from '../../assets/networkConstants';

export default {
  name: "Edit",
  data() {
    return {
      bssid: "",
      network: { },
      rules: [
        val => val && val.length > 0 || 'Please type something'
      ],
      privacyOptions: privacy,
      cipherOptions: cipher,
      authOptions: auth,
      crackedOptions: cracked
    }
  },
  mounted() {
    this.bssid = this.$route.params.bssid;
    Object.assign(this.network, this.$route.params);
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('updateNetwork', this.network);

        this.$notify.create({
          message: `Network Edited with Success!`,
          color: 'blue',
          icon: 'done'
        });

        this.$router.push({ name: 'dashboard.list' });
      } catch (error) {
        console.error(error);
      }
    },
    resetForm() {
      Object.assign(this.network, this.$route.params);
    }
  }
}
</script>