<template>
  <div class="home">
    <div>
      <button @click="toMax">放大</button>
      <button @click="toMin">缩小</button>
    </div>
    <div
      class="container">
      <div
        :style="{transform: `scale(${scale})`}"
        class="main">
        <img src="./bg.jpg" />
        <div class="BtnBox">
          <div class="areaBtn btn_1" @click="showText('生产区-制作区')"></div>
          <div class="areaBtn btn_2" @click="showText('生产区-板房')"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  data() {
    return {
      scale: 1,
    }
  },
  methods: {
    showText(text: any) {
      alert(text)
    },
    toMax() {
      this.scale += 0.1
    },
    toMin() {
      if (this.scale > 0.5) {
        this.scale -= 0.1
      }
    }
  }
});
</script>


<style scoped>
.container {
  position: relative;
  overflow: scroll;
  width: 800px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 0 0 6px #ccc;
}
.main {
  position: relative;
  font-size: 0;
}
.main img {
  position: relative;
  z-index: 1;
}
.BtnBox {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
}
.areaBtn{
  position: absolute;
}
.btn_1 {
  width: 390px;
  height: 194px;
  background: #ff9900;
  opacity: .3;
  top: 261px;
  left: 412px;
}
.btn_2 {
  width: 290px;
  height: 104px;
  background: #ff9900;
  opacity: .3;
  top: 101px;
  left: 412px;
}
</style>