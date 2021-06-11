<template>
  <div class="goodlist-add">
    <h3>新增商品</h3>
    <el-divider></el-divider>
    <div style="max-width: 400px;">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="120px"
      >
        <el-form-item label="商品分类" prop="ProductTypeId">
          <div class="treeChose">
            <el-input v-model="form.ProductTypeId" readonly></el-input>
            <tree-input />
          </div>
        </el-form-item>
        <el-form-item label="商品名称" prop="ProductName">
          <el-input v-model="form.ProductName" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="Price">
          <el-input v-model="form.Price" maxlength="20" type="number"></el-input>
        </el-form-item>
        <el-form-item label="打折前价格" prop="PriceOrigin">
          <el-input v-model="form.PriceOrigin" maxlength="20" type="number"></el-input>
        </el-form-item>
        <el-form-item label="规格书链接" prop="Specification">
          <el-input type="textarea" :rows="2" v-model="form.Specification"></el-input>
        </el-form-item>
        <el-form-item label="操作手册链接" prop="OperationManual">
          <el-input type="textarea" :rows="2" v-model="form.OperationManual"></el-input>
        </el-form-item>
        <el-form-item label="产品特色链接" prop="ProductFeature">
          <el-input type="textarea" :rows="2" v-model="form.ProductFeature"></el-input>
        </el-form-item>
        <el-form-item label="产品特色链接" prop="ProductFeature">
          <el-input type="textarea" :rows="2" v-model="form.ProductFeature"></el-input>
        </el-form-item>
        <el-form-item label="长" prop="Length">
          <el-input v-model="form.Length" maxlength="20" type="number"></el-input>
        </el-form-item>
        <el-form-item label="宽" prop="Width">
          <el-input v-model="form.Width" maxlength="20" type="number"></el-input>
        </el-form-item>
        <el-form-item label="高" prop="Height">
          <el-input v-model="form.Height" maxlength="20" type="number"></el-input>
        </el-form-item>
        <el-form-item label="重" prop="Weight">
          <el-input v-model="form.Weight" maxlength="20" type="number"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :disabled="loading"
          >保存</el-button>
          <el-button 
            :disabled="loading"
            @click="() => {$router.go(-1)}"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import api from "@/api/Goodslist";
import treeInput from '@/components/TreeInput/index'
export default {
  components: {
    treeInput
  },
  data() {
    return {
      loading: false,
      rules: {
        ProductName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        ProductTypeId: [
          { required: true, message: "请选择商品类型", trigger: "change" },
        ]
      },
      form: {
        ProductName: '',
        ProductTypeId: 'aaaa',
        Price: '',
        PriceOrigin: '',
        BrandName: '',
        Specification: '',
        OperationManual: '',
        ProductFeature: '',
        Length: '',
        Width: '',
        Height: '',
        Weight: '',
      }
    };
  },
  methods: {
    onSubmit() {

    }
  }
};
</script>


<style scoped>
  .treeChose {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>