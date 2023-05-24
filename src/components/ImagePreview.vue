<template>
          <v-card class="text-right" style="width: 200px">
          <v-btn
              icon
              absolute
              style="right: 0; z-index: 2"
              @click="$emit('clear-image')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-btn
              icon
              absolute
              
              style="left: 0; z-index: 2"
              @click="$emit('download-image')"
          >
            <v-icon>mdi-download</v-icon>
          </v-btn>


          <v-img @click="$emit('image-selected')" max-width="200" :src="image"/>
        </v-card>
</template>

<script>
export default {
    props: {
        image: {
            type: String,
            default: ''
        }
    },
}
</script>