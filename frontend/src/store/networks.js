export default (axios) => {
  return {
    state: {
      networks: null
    },
    mutations: {
      resetNetworks(state) {
        state.networks = null;
      },
      setNetworks(state, networks) {
        state.networks = networks;
      },
      addNetwork(state, network) {
        state.networks.unshift(network);
      },
      updateNetwork(state, networkToUpdate) {
        let id = state.networks.findIndex((n) => n.bssid === networkToUpdate.bssid);
        if(id >= 0) state.networks[id] = networkToUpdate;
      },
      deleteNetwork(state, networkToDelete) {
        let id = state.networks.findIndex((n) => n.bssid === networkToDelete.bssid);
        if(id >= 0) state.networks.splice(id, 1);
      }
    },
    getters: {
      networks: (state) => {
        if(state.networks == null) {
          return [];
        }
        
        return state.networks;
      },
      totalNetworks: (state) => {
        if(state.networks == null) {
          return 0;
        }

        return state.networks.length;
      },
      wepNetworks: (state) => {
        if(state.networks == null) {
          return 0;
        }


        return state.networks.filter(n => n.privacy.includes('WEP')).length;
      },
      wpaNetworks: (state) => {
        if(state.networks == null) {
          return 0;
        }

        return state.networks.filter(n => n.privacy.includes('WPA')).length;
      },
      openNetworks: (state) => {
        if(state.networks == null) {
          return 0;
        }

        return state.networks.filter(n => n.privacy.includes('OPN')).length;
      }
    },
    actions: {
      async loadNetworks(context) {
        try {
          const { data: networks } = await axios.get('networks');
          context.commit('setNetworks', networks);
          return networks;
        } catch (err) {
          context.commit('resetNetworks', null);
          throw err;
        }
      },
      async addNetwork(context, network) {
        try {
          const { data: createdNetwork } = await axios.post('networks', network);
          context.commit('addNetwork', createdNetwork);
          return createdNetwork;
        } catch(err) {
          console.error(err);
          throw err;
        }
      },
      async updateNetwork(context, network) {
        try {
          await axios.put(`networks/${network.bssid}`, network);
          context.commit('updateNetwork', network);
          return network;
        } catch(err) {
          console.error(err);
          throw err;
        }
      },
      async deleteNetwork(context, network) {
        try {
          await axios.delete(`networks/${network.bssid}`);
          context.commit('deleteNetwork', network);
          return network;
        } catch(err) {
          console.error(err);
          throw err;
        }
      }
    }
  }
};