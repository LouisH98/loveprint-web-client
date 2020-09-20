<template>
  <v-dialog
      v-model="showUpdatePanel"
      max-width="800px"
      class="overflow-hidden"
  >
    <v-card>
      <v-card-title>
        Whats new?

        <v-spacer/>
        {{ updateInfo.version }}
      </v-card-title>

      <v-divider class="pb-4"/>

      <v-card-text class="overflow-auto">

        <div v-html="renderMarkdown"/>

      </v-card-text>

      <v-card-actions >
        <v-btn
            class="text-right"
            block
            outlined
            color="primary"
            @click="closeDialog">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const marked = require('marked')
export default {
  name: "UpdateInformation",
  data: () => ({
    dialog: false
  }),
  props: ['updateInfo', 'showUpdatePanel'],
  computed: {
    renderMarkdown(){
      return marked(this.updateInfo.markdown)
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog')
    }
  }
}
</script>

<style scoped>

</style>