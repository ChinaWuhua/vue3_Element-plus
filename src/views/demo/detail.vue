<template>
  <div class="detail">
    <div class="block-title">
      <span>{{text}}详情</span>
      <el-button 
        size="mini" 
        icon="el-icon-back"
        @click="$router.go(-1)">返回</el-button>
    </div>
    <el-empty description="暂无数据"></el-empty>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'detail',
  computed: {
    text(): any {
      return this.$route?.query?.text
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  }
});
</script>

<style scoped>
.block-title {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>