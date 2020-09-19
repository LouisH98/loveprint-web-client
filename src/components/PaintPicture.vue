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
          <v-img @click="initAndShowCanvas" max-width="200" :src="drawing" :style="$vuetify.theme.dark ? '-webkit-filter: invert(1);\n'+
'   filter: invert(1);' : ''"/>
        </v-card>
      </v-row>
    </v-container>
    <v-dialog v-model="showCanvas" max-width="384">
      <v-card class="overflow-hidden">
        <v-card-title>
          Add Drawing
        </v-card-title>
        <v-divider/>
        <v-row justify="center" align="center">
          <canvas id="canvas" width="384" height="384"/>
        </v-row>
        <v-card-actions style="overflow: hidden" class="mx-2">
          <v-row justify="space-around" align="end">
            <v-btn outlined @click="clearCanvas">Clear</v-btn>
            <v-btn icon>
              <v-icon>mdi-undo</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-redo</v-icon>
            </v-btn>
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
    drawing: "",
    stateHistory: [],
    currentStateIndex: 0
  }),
  computed: {
    isMobile(){
      return this.$vuetify.breakpoint.mobile
    }
  },
  methods: {
    initAndShowCanvas() {
      if (this.canvas === undefined) {
        setTimeout(() => {
          this.canvas = this.createCanvas()
        }, 200)
      }

      this.showCanvas = true;
    },
    clearCanvas() {
      if(confirm("Are you sure you want to clear the canvas?")){
        this.canvas.clear();
      }
    },
    createCanvas() {
      let canvas = new fabric.Canvas('canvas', {
        isDrawingMode: true
      })

      canvas.freeDrawingBrush.color = this.$vuetify.theme.dark ? 'white' : 'black';
      canvas.freeDrawingBrush.width = 5;

      this.registerCanvasEvents(canvas)

      return canvas;
    },

    registerCanvasEvents(canvas) {
      canvas.on('object:added', () => {
        // save canvas state, increment current index number
        let canvasJSON = canvas.toJSON();
        this.stateHistory.push(canvasJSON);
        this.currentStateIndex++;
      })
    },

    undo() {
      if (this.currentStateIndex > 0) {
        this.canvas = this.canvas.loadFromJSON(this.stateHistory[--this.currentStateIndex])
      }
    },

    saveCanvasToImage() {
      this.canvas.discardActiveObject();


      if (this.canvas.getObjects().length === 0) {
        this.drawing = ''
      } else {
        //clone canvas - to prevent black lines when going back to edit
        let canvasJSON = this.canvas.toJSON();
        let canvasCopy = this.createCanvas().loadFromJSON(canvasJSON)


        canvasCopy.getObjects().forEach(object => {
          object.set('stroke', 'black')
        })

        canvasCopy.requestRenderAll();
        this.drawing = canvasCopy.toDataURL('png')
      }

      this.showCanvas = false
      this.$emit('image-changed', this.drawing)
    },
    clearDrawing() {
      this.drawing = '';
      this.canvas.clear();
      this.$emit('image-changed', this.drawing)
    }
  }
}
</script>

<style scoped>

</style>