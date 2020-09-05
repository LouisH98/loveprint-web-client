<template>
  <v-app-bar
      app
  >
    <div class="d-flex align-center">
      <v-img
          alt="LovePrint logo"
          class="shrink mr-2"
          contain
          :src="getLogo"
          transition="scale-transition"
          width="40"
      />

      <v-toolbar-title class="ms-1">LovePrint</v-toolbar-title>
    </div>

    <v-spacer></v-spacer>
    <div>
      <v-col cols="2">
        <v-row>
        <span style="font-size: 0.7em">
          Name
        </span>
        </v-row>

        <v-row>
          <a @click="$emit('change-username')">
            {{getUsername}}
          </a>
        </v-row>
      </v-col>
    </div>


    <div id="status-icons" class="d-flex">
      <div>
        <v-progress-circular
            v-if="connecting"
            indeterminate
            size="20"
        />
      </div>
      <v-icon v-if="connected && !connecting" color="green">mdi-check-circle</v-icon>
      <v-icon v-else color="red">mdi-alert-circle</v-icon>
      <v-icon v-if="isPaperEmpty" color="red" class="blink">mdi-printer-alert</v-icon>
    </div>
  </v-app-bar>
</template>

<script>
const axios = require('axios')

export default {
  name: "AppBar",
  mounted() {
    this.getPrinterStatus();
  },
  computed: {
    isPaperEmpty() {
      return !this.$store.state.hasPaper
    },
    getLogo() {
      return this.$vuetify.theme.dark ? require('@/assets/loveprint-logo-white.png') : require('@/assets/loveprint-logo.png')
    },
    getUsername() {
      return this.$store.state.username;
    }
  },
  data: () => ({
    connected: false,
    connecting: true,
  }),
  methods: {
    async getPrinterStatus() {
      try {
        const response = await axios.get(this.$store.state.lovePrintAddress + "/api/get-status")
        this.connecting = false;
        this.connected = true;

        this.$store.commit('setHasPaper', response.data['paper'])
      } catch (e) {
        console.log(e)
        this.connecting = false;
        this.connected = false;

        setTimeout(() => {
          this.getPrinterStatus();
        }, 5000)
      }
    }
  }
}
</script>

<style scoped>
.blink {
  animation: blinker 1s linear infinite;
}

#status-icons > * {
  padding: 0 10px;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>