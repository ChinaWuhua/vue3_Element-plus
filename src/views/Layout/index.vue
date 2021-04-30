<template>
  <div class="layout">
    <div class="header">
      <v-header />
    </div>
    <div class="sidebar">
      <v-side />
    </div>
    <div class="content">
      <div class="body">
        <router-view/>
      </div>
      <div class="footer">
        <span>Author: wuhua</span>
        <span>QQ: 1007710266</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import vHeader from './header.vue';
import vSide from './sidebar.vue';
export default defineComponent({
  name: 'layout',
  components: {
    vHeader, vSide
  },
  data() {
    return {

    }
  },
  methods: {

  }
})
</script>

<style scoped>
  .layout {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .layout > .header {
    position: absolute;
    left: 261px;
    top: 0;
    right: 0;
    height: 60px;
    border-bottom: 1px solid #ddd;
  }
  .layout > .sidebar {
    position: absolute;
    left: 0;
    top: 0;
    width: 260px;
    bottom: 0;
    border-right: 1px solid #ddd;
  }
  .layout > .content {
    position: absolute;
    top: 61px;
    right: 0;
    left: 261px;
    bottom: 0;
    overflow: auto;
  }
  .layout > .content > .body {
    min-height: calc(100% - 75px);
    padding: 12px 12px;
  }
  .footer {
    height: 50px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #999;
  }
  .footer > span {
    display: inline-block;
    padding-left: 12px;
    margin-left: 12px;
    border-left: 1px solid #ddd;
  }
  .footer > span:first-child {
    border-left: 0;
    padding-left: 0;
    margin-left: 0;
  }
</style>
<style>
  html, body{
    margin: 0;
    padding: 0;
    font-size: 14px;
    height: 100%;
    position: relative;
  }
  img,span,div,input,ul,li,dd,dt,dl,p,a,i,h1,h2,h3,h4,h5,h6,textarea{
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: #ccc;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #666;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }
</style>