<template>
  <div class="text-center">
    <h1>History</h1>
    <div style="height: 100vh; max-height: calc(100vh - 193px); overflow-y: auto;">
      <v-container style="height: 100%">
        <v-row align="center" justify="center">
          <v-col v-for="historyItem in history" v-bind:key="historyItem.id" sm="6" cols="12" md="4" lg="4">
            <v-card elevation="5" class="mx-3 my-0 rounded-lg">
              <v-card-title class="pt-0 pb-0">
                <v-spacer/>
                <v-menu offset-y>
                  <template v-slot:activator="{on, attrs}">
                    <v-btn icon v-on="on" v-bind="attrs">
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>

                  <!-- History Item Menu -->
                  <v-list>
                    <v-list-item link @click="printMessage(historyItem)">
                      <v-list-item-icon class="pe-0 me-2">
                        <v-icon color="primary">mdi-printer</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title color="primary">
                          PRINT
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item link @click="removeHistoryItem(historyItem)">
                      <v-list-item-icon class="pe-0 me-2">
                        <v-icon color="primary">mdi-delete</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title color="primary">
                          Remove
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>

              <v-card-text class="pb-0">
                <v-img :src="historyItem.image" :class="{'invert' : $vuetify.theme.dark}"/>
                <v-row :class="{
                  'justify-start': historyItem.formatting.justify === 0,
                  'justify-center': historyItem.formatting.justify === 1,
                  'justify-end': historyItem.formatting.justify === 2,
                }">
                  <span class="print-message"
                        :class="{
                  'large-text' : historyItem.formatting.size === 2,
                  'medium-text': historyItem.formatting.size === 1,
                  'small-text': historyItem.formatting.size === 0
                }">{{ historyItem.message }}</span>
                </v-row>


              </v-card-text>

              <v-card-actions>
                <v-spacer/>
                <span class="grey--text mt-3" style="font-size: 0.8em">{{
                    new Date(historyItem.time).toLocaleDateString()
                    + ' @ ' + new Date(historyItem.time).toLocaleTimeString()
                  }}</span>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row
            v-if="history.length === 0"
            justify="center"
            align="start"
            style="min-height: 100%"
        >
          <div class="d-flex flex-column">
            <span style="font-size: 5em">😥</span>
            <span>No history!<br/>Go send a message and look back on your artwork here.</span>
          </div>

        </v-row>
      </v-container>

    </div>

  </div>
</template>

<script>
import {getHistory, removeHistoryItem} from "@/utils";

export default {
  name: "History",
  mounted() {
    this.history = getHistory();

    this.$root.$on('new-message', (messageObj) => {
      this.history.unshift(messageObj)
    })
  },
  data: function () {
    return {
      history: []
    }
  },
  methods: {
    printMessage(message){
      this.$router.push({name: 'Home'});
      this.$root.$emit('print-history-message', message);
    },
    removeHistoryItem(messageObj){
      removeHistoryItem(messageObj);

      const index = this.history.findIndex(msgObj => msgObj.id === messageObj.id);

      if(index >= 0) {
        this.$delete(this.history, index)
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');

.print-message {
  font-family: 'DotGothic16', sans-serif;
}

.invert {
  filter: invert(1)
}

.large-text {
  font-size: 30px;
}

.medium-text {
  font-size: 20px;
}

.small-text {
  font-size: 10px;
}
</style>