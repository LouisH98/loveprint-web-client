<template>
  <v-container fluid class="text-center" style="max-width: 700px">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <h2>LovePrint Dashboard</h2>
      </v-col>
      <v-col cols="12" class="mb-0 pb-0">
        <v-textarea
            height="130px"
            v-model="message"
            solo
            no-resize
            outlined
            hide-details
            placeholder="Message to print..."
        ></v-textarea>
      </v-col>
      <v-col cols="12">
        <v-btn
            x-large
            :loading="sending"
            outlined
            color="primary"
            @click="sendMessageToServer"
            block
            class="mt-0 pt-0"
        >
          Print
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require('axios');

export default {

  name: "MainScreen",
  data: function () {
    return {
      message: "",
      sending: false
    }
  },
  methods: {
    sendMessageToServer: async function() {
      if(this.message.trim().length === 0) return
      try{
        this.sending = true
        console.log("Sending request to: ", this.$store.state.lovePrintAddress + '/api/print-text')
        await axios.post(this.$store.state.lovePrintAddress + '/api/print-text', {
          message: this.message
        });

        this.message = "";
      }
      catch (e) {
        alert(e)
      }
      finally {
        this.sending = false;
      }
    }
  }
}
</script>

