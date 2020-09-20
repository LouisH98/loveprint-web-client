<template>
  <v-app>
    <update-information :update-info="updateInfo" :show-update-panel="updated" @close-dialog="updated = false"/>
    <AppBar v-on:change-username="showModal" v-on:show-info="updated = true"/>
    <SignInComponent ref="signin"/>
    <v-main id="main" class="">
      <transition name="fade">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
    </v-main>

    <v-bottom-navigation
                         color="primary"
                         app
                         grow
                         id="bottom-bar"
                         shift
                         height="90px"
    >
      <v-btn to="/" height="100%">
        <span>Dashboard</span>

        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn to="History" height="100%">
        <span>History</span>

        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn to="Settings" height="100%">
        <span>Settings</span>

        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>

import AppBar from "@/components/AppBar";
import SignInComponent from "@/components/SignInComponent";
import UpdateInformation from "@/components/UpdateInformation";

import updateMarkdown from '@/update-info.md'




export default {
  name: 'App',

  components: {UpdateInformation, SignInComponent, AppBar},

  mounted() {
    this.showUpdatePanel()

  },
  data: () => ({
    updateInfo: {
      version: '0.3.1',
      markdown: updateMarkdown
    },
    updated: false

  }),
  methods: {
    showModal() {
      this.$refs.signin.displayModal();
    },
    showUpdatePanel() {
      //if the version in the localStorage is different to this version, show update and update localVersion
      let isCurrentVersion = this.updateInfo.version === this.$store.state.lastSetVersion;

      if(!isCurrentVersion){
        this.updated = true;
        this.$store.state.lastSetVersion = this.updateInfo.version;
      }
    }
  }
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

body, html {
  background-color: #272727;
  overflow: hidden;
  height: 95vh;
}

#bottom-bar {
  padding-bottom: 0;
  padding-bottom: env(safe-area-inset-bottom, 0);
}


.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

</style>