<template>
  <div class="layout">
    <div class="header">
      header
    </div>
    <div class="sidebar">
      sidebar
    </div>
    <div class="content">
      <div class="body">
        <router-view/>
      </div>
      <div class="footer">
        Copyright @粤ICP2021TEST第666号, 版权所有@侵权必究
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'layout',
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
  .header {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 60px;
    border-bottom: 1px solid #ddd;
  }
  .sidebar {
    position: absolute;
    left: 0;
    top: 61px;
    width: 260px;
    bottom: 0;
    border-right: 1px solid #ddd;
  }
  .content {
    position: absolute;
    top: 61px;
    right: 0;
    left: 261px;
    bottom: 0;
    overflow: auto;
  }
  .body {
    min-height: calc(100% - 75px);
    padding: 12px 12px;
  }
  .footer {
    height: 50px;
    border-top: 1px solid #eee;
    text-align: center;
    margin: 0 12px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 12px;
    color: #999;
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