<template>
<common>
  <div slot="slot-header">
         <header-title :headerTitle="'选择开户类型'"></header-title>
  </div>
  <div slot="slot-main">
      <el-form :rules="rulesForm" :model="subForm" ref="doshref" size="medium">
            <el-form-item label='开户币种：'  prop="enter.currencyType" :show-message="false">
           <el-select v-model="subForm.enter.currencyType">
            <el-option v-for="item in currencys" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
            </el-form-item>
            <el-form-item label="企业类型：" prop="enter.enterpriseType" :show-message="false">
            <el-select v-model="subForm.enter.enterpriseType" placeholder="请选择企业类型">
        <el-option v-for="item in enterpriseType" :value="item.value" :key="item.value" :label='item.label'></el-option>
      </el-select>
        </el-form-item>
            <el-form-item label='开户类型：'>
           <el-radio-group size="medium" v-model="subForm.enter.accountType">
                <el-radio-button v-for="(item,index) in accountType" :label="item.value" :key="item+index">{{item.label}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
  </div>
  <div slot="slot-footer">
     <el-button type="primary" size="medium" @click="next">下一步</el-button>
  </div>
</common>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderTitle from '../components/HeaderTitle'
import common from '../components/common'
import product from '@/json/bocPro.json'
export default {
  name: 'Dashboard',
  components: { HeaderTitle, common },
  computed: {
    ...mapGetters([
      'subForm'
    ])
  },
  data() {
    return {
      accountType: product.accountType,
      enterpriseType: product.enterpriseType,
      currencys: product.currencys,
      rulesForm: {
        'enter.enterpriseType': [
          { required: true, trigger: 'change' }
        ],
        'enter.currencyType': [
          { required: true, trigger: 'change' }
        ]
      }
    }
  },

  methods: {
    next() {
      this.$refs.doshref.validate((valid) => {
        if (valid) {
          this.$router.push({ path: 'filescanner' })
        } else {
          this.$alert('请完善开户类型！')
        }
      })
    }
  },
  mounted() {
  }
}
</script>
<style lang='scss' scoped>
/deep/.home-container .home-warp{
  width: 1100px;
}
/deep/ .el-form-item{
 margin: 70px auto;
}
</style>
