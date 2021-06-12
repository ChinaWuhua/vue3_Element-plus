<template>
  <div class="goodlist-add">
    <h3>{{ $route?.params?.data ? '修改商品' : '新增商品' }}</h3>
    <el-divider></el-divider>
    <div style="max-width: 400px;" v-loading="loading">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="120px"
      >
        <el-form-item label="商品分类" prop="ProductTypeId">
          <div class="treeChose">
            <el-input v-model="form.ProductTypeName" readonly></el-input>
            <tree-input @tree-chose="treeChose" />
          </div>
        </el-form-item>
        <el-form-item label="商品名称" prop="ProductName">
          <el-input v-model="form.ProductName" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" prop="BrandName">
          <el-input v-model="form.BrandName" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="价格1" prop="Price">
          <el-input v-model="form.Price1" maxlength="20" type="number"></el-input>
        </el-form-item>
        <el-form-item label="价格2" prop="Price">
          <el-input v-model="form.Price2" maxlength="20" type="number"></el-input>
        </el-form-item>
        <el-form-item label="价格3" prop="Price">
          <el-input v-model="form.Price3" maxlength="20" type="number"></el-input>
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
import api from "@/api/Goodslist";
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
        ProductTypeName: '',
        BrandName: '',
        ProductTypeId: '',
        Price1: 0,
        Price2: 0,
        Price3: 0,
        Specification: '',
        OperationManual: '',
        ProductFeature: '',
        Length: 0,
        Width: 0,
        Height: 0,
        Weight: 0,
      }
    };
  },
  mounted() {
    this.initForm()
  },
  methods: {
    initForm() {
      let params = this.$route?.params
      if (params.data) {
        let data = JSON.parse(params.data)
        for (let item in data) {
          this.form[item] = data[item]
        }
      }
    },
    treeChose(data) {
      this.form.ProductTypeName = data.Name
      this.form.ProductTypeId = data.Uuid
    },
    onSubmit() {
      this.$refs.form.validate((pass) => {
        if (pass) {
          this.loading = true
          let params = {
            ProductName: this.form.ProductName,
            ProductTypeId: this.form.ProductTypeId,
            BrandName: this.form.BrandName,
            Price1: this.form.Price1 * 1,
            Price2: this.form.Price2 * 1,
            Price3: this.form.Price3 * 1,
            Specification: this.form.Specification,
            OperationManual: this.form.OperationManual,
            ProductFeature: this.form.ProductFeature,
            Length: this.form.Length * 1,
            Width: this.form.Width * 1,
            Height: this.form.Height * 1,
            Weight: this.form.Weight * 1,
          }
          if (this.form.Uuid) {
            this.update({...params, Uuid: this.form.Uuid})
          } else {
            this.add(params)
          }
        }
      })
    },
    add(params) {
      api
        .add(params)
        .then(res => {
          this.loading = false
          if (res.status === 200) {
            this.$message.success(res.msg)
            this.$router.go(-1)
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(err => {
          console.log('--fail--', err)
          this.$message.error(err.msg)
          this.loading = false
        })
    },
    update(params) {
      api
        .update(params)
        .then(res => {
          this.loading = false
          if (res.status === 200) {
            this.$message.success(res.msg)
            this.$router.go(-1)
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(err => {
          console.log('--fail--', err)
          this.$message.error(err.msg)
          this.loading = false
        })
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