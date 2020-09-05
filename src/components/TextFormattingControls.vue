<template>
  <v-row
      justify="center"
      class="ma-0 pa-0 mt-0"
  >
    <v-btn-toggle
        id="align-text"
        mandatory
        class="ma-2 elevation-5 rounded-lg"
        v-model="formatting.justify"
    >
      <v-btn>
        <v-icon>mdi-format-align-left</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>mdi-format-align-center</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>mdi-format-align-right</v-icon>
      </v-btn>
    </v-btn-toggle>


    <v-btn-toggle
        id="text-size3"
        mandatory
        class="ma-2 elevation-5 rounded-lg"
        v-model="formatting.size"
    >
      <v-btn>
        <h6>S</h6>
      </v-btn>
      <v-btn>
        <h5>M</h5>
      </v-btn>
      <v-btn>
        <h4>L</h4>
      </v-btn>
    </v-btn-toggle>

    <v-btn-toggle
        id="text-size"
        multiple
        rounded
        class="ma-2 elevation-5 rounded-lg"
        v-model="formatting.text_style"
    >
      <v-btn>
        <v-icon>mdi-format-bold</v-icon>
      </v-btn>
      <v-btn>
        <v-icon style="transform: rotate(180deg); padding-top: 6px">mdi-format-color-text</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>mdi-format-underline</v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-row>

</template>

<script>

export default {
  name: "TextFormattingControls",
  watch: {
    formatting: {
      handler(val){
        this.$emit('formatting-changed', val)
      },
      deep: true
    }
  },
  data: function () {
    return {
      formatting: {
        justify: 1,
        size: 2,
        text_style: []
      }
    }
  }
}
</script>

<style scoped>
</style>