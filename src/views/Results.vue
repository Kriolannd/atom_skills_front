
<script setup>
import { ref, onMounted, onUpdated, watch } from "vue";

const width = window.innerWidth;
const height = window.innerHeight;

const stageSize = ref({
    height: height,
    width:width
})
const text = ref("Try to draw a rectangle");
const lines = ref([]);
const isDrawing = ref(false);
const recs = ref([]);

const handleMouseDown = (event) => {
    isDrawing.value = true;
    const pos = $refs.stage.getNode().getPointerPosition();
    setRecs([
    ...recs.value,
    { startPointX: pos.x, startPointY: pos.y, width: 0, height: 0 },
    ]);
};

const handleMouseUp = () => {
    isDrawing.value = false;
};

const setRecs = (element) => {
    recs.value = element;
};

const handleMouseMove = (event) => {
    if (!isDrawing.value) {
    return;
    }
    const point = $refs.stage.getNode().getPointerPosition();
    let curRec = recs.value[recs.value.length - 1];
    curRec.width = point.x - curRec.startPointX;
    curRec.height = point.y - curRec.startPointY;
};

const src = ref("static/tsk0002/img_test0002_2_28.jpg");
</script>

<template>
    <v-stage
      ref="stage"
      :config="stageSize"
      @mousemove="handleMouseMove"
      @mouseDown="handleMouseDown"
      @mouseUp="handleMouseUp"
    >
      <v-layer ref="layer">
        <v-text
          ref="text"
          :config="{
            x: 10,
            y: 10,
            fontSize: 20,
            text: text,
            fill: 'black',
          }"
        />
        <v-rect
          v-for="(rec, index) in recs"
          :key="index"
          :config="{
            x: Math.min(rec.startPointX, rec.startPointX + rec.width),
            y: Math.min(rec.startPointY, rec.startPointY + rec.height),
            width: Math.abs(rec.width),
            height: Math.abs(rec.height),
            fill: 'rgb(0,0,0,0)',
            stroke: 'black',
            strokeWidth: 3,
          }"
        />
      </v-layer>
    </v-stage>
    <!-- <div>
        <img id="pilt" v-bind:src="src"/>
    </div> -->
  </template>
  