<template>
  <div class="preview">
    <div class="input">
      <el-input v-model="coverText" />
      <el-button @click="screenShot" style="margin-left: 10px;">预览</el-button>
      <el-button @click="reset" style="margin-left: 10px;">清空</el-button>
    </div>
    <div id="preview" style="margin: 20px 0 0 0;" v-loading="loading">
      sdada
      <img  src="https://pic1.zhimg.com/80/v2-62e63848290f66468d2d671b18d3be23_720w.jpg?source=1940ef5c" alt="test">
      <div style="height: 1000px"></div>
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
      coverText: '',
      source: ''
    }
  },
  methods: {
    reset() {
      this.coverText = ''
      document.getElementById('preview').innerHTML = this.source
    },
    screenShot() {
      this.loading = true
      let content = document.getElementById('preview')
      let cover = this.coverText || '水印文字'
      let obj = new previewAct({ content, cover});
      if (obj) {
        this.source = content.innerHTML
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
.input {
  display: flex;
  justify-content: space-between;
}
</style>