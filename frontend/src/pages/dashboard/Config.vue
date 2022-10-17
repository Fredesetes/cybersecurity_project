<template>
  <q-page padding>
    <div class="row">
      <h5 class="column q-my-xs text-bold text-dark">Configurations</h5>
    </div>
    <div class="row q-py-sm q-col-gutter-lg">
      <div class="col-9">
        <q-card>
          <q-scroll-area style="height: 78.5vh;">
            <q-card-section>
              <div class="q-gutter-lg">
                <div>
                  <div class="row">
                    <p class="q-mb-xs q-ml-sm text-bold">Scan Time</p>
                    <q-icon class="q-ml-xs" name="info" size="xs">
                      <q-tooltip>
                        Time spent scanning networks in seconds
                      </q-tooltip>
                    </q-icon>
                  </div>
                  <q-slider v-model="config.timeout" :min="1" :max="120" label color="primary"/>
                </div>
                <div>
                  <div class="row">
                    <p class="q-mb-xs q-ml-sm text-bold">Network Blacklist</p>
                    <q-icon class="q-ml-xs" name="info" size="xs">
                      <q-tooltip>
                         Network names to ignore when attacking
                      </q-tooltip>
                    </q-icon>
                  </div>
                  <q-select v-model="config.blackList" outlined dense multiple use-chips use-input hide-dropdown-icon new-value-mode="add-unique" color="primary"/>
                </div>
                <div class="row q-col-gutter-x-md q-ml-sm">
                  <div class="col-6">
                    <div class="row">
                      <p class="q-mb-xs q-ml-sm text-bold">WEP Timeout</p>
                      <q-icon class="q-ml-xs" name="info" size="xs">
                        <q-tooltip>
                          Time spent attacking WEP networks
                        </q-tooltip>
                      </q-icon>
                    </div>
                    <q-slider v-model="config.timeoutWEP" :min="1" :max="180" :step="0.1" label color="primary"/>
                  </div>
                  <div class="col-6">
                    <div class="row">
                      <p class="q-mb-xs q-ml-sm text-bold">WPA Timeout</p>
                      <q-icon class="q-ml-xs" name="info" size="xs">
                        <q-tooltip>
                          Time spent attacking WPA networks
                        </q-tooltip>
                      </q-icon>
                    </div>
                    <q-slider v-model="config.timeoutWPA" :min="1" :max="120" :step="0.1" label color="primary"/>
                  </div>
                </div>
                <div>
                  <div class="row">
                    <p class="q-mb-xs q-ml-sm text-bold">Power</p>
                    <q-icon class="q-ml-xs" name="info" size="xs">
                      <q-tooltip>
                        Maximum network power to attack
                      </q-tooltip>
                    </q-icon>
                  </div>
                  <q-slider v-model="config.power" :min="-90" :max="-30" label color="primary"/>
                </div>
                <div class="row q-col-gutter-x-md q-ml-sm">
                  <div class="col-6">
                    <div class="row">
                      <p class="q-mb-xs q-ml-sm text-bold">Deauth Delay</p>
                      <q-icon class="q-ml-xs" name="info" size="xs">
                        <q-tooltip>
                          Time spent waiting for client to reconnect
                        </q-tooltip>
                      </q-icon>
                    </div>
                    <q-slider v-model="config.deauthDelay" :min="1" :max="30" label color="primary"/>
                  </div>
                  <div class="col-6">
                    <div class="row">
                      <p class="q-mb-xs q-ml-sm text-bold">Client Timeout</p>
                      <q-icon class="q-ml-xs" name="info" size="xs">
                        <q-tooltip>
                          Time spent scanning a network for clients
                        </q-tooltip>
                      </q-icon>
                    </div>
                    <q-slider v-model="config.timeoutClient" :min="1" :max="60" label color="primary"/>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-scroll-area>
        </q-card>
      </div>
      <div class="col-3">
        <q-card>
          <q-card-section>
            <div class="column q-gutter-md">
              <q-btn color="primary" label="Import" @click="importConfig()" />
              <input id="fileImport" type="file" hidden  accept="application/json" @change="onFileChange"/>
              <q-btn color="primary" label="Export" @click="exportConfig()" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Config',
  data() {
    return {
      config: { }
    }
  },
  mounted() {
    this.config = {...this.$store.getters.config};
  },
  methods: {
    importConfig() {
      document.getElementById("fileImport").click();
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.readFile(files[0]);
    },
    readFile(file) {
      let reader = new FileReader();
      reader.onload = e => {
        const configJson = JSON.parse(e.target.result);
        // v   Add to Model Here   v
        this.config.timeout = Number(configJson.timeout) ?? this.config.timeout;
        this.config.blackList = configJson.blackList ? [...configJson.blackList] : this.config.blackList;
        this.config.timeoutWEP = Number(configJson.timeoutWEP) ?? this.config.timeoutWEP;
        this.config.timeoutWPA = Number(configJson.timeoutWPA) ?? this.config.timeoutWPA;
        this.config.deauthDelay = Number(configJson.deauthDelay) ?? this.config.deauthDelay;
        this.config.timeoutClient = Number(configJson.timeoutClient) ?? this.config.timeoutClient;
        this.config.power = Number(configJson.power) ?? this.config.power;

        this.$store.dispatch('setConfig', this.config);
      };
      reader.readAsText(file);
    },
    exportConfig() {
      const data = JSON.stringify(this.config, null, 4);

      const url = window.URL.createObjectURL(new Blob([data], { type: 'text/json' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'config.json');
      document.body.appendChild(link);
    
      link.click();
    }
  }
}
</script>

<style scoped> </style>