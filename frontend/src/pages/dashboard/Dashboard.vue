<template>
  <q-page padding>
    <div class="row">
      <h5 class="q-my-xs text-bold text-dark">Overview</h5>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-2">
        <DashboardCards title="Total Networks" :netValue="totalNetworks"/>
      </div>
      <div class="col-2">
        <DashboardCards title="WPA Networks" :netValue="wpaNetworks"/>
      </div>
      <div class="col-2">
        <DashboardCards title="WEP Networks" :netValue="wepNetworks"/>
      </div>
      <div class="col-2">
        <DashboardCards title="Open Networks" :netValue="openNetworks"/>
      </div>
      <div class="col-4">
        <apexchart v-if="networks" type="pie" :options="options" :series="series"></apexchart>
      </div>
    </div>
  </q-page>
</template>

<script>
import DashboardCards from '../../components/DashboardCards.vue';

export default {
  name: "Dashboard",
  components: {
    DashboardCards
  },
  data() {
    return {
      series: [],
      options: {
        legend: {
          show: false
        },
        labels: [],
        chart: {
          type: 'pie',
          toolbar: {
            show: false
          }
        },
        tooltip: {
          fillSeriesColor: false,
        },
        theme: {
          monochrome: {
            enabled: true,
            color: '#0C2556',
            shadeTo: 'light',
            shadeIntensity: 0.65
          }
        }
      }
    }
  },
  mounted() {
    this.getStatistics();
  },
  computed: {
    networks() {
      return this.$store.getters.networks;
    },
    totalNetworks() {
      return String(this.$store.getters.totalNetworks);
    },
    wepNetworks() {
      return String(this.$store.getters.wepNetworks);
    },
    wpaNetworks() {
      return String(this.$store.getters.wpaNetworks);
    },
    openNetworks() {
      return String(this.$store.getters.openNetworks);
    }
  },
  methods: {
    async getStatistics() {
      const { data } = await this.$axios.get('networks/statistics');
      
      this.series = Object.values(data);
      this.options = {...this.options, labels: Object.keys(data)};
    }
  }
}
</script>

<style scoped> </style>