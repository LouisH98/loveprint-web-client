<template>
  <div class="text-center">
    <h1>History</h1>
    <div style="height: 100vh; max-height: calc(100vh - 193px); overflow-y: auto;">
      <v-container>
        <v-row align="center" justify="center">
          <v-col v-for="historyItem in history" v-bind:key="historyItem.time" sm="6" cols="12" md="4" lg="4">
            <v-card elevation="5" class="mx-6 my-1 rounded-lg">
              <v-menu offset-y>
                <template v-slot:activator="{on, attrs}">
                  <v-btn icon  style="position: absolute;" v-on="on" v-bind="attrs">
                    <v-icon>mdi-dots-horizontal</v-icon>

                  </v-btn>

                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>
                      <v-icon>mdi-printer</v-icon>
                      <span style="color: red">PRINT</span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-card-text class="pb-0">
                <v-img :src="historyItem.image" :class="{'invert' : $vuetify.theme.dark}"/>
                <span class="print-message">{{ historyItem.message }}</span>
              </v-card-text>

              <v-card-actions>
                <v-spacer/>
                <span class="grey--text" style="font-size: 0.8em">{{
                    new Date(historyItem.time).toLocaleDateString()
                    + ' @ ' + new Date(historyItem.time).toLocaleTimeString()
                  }}</span>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    </div>

  </div>
</template>

<script>
import {getHistory} from "@/utils";

export default {
  name: "History",
  mounted() {
    this.history = getHistory();

    this.$root.$on('new-message', (messageObj) => {
      this.history.push(messageObj)
    })
  },
  data: function () {
    return {
      history: []
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');

.print-message {
  font-family: 'DotGothic16', sans-serif;
  font-size: 24px
}

.invert {
  filter: invert(1)
}
</style>