<template>
  <div class="home">
    <div 
      class="container"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd">
      <div
        :style="{ 
          transform: `scale(${scale}) translateX(${_x_}px) translateY(${_y_}px)`
        }"
        class="main"
      >
        <img src="./bg.jpg" />
        <div class="BtnBox">
          <div class="areaBtn btn_1">
            <span class="icon"></span>
            <div class="tip">
              <div class="tip-title">制剂生产车间</div>
              一楼主要为制剂生产车间，洗衣房，纯化水系统，二楼为设备储存，技术夹层
            </div>
          </div>

          <div class="areaBtn btn_2">
            <span class="icon"></span>
            <div class="tip">
              <div class="tip-title">研发车间及质检车间</div>
              一楼主要为更衣区，小仓库：设CO2、N2、O2各一个，容积为0.45m2，用于研发车间和质检车间的接收与存储，2-3楼为研发和质检实验室，4楼为生产、质检研发办公室
            </div>
          </div>

          <div class="areaBtn btn_3">
            <span class="icon"></span>
            <div class="tip">
              <div class="tip-title">生产车间</div>
              一楼主要为原液生产，2F~5F空置，为预留发展车间
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="debugging">
      {{ _x_ }} | {{ _y_ }}
    </div>
    <div style="height: 1000px"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeTouch",
  components: {
    HelloWorld,
  },
  data() {
    return {
      _x_: 0,
      _y_: 0,
      lastSite: {
        x: 0,
        y: 0
      },
      scale: 1,
      touch: Array(),
      testData: {},
    };
  },
  methods: {
    // 缩放
    Zoom(e: any) {
      this.testData = "zoom";
    },
    // 拖拽
    Drag(e: any) {
      this.testData = "drag and move"
      let to: any = e.touches[0]
      let start: any = this.touch[0]
      let {x, y} = this.lastSite
      this._x_ = to.pageX - start.pageX + x
      this._y_ = to.pageY - start.pageY + y
    },
    touchEnd() {
      this.lastSite = {
        x: this._x_,
        y: this._y_
      }
    },
    touchMove(e: any) {
      e.preventDefault();
      if (this.touch.length === 1) {
        this.Drag(e);
      } else if (this.touch.length === 2) {
        this.Zoom(e);
      }
    },
    touchStart(e: any) {
      this.touch = e?.touches;
    },
    toMax() {
      if (this.scale < 1.5) {
        this.scale += 0.1;
      }
    },
    toMin() {
      if (this.scale > 0.5) {
        this.scale -= 0.1;
      }
    },
  },
});
</script>


<style scoped>
.debugging {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9;
  background: #fff;
  color: #333;
  font-size: 12px;
}
.container {
  position: relative;
  overflow: hidden;
  height: 400px;
  border-radius: 5px;
  box-shadow: 0 0 6px #ccc;
  background: #eee;
  display: flex;
  justify-content: center;
  align-content: center;
}
.main {
  position: relative;
  font-size: 0;
}
.main img {
  position: relative;
  z-index: 1;
  background: #fff;
}
.BtnBox {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
}
.areaBtn {
  position: absolute;
  cursor: pointer;
  overflow: hidden;
  font-size: 12px;
  color: #333;
  width: 30px;
  height: 30px;
}
.icon {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
  animation: clickNotice 1s infinite linear;
}
.icon::before {
  content: "";
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background: #ff9900;
  opacity: 0.3;
}
.icon::after {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: #ff9900;
  opacity: 0.3;
  position: absolute;
  left: 5px;
  top: 5px;
}
.tip {
  position: absolute;
  left: 100%;
  top: 0;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.8);
  color: #333;
  padding: 12px 12px;
  margin-left: 20px;
  border-radius: 5px;
  width: 120px;
  opacity: 0;
  box-shadow: 0 0 6px #999;
}
.tip::before {
  content: "";
  display: block;
  position: absolute;
  left: -12px;
  top: 8px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-right-color: rgba(255, 255, 255, 0.9);
}
.tip-title {
  font-size: 13px;
  color: #333;
  border-bottom: 1px solid #ccc;
  padding-bottom: 6px;
  margin-bottom: 6px;
}
.areaBtn:hover {
  overflow: visible;
}
.areaBtn:hover > .tip {
  display: block;
  opacity: 1;
}
.btn_1 {
  top: 210px;
  left: 260px;
}

.btn_2 {
  top: 260px;
  left: 526px;
}

.btn_3 {
  top: 100px;
  left: 320px;
}
@keyframes clickNotice {
  from {
    transform: scale(0.6);
  }
  to {
    transform: scale(1);
  }
}
</style>