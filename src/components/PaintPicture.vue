<template>
  <div>
      <v-row justify="center">
        <v-btn rounded @click="initAndShowCanvas">Add Drawing</v-btn>
        
      </v-row>
    <v-dialog v-model="showCanvas" max-width="400">
      <v-card class="overflow-hidden">
        <v-card-title>
          Add Drawing
        </v-card-title>

        <v-card-actions class="mb-2">
            <v-row justify="center" align="center">
              <v-slider
                  thumb-label
                  class="px-3"
                  dense
                  label="Pen Size"
                  min="1"
                  max="15"
                  v-model="penSize"
                  hide-details

              />
            </v-row>

            <v-row justify="space-around" align="end">
              <v-btn  text @click="clearCanvas">Clear</v-btn>

              <v-spacer/>

              <v-btn icon :disabled="!canUndo" @click="undo">
                <v-icon>mdi-undo</v-icon>
              </v-btn>
              <v-btn icon :disabled="!canRedo" @click="redo">
                <v-icon>mdi-redo</v-icon>
              </v-btn>
            </v-row>



        </v-card-actions>

          <v-divider/>
          <v-row justify="center" class="my-1">
            <canvas class="rounded" id="canvas" width="384" height="384"/>
          </v-row>
        <v-divider/>

        <v-card-actions style="overflow: hidden" class="">
            <v-row justify="center">
              <v-col>
                <v-btn block text @click="showCanvas = false">Cancel</v-btn>
              </v-col>
              <v-col>
                <v-btn block text @click="saveCanvasToImage" color="primary">Add</v-btn>
              </v-col>
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
    penSize: 5,
    currentStateIndex: -1
  }),
  mounted(){
    this.$root.$on('print-history-message', this.handleHistoryPrint)
  },
  watch: {
    penSize() {
      this.canvas.freeDrawingBrush.width = this.penSize;
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile
    },
    canUndo() {
      return this.currentStateIndex >= 0;
    },
    canRedo() {
      return this.currentStateIndex < this.stateHistory.length - 1
    }
  },
  methods: {
    handleHistoryPrint({image}){
      this.drawing = image;
    },
    initAndShowCanvas() {
      if (this.canvas === undefined) {
        setTimeout(() => {
          this.canvas = this.createCanvas()
        }, 200)
      }

      this.showCanvas = true;
    },

    resetCanvasState() {
      if(this.canvas){
        this.canvas.clear();

      }
      this.stateHistory = []
      this.drawing = ''
      this.currentStateIndex = -1;
    },

    clearCanvas() {
      if (confirm("Are you sure you want to clear the canvas?")) {
        this.resetCanvasState();
      }
    },
    downloadDrawing() {
      const a = document.createElement("a");
      a.href = this.drawing;
      a.download = "LovePrint-drawing.png";
      a.click();
    },
    createCanvas() {
      let canvas = new fabric.Canvas('canvas', {
        isDrawingMode: true
      })

      canvas.freeDrawingBrush.color = this.$vuetify.theme.dark ? 'white' : 'black';
      canvas.freeDrawingBrush.width = this.penSize;

      this.registerCanvasEvents(canvas)

      return canvas;
    },

    registerCanvasEvents(canvas) {
      canvas.on('path:created', () => {
        // save canvas state, increment current index number
        let canvasJSON = canvas.toJSON();

        if (this.currentStateIndex !== this.stateHistory.length - 1) {
          this.stateHistory = this.stateHistory.slice(0, Math.max(this.currentStateIndex + 1, 0));
        }
        this.currentStateIndex++;
        this.stateHistory.push(canvasJSON);
      })
    },

    undo() {
      if (this.currentStateIndex === 0) {
        this.canvas.clear();
        this.currentStateIndex--;
      } else {
        this.canvas = this.canvas.loadFromJSON(this.stateHistory[--this.currentStateIndex])
      }
    },

    redo() {
      this.canvas = this.canvas.loadFromJSON(this.stateHistory[++this.currentStateIndex])
    },

    saveCanvasToImage() {
      this.canvas.discardActiveObject();


      if (this.canvas.getObjects().length === 0) {
        this.drawing = '';
      } else {

        this.canvas.getObjects().forEach(object => {
          object.set('stroke', 'black')
        });

        this.drawing = this.canvas.toDataURL('png');
        this.resetPathStroke();
      }


      this.showCanvas = false
      this.$emit('image-changed', this.drawing)
    },

    resetPathStroke() {
      this.canvas.getObjects().forEach(object => {
        object.set('stroke', this.$vuetify.theme.dark ? 'white' : 'black')
      })
    }
  }
}
</script>

<style scoped>

</style>