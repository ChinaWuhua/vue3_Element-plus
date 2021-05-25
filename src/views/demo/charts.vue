<template>
  <div>
    <!-- <div class="mapImg" @mousedown="mousedown">
      <img src="./map.png" alt="地图">
      <div class="cover"></div>
    </div> -->
    <el-button @click="clearPoints">清空标记点</el-button>
    <el-button @click="toggle">生成地图轮廓</el-button>
    <div>{{pointsList}}</div>
    <div class="map">
      <div :style="{'transform': `scale(${scale})`}">
        <svg height="800" width="800" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon class="svgcontain" style="fill: #5f9726;"  :points="chencun"></polygon>
          <text x="330" dy="80" style="fill: white">陈村</text>
          <polygon class="svgcontain" style="fill: #0190a6;" :points="beijiao"></polygon>
          <text x="360" dy="190" style="fill: white">北滘</text>
          <polygon class="svgcontain" style="fill: #bc8534;" :points="lundun"></polygon>
          <text x="400" dy="290" style="fill: white">伦敦</text>
          <polygon class="svgcontain" style="fill: #01a5ee;" :points="daliang"></polygon>
          <text x="500" dy="410" style="fill: white">大良</text>
          <polygon class="svgcontain" style="fill: #026177;" :points="ronggui"></polygon>
          <text x="500" dy="520" style="fill: white">容桂</text>
          <polygon class="svgcontain" style="fill: #059fe6;" :points="lecong"></polygon>
          <text x="150" dy="150" style="fill: white">乐从</text>
          <polygon class="svgcontain" style="fill: #03beed;" :points="leliu"></polygon>
          <text x="250" dy="320" style="fill: white">勒流</text>
          <polygon class="svgcontain" style="fill: #35762d;" :points="longjiang"></polygon>
          <text x="90" dy="330" style="fill: white">龙江</text>
          <polygon class="svgcontain" style="fill: #9f8730;" :points="xingtan"></polygon>
          <text x="230" dy="480" style="fill: white">杏坛</text>
          <polygon class="svgcontain" style="fill: #9d753a;" :points="junan"></polygon>
          <text x="250" dy="620" style="fill: white">均安</text>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import chencun from './chencun'
import beijiao from './beijiao'
import lundun from './lundun'
import daliang from './daliang'
import ronggui from './ronggui'
import lecong from './lecong'
import leliu from './leliu'
import longjiang from './longjiang'
import xingtan from './xingtan'
import junan from './junan'
export default defineComponent({
  data() {
    return {
      chencun: '',
      beijiao: '',
      lundun: '',
      daliang: '',
      ronggui: '',
      longjiang: '',
      xingtan: '',
      leliu: '',
      lecong: '',
      junan: '',
      scale: 1,
      pointsList: []
    }
  },
  methods: {
    clearPoints() {
      this.pointsList = []
    },
    mousedown(e) {
      this.pointsList.push([e.clientX, e.clientY])
      let div = document.createElement('div')
      div.className = 'pointMarker'
      div.style.left = `${e.clientX}px`
      div.style.top = `${e.clientY}px`
      document.body.appendChild(div)
    },
    mousewheel(e) {
      e = e || window.event;
      e.preventDefault && e.preventDefault(); //禁止滚动
      let event = e.wheelDelta || e.detail; // 浏览器兼容
      if (event > 0) {
        // 放大
        this.toMax()
      }
      if (event < 0) {
        // 缩小
        this.toMin()
      }
    },
    toMax() {
      if (this.scale < 1.5) {
        this.scale += 0.1
      }
    },
    toMin() {
      if (this.scale > 0.5) {
        this.scale -= 0.1
      }
    },
    pointChange(tar, source) {
      this[tar] = source.map(item => {
        let x = item[0] - 300
        let y = item[1] - 80
        return `${x},${y} `
      })
    },
    toggle() {
      this.pointChange('chencun', chencun)
      this.pointChange('beijiao', beijiao)
      this.pointChange('lundun', lundun)
      this.pointChange('daliang', daliang)
      this.pointChange('ronggui', ronggui)
      this.pointChange('lecong', lecong)
      this.pointChange('leliu', leliu)
      this.pointChange('longjiang', longjiang)
      this.pointChange('xingtan', xingtan)
      this.pointChange('junan', junan)
    }
  }
})
</script>


<style scoped>
.chart {
  width: 600px;
  height: 400px;
}
.svgcontain {
  fill-opacity: 0.5;
  stroke: #fff; 
  stroke-width: 3; 
  cursor:pointer;
  stroke-linecap: round;
  transition: .3s;
}
.svgcontain:hover {
  fill-opacity: 1;
}
.map {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(13, 107, 119);
}
.mapImg{
  position: relative;
  overflow: hidden;
  font-size: 0;
}
.mapImg img {
  max-width: 100%;
  max-height: 100%;
}
.cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
}
</style>
<style>
.pointMarker {
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background: red;
  position: fixed;
  z-index: 99;
  transform: translateX(-2px) translateY(-2px);
}
</style>