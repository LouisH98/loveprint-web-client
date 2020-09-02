<template>
  <v-container fluid class="text-center" style="max-width: 700px">
    <v-row id="wrapper" justify="center" align="center">
      <v-col cols="12" class="mb-0 pb-0">
        <v-textarea
            height="130px"
            v-model="message"
            no-resize
            class="elevation-7 rounded-lg"
            solo
            background-color="accent"
            hide-details
            placeholder="Message to print..."
        />

      </v-col>
      <v-col>
        <TextFormattingControls v-on:formatting-changed="setFormatting"/>
      </v-col>

      <v-col cols="12">
        <v-btn
            x-large
            :loading="sending"
            color="primary"
            elevation="7"
            @click="sendMessageToServer"
            block
            outlined
            class="mt-0 pt-0"
            rounded
        >
          Print
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TextFormattingControls from "@/components/TextFormattingControls";

const axios = require('axios');

export default {

  name: "MainScreen",
  components: {TextFormattingControls},
  data: function () {
    return {
      message: "",
      sending: false,
      formatting: {
        justify: 1,
        size: 2,
        text_style: []
      }
    }
  },
  methods: {
    sendMessageToServer: async function () {
      if (this.message.trim().length === 0) return

      if(this.message.split(" ").length > 25){
        alert("Pls dont use all my paper...")
        this.message = "pl"
        return
      }

      try {
        this.sending = true
        console.log("Sending request to: ", this.$store.state.lovePrintAddress + '/api/print-text')
        console.log("Formatting", this.formatting)
        const response = await axios.post(this.$store.state.lovePrintAddress + '/api/print-text', {
          message: this.message,
          formatting: this.formatting
        });

        if ('paper' in response.data) {
          this.$store.commit('setHasPaper', response.data['paper'])
        }

        this.message = "";
      } catch (e) {
        if ('paper' in e.response.data) {
          this.$store.commit('setHasPaper', e.response.data['paper'])
        }

        alert(e.response.data.error)
      } finally {
        this.sending = false;
      }
    },
    setFormatting(formattingObject) {
      this.formatting = formattingObject
    }
  }
}
</script>

