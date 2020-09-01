<template>
  <v-app>
    <AppBar/>
    <SignInComponent/>
    <v-main style="max-height: 50vh">
      <transition name="fade">
        <router-view/>
      </transition>
    </v-main>

    <v-bottom-navigation v-if="$vuetify.breakpoint.mobile"
        color="primary"
        app
        grow
        shift
        class="pb-8"
        style="height: 90px"
    >
      <v-btn to="/" height="100%">
        <span >Dashboard</span>

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
export default {
  name: 'App',

  components: {SignInComponent, AppBar},

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
  background-color: #272727;
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