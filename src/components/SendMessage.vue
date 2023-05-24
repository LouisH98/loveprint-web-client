<template>
  <v-container fluid class="text-center" style="max-width: 700px">
    <v-snackbar
        id="success-snackbar"
        v-model="successSnackbar"
        timeout="2000"
        color="success"
        top
    >
      Message Printed! 😀

      <template v-slot:action="{ attrs }">
        <v-btn
            text
            v-bind="attrs"
            @click="successSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
        id="error-snackbar"
        v-model="errorSnackbar"
        color="error"
        top
    >
      Error Printing! <br/> {{errorMessage}}

      <template v-slot:action="{ attrs }">
        <v-btn
            text
            v-bind="attrs"
            @click="errorSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

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

      <v-col cols="12" class="d-flex align-center justify-space-around">
        <PaintPicture  ref="picture" v-on:image-changed="setImage"/>
        <GenerateImage v-on:image-changed="setImage"/>
      </v-col>
      <v-col v-if="image">
        <ImagePreview :image="image" @clear-image="clearImage" />
      </v-col>

      <v-col class="pa-0 ma-0">
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
import PaintPicture from "@/components/PaintPicture";
import GenerateImage from "@/components/GenerateImage";

import {addItemToHistory, uuidv4, sendMessage} from "@/utils";
import ImagePreview from "./ImagePreview.vue";

export default {

  name: "MainScreen",
  components: { PaintPicture, TextFormattingControls, GenerateImage, ImagePreview },
  data: function () {
    return {
      image: "",
      message: "",
      sending: false,
      successSnackbar: false,
      errorSnackbar: false,
      errorMessage: '',
      formatting: {
        justify: 1,
        size: 2,
        text_style: []
      }
    }
  },
  mounted(){
    this.$root.$on('print-history-message', this.setMessageContents)
  },
  methods: {
    setMessageContents({message, image}){
      this.message =  message;
      this.image =  image;
    },
    setImage(image){
      this.image = image;
    },
    clearImage(){
      this.image = "";
    },
    isMessageContent(){
      let isMessage = this.message.trim().length > 0;
      let isImage = this.image.length > 0;

      return (isMessage || isImage)
    },
    saveMessageToStore(){
      const messageObj = {
        message: this.message,
        formatting: this.formatting,
        image: this.image,
        time: new Date(),
        id: uuidv4()
      }
      addItemToHistory(messageObj);

      this.$root.$emit('new-message', messageObj)
    },
    sendMessageToServer: async function () {
      if (!this.isMessageContent()) return

      if(this.message.split(" ").length > 40){
        alert("Pls dont use all my paper...")
        this.message = "pls"
        return
      }

      try {
        this.sending = true

        this.saveMessageToStore();

        const responseData = await sendMessage({
          message: this.message,
          formatting: this.formatting,
          username: this.$store.state.username,
          image: this.image
        });


        if ('paper' in responseData) {
          this.$store.commit('setHasPaper', responseData['paper'])
        }

        this.successSnackbar = true;

        this.message = "";
        this.image = "";
        this.$refs.picture.resetCanvasState();
      } catch (e) {
        if (e.response && e.response.data && 'paper' in e.response.data) {
          this.$store.commit('setHasPaper', e.response.data['paper'])
          this.errorMessage = e.response.data.error
          this.errorSnackbar = true;
        } else {
          this.errorMessage = "Error when sending message: " + e;
          this.errorSnackbar = true;
        }
        console.log(e)
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

