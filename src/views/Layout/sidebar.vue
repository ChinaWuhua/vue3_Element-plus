<template>
  <div class="sidebar">
    <el-button>默认按钮</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'side-item',
  data() {
    return {
      sideData: [
        {label: '首页'}
      ]
    }
  }
})
</script>

