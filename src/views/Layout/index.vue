<template>
  <div class="layout">
    <div class="sidebar">
      <v-side />
    </div>
    <div class="content">
      <div class="header">
        <i class="el-icon-more menuBtn"></i>
        <v-header />
      </div>
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
    top: 51px;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: auto;
    padding: 20px 20px 0 20px;
  }
  .layout .sidebar + .content,
  .layout .sidebar + .content > .header {
    left: 260px;
  }
  .layout > .content > .header {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: 50px;
    border-bottom: 1px solid #ddd;
    z-index: 2;
    background: #fff;
  }
  .layout > .content > .body {
    min-height: calc(100% - 90px);
    padding: 20px 20px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 8px #e9e9e9;
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
  .menuBtn {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    display: none;
  }
  @media screen and (max-width: 800px) {
    .layout > .sidebar {
      transform: translateX(-100%);
    }
    .layout .sidebar + .content,
    .layout .sidebar + .content > .header {
      left: 0;
    }
    .menuBtn {
      display: inline-block;
    }
  }
</style>
<style>
  html, body{
    /* touch-action: none;  */
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
  .sidebar-wrap::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 6px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 6px;
  }
  
  .sidebar-wrap::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      background-color: #ccc;
  }
  
  .sidebar-wrap::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #333;
  }
</style>