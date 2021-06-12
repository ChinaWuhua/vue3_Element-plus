<template>
  <div class="GoodsSuit-detail">
    <h3>{{ $route?.params?.data ? '修改套装' : '新增套装' }}</h3>
    <el-divider></el-divider>
    <div style="max-width: 600px;" v-loading="loading">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="120px"
      >
        <el-form-item label="套装名称" prop="ProductTogetherName">
          <el-input v-model="form.ProductTogetherName" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="套装商品" prop="Products">
          <div class="goods-chose">
            <div class="goods-list" v-for="(item, index) in form.Products" :key="'goods-' + index">
              <div class="goods-name">
                <p class="goods-name-text">{{item.ProductName}}</p>
                <p class="goods-name-uuid">uuid: {{item.Uuid || item.ProductId}}</p>
              </div>
              <el-input style="width: 100px;" v-model="item.Quantity" type="number"></el-input>
              <el-button type="danger" icon="el-icon-delete" style="margin-left: 12px;" @click="drop(index)"></el-button>
            </div>
            <div style="text-align: center; margin-top: 12px;">
              <el-button 
                type="primary" 
                icon="el-icon-plus" 
                v-if="form.Products.length < 5" 
                @click="dialogVisible = true">添加商品</el-button>
            </div>
          </div>
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
    <el-dialog
      title="商品列表"
      v-model="dialogVisible"
      :width="panelWidth">
      <goods-list @chose-goods="choseGoods" />
    </el-dialog>
  </div>
</template>

<script>
import goodsList from './goods.vue'
import api from "@/api/GoodsSuit";

export default {
  components: {
    goodsList
  },
  computed: {
    panelWidth() {
      let clientWidth = document.body.clientWidth;
      return clientWidth > 800 ? '800px' : '80%'
    }
  },
  data() {
    return {
      loading: false,
      form: {
        ProductTogetherName: '',
        Products: [],
      },
      rules: {
        ProductTogetherName: [
          { required: true, message: "请输入套装名称", trigger: "blur" },
        ],
        Products: [
          { required: true, message: "请至少选择一件商品", trigger: "change" },
        ]
      },
      dialogVisible: false,
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
    drop(index) {
      this.form.Products.splice(index, 1)
    },
    choseGoods(goods) {
      this.dialogVisible = false
      if (!this.form.Products.find(item => item.Uuid === goods.Uuid)) {
        this.form.Products.push({...goods, Quantity: 1})
      } else {
        this.$message.info('该商品已存在，已自动将数量加一')
        this.form.Products.forEach(item => {
          if (item.Uuid === goods.Uuid) {
            item.Quantity += 1
          }
        })
      }
    },
    onSubmit() {
      this.$refs.form.validate((pass) => {
        if (pass) {
          this.loading = true
          let params = {
            ProductTogetherName: this.form.ProductTogetherName,
            Products: []
          }

          this.form.Products.forEach(item => {
            params.Products.push({
              ProductId: item.Uuid || item.ProductId,
              Quantity: item.Quantity * 1
            })
          })

          if (this.form.Uuid) {
            this.update({...params, Uuid: this.form.Uuid})
          } else {
            this.add(params)
          }
        }
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
    }
  }
};
</script>


<style scoped>
  .goods-chose {
    padding: 12px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .goods-list {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 12px;
    border-bottom: 1px dashed #ddd;
  }
  .goods-list:hover {
    background: #f6f6f6;
  }
  .goods-name {
    margin-right: 12px;
  }
  .goods-name-text {
    font-size: 14px;
    line-height: 14px;
    color: #333;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .goods-name-uuid {
    margin-top: 6px;
    font-size: 12px;
    line-height: 12px;
    color: #999;
  }
</style>