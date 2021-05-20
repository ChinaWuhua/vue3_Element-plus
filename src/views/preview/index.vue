<template>
  <div class="preview">
    <el-button @click="screenShot">截图</el-button>
    <div id="preview" style="margin: 20px 0 0 0;" v-loading="loading">
      <!-- <video src="https://www.w3school.com.cn/i/movie.ogg" controls></video> -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import previewAct from '@/utils/preview'
export default defineComponent({
  name: 'preview',
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    screenShot() {
      this.loading = true
      let display = document.getElementById('preview')
      let content = document.body
      let cover = '水印文字'
      let obj = new previewAct({display, content, cover});
      if (obj) {
        obj.init()
      }
      setTimeout(() => {
        this.loading = false
      }, 1500)
    }
  }
});
</script>


<style scoped>
</style>