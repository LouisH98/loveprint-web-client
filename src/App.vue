<template>
  <v-app style="max-height: 100vh">
    <AppBar/>

    <v-main>
      <transition name="fade">
        <router-view/>
      </transition>
    </v-main>

    <v-bottom-navigation
        color="primary"
        app
        grow
        shift
    >
      <v-btn to="/" height="100%">
        <span>Dashboard</span>

        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn to="History" height="100%">
        <span>History</span>

        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn height="100%">
        <span>Nearby</span>

        <v-icon>mdi-image</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>

import AppBar from "@/components/AppBar";
export default {
  name: 'App',

  components: {AppBar},

  data: () => ({
    //
  })
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

body, html {
  background-color: #151515;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
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