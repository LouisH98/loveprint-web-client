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
              @click=clearCanvas
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-btn
              icon
              absolute
              style="left: 0; z-index: 2"
              @click=downloadDrawing
          >
            <v-icon>mdi-download</v-icon>
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

        <v-card-actions>
          <v-container class="py-0 my-0">
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
              <v-btn outlined @click="clearCanvas">Clear</v-btn>

              <v-spacer/>

              <v-btn icon :disabled="!canUndo" @click="undo">
                <v-icon>mdi-undo</v-icon>
              </v-btn>
              <v-btn icon :disabled="!canRedo" @click="redo">
                <v-icon>mdi-redo</v-icon>
              </v-btn>
            </v-row>



          </v-container>
        </v-card-actions>


        <v-row justify="center" align="center">
          <canvas style="border: 1px solid gray" class="rounded" id="canvas" width="384" height="384"/>
        </v-row>
        <v-card-actions style="overflow: hidden" class="py-0 my-0">
          <v-container class="my-0 py-0">
            <v-row justify="center">
              <v-col>
                <v-btn block text @click="showCanvas = false">Cancel</v-btn>
              </v-col>
              <v-col>
                <v-btn block text @click="saveCanvasToImage" color="primary">Add</v-btn>
              </v-col>
            </v-row>
          </v-container>
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
    initAndShowCanvas() {
      if (this.canvas === undefined) {
        setTimeout(() => {
          this.canvas = this.createCanvas()
        }, 200)
      }

      this.showCanvas = true;
    },

    resetCanvasState() {
      this.canvas.clear();
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