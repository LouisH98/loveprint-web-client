<template>
  <div>
    <v-container class="ma-0 pa-0">
      <v-row justify="center">
        <v-btn v-if="drawing === ''" rounded @click="initAndShowCanvas">Add Drawing</v-btn>
        <v-card v-else class="text-right">
          <v-btn
              icon
              absolute
              style="right: 0; z-index: 2"
              @click=clearDrawing
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-img  max-width="200" :src="drawing" :style="$vuetify.theme.dark ? '-webkit-filter: invert(1);\n'+
'   filter: invert(1);' : ''"/>
        </v-card>
      </v-row>
    </v-container>
    <v-dialog v-model="showCanvas" max-width="384">
      <v-card>
        <v-card-title>
          Add Drawing
        </v-card-title>
        <v-divider/>
        <canvas id="canvas" width="384" height="384"/>


        <v-card-actions class="text-right pe-5">
          <v-btn outlined @click="clearCanvas">Clear</v-btn>
          <v-row justify="end">
            <v-btn text @click="showCanvas = false">Cancel</v-btn>
            <v-btn text @click="saveCanvasToImage" color="primary">Add</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import {fabric} from "fabric";

export default {
  name: "PaintPicture",
  data: () => ({
    canvas: undefined,
    showCanvas: false,
    drawing: ""
  }),
  methods: {
    initAndShowCanvas() {
      if(this.canvas === undefined){
        setTimeout(() => {
          this.createCanvas()
        }, 200)
      }

      this.showCanvas = true;
    },
    clearCanvas() {
      this.canvas.clear();
    },
    createCanvas() {
      this.canvas = new fabric.Canvas('canvas', {
        isDrawingMode: true
      })

      this.canvas.freeDrawingBrush.color = this.$vuetify.theme.dark ? 'white' : 'black';
      this.canvas.freeDrawingBrush.width = 5;
    },
    saveCanvasToImage(){
      this.showCanvas = false
      this.canvas.discardActiveObject();
      this.canvas.getObjects().forEach(object => {
        object.stroke = 'black'
      })
      this.drawing = this.canvas.toDataURL('png')

      this.$emit('image-changed', this.drawing)
    },
    clearDrawing(){
      this.drawing = '';
      this.canvas.clear();
      this.$emit('image-changed', this.drawing)
    }
  }
}
</script>

<style scoped>

</style>