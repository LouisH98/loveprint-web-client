<template>
  <v-app>
    <v-app-bar
      app
      color="secondary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/loveprint-logo-white.png"
          transition="scale-transition"
          width="40"
        />

        <v-toolbar-title class="ms-1">LovePrint</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view style="overflow: auto; height: 100%"></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}
</style>