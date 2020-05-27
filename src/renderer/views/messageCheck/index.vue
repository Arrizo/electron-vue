<template>
<div>
  <common>
  <div slot="slot-header">
         <header-title :headerTitle="'开户信息复核'"></header-title>
  </div>
  <div slot="slot-main">
          <div >
    <el-tabs v-model="activeName">
    <el-tab-pane label="开户单位基本信息" name="first">
      <el-form :inline="true" size='medium' :model="subForm" :rules="formRules" ref="chenRef">
        <el-row class="check-info">
        <el-col :span="8">
        <el-form-item label="开户币种:" prop="enter.currencyType" :show-message="false">
        <el-select v-model="subForm.enter.currencyType">
      <el-option v-for="(item,indexs) in currencys" :value="item.value" :key="indexs+'index'" :label='item.label'></el-option>
      </el-select>
        </el-form-item>
        </el-col>
             <el-col :span="8">
        <el-form-item label="开户类型:" prop="enter.accountType" :show-message="false">
        <el-select v-model="subForm.enter.accountType">
      <el-option v-for="(item,indexs) in accountType" :label="item.label" :value="item.value" :key="indexs+'index'" ></el-option>
      </el-select>
        </el-form-item>
        </el-col>
            <el-col :span="8">
        <el-form-item label="存款人类别:" prop="enter.depositPeopleType" :show-message="false">
        <el-select v-model="subForm.enter.depositPeopleType" placeholder="请选择存款人类型">
        <el-option v-for="item in depositPeopleType" :value="item.value" :key="item.value" :label='item.label'></el-option>
      </el-select>
        </el-form-item>
            </el-col>
        </el-row>
        <el-row class="check-info">
        <el-col :span="8">
        <el-form-item label="行业分类:" prop="enter.tradeType" :show-message="false">
        <el-select v-model="subForm.enter.tradeType" placeholder="请选择国标行业类型" >
          <el-option v-for="item in tradeType" :value="item.value" :key="item.value" :label='item.label'></el-option>
        </el-select>
        </el-form-item>
        </el-col>
             <el-col :span="8">
        <el-form-item label="企业类型:" prop="enter.enterpriseType" :show-message="false">
     <el-select v-model="subForm.enter.enterpriseType" placeholder="请选择企业类型">
        <el-option v-for="item in enterpriseType" :value="item.value" :key="item.value" :label='item.label'></el-option>
      </el-select>
        </el-form-item>
        </el-col>
            <el-col :span="8">
        <el-form-item label="统一社会信用代码:" prop="enter.creditCode" :show-message="false">
          <el-input v-model="subForm.enter.creditCode" @keyup.native="(subForm.enter.creditCode)=(subForm.enter.creditCode).replace(/[^\da-zA-Z]*$/g,'')"></el-input>
        </el-form-item>
            </el-col>
        </el-row>
        <el-row class="check-info">
          <el-col :span="8">
        <el-form-item label="企业名称:" prop="enter.enterpriseName" :show-message="false">
          <el-input v-model="subForm.enter.enterpriseName"></el-input>
        </el-form-item>
        </el-col>
          <el-col :span="8">
        <el-form-item label="法定代表人:" prop="enter.legalPersonName" :show-message="false">
          <el-input v-model="subForm.enter.legalPersonName"></el-input>
        </el-form-item>
        </el-col>
          <el-col :span="8">
    <el-form-item label="注册资本：" prop="enter.registeredCapital" :show-message="false">
      <el-input v-model="subForm.enter.registeredCapital"></el-input>
    </el-form-item>
      </el-col>
        </el-row>
        <el-row class="check-info">
        <el-col :span="7">
   <el-form-item label="成立日期：" prop="enter.establishmentDate" :show-message="false">
    <el-date-picker type="date" placeholder="选择成立日期" v-model="subForm.enter.establishmentDate" 
    value-format="yyyyMMdd" format="yyyy-MM-dd" @change="subForm.enter.establishmentDate=$event">
  </el-date-picker>
    </el-form-item>
      </el-col>
      <el-col :span="10">
 <el-form-item class="form-item2" label="营业期限" prop="term" :show-message="false">
        <el-date-picker v-model="subForm.term" type="daterange" unlink-panels range-separator="至"
        start-placeholder="开始日期" end-placeholder="结束日期" @blur="resolveTerm" 
        value-format="yyyyMMd" format="yyyy-MM-dd" @change="subForm.term=$event">
      </el-date-picker>
    </el-form-item>
      </el-col>
           <el-col :span="7">
        <el-form-item label="登记机关:" prop="enter.registrationAuthority" :show-message="false">
          <el-input  v-model="subForm.enter.registrationAuthority"></el-input>
        </el-form-item>
           </el-col>
        </el-row>
        <el-row class="check-info">
        <el-col :span="12">
    <el-form-item label="核准日期："  prop="enter.approvalDate" :show-message="false">
    <el-date-picker type="date" placeholder="选择核准日期" v-model="subForm.enter.approvalDate" value-format="yyyyMMdd" format="yyyy-MM-dd" @change="subForm.enter.approvalDate=$event">
        </el-date-picker>
    </el-form-item >
        </el-col>
        <el-col :span="12">
    <el-form-item label="登记状态：" prop="enter.registrationStatus" :show-message="false">
      <el-input v-model="subForm.enter.registrationStatus"></el-input>
    </el-form-item>
        </el-col>
        </el-row>
        <div  class="full-input">
      <el-form-item class="form-item2" label="住址" prop="enter.registeredAddress" :show-message="false">
        <el-input v-model="subForm.enter.registeredAddress" ></el-input>
      </el-form-item>
        </div>
        <div class="full-input">
    <el-form-item label="经营范围：" prop="enter.operationScope" class='input-size-80' :show-message="false">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="subForm.enter.operationScope"></el-input>
    </el-form-item>
        </div>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="开户单位成员信息" name="second">
      <el-table border :data="subForm.idCardPerson"  highlight-current-row size='medium'> 
        <el-table-column label="序号" type="index"  align='center' ></el-table-column>
        <el-table-column label="证件类型" prop='cardType'  align='center'>
        <template slot-scope="scope">{{ changeCardType(scope.row.cardType,1)}}
        </template>
        </el-table-column>
        <el-table-column label="证件号码" prop='cardNumber'  align='center'></el-table-column>
        <el-table-column label="证件有限期" prop='cardTermDate'  align='center'></el-table-column>
        <el-table-column label="姓名" prop='name'  align='center'></el-table-column>
        <el-table-column label="出生日期" prop='birthday'  align='center'></el-table-column>
        <el-table-column label="身份" prop='personStatus'  align='center'>
          <template slot-scope="scope">{{changeCardType(scope.row.personStatus,2)}}</template>
        </el-table-column>
        <el-table-column label="电话号码" prop='telephone'  align='center'></el-table-column>
        <el-table-column label="持股比例" prop='shareholdings'  align='center'>
          <template slot-scope="scope">{{scope.row.shareholdings+'%'}}</template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="开户产品信息" name="third">
    <el-row :gutter="20"  class="list-row">
    <el-col :span="6" v-for="(item,index) in productItem" :key="item+index">
      <el-card>
        <div slot="header" class="clearfix"><el-checkbox disabled v-model="stateProductList[index]" >{{item.header}}</el-checkbox></div>
        <div>
          <h3 class="card-title">{{item.title}}</h3>
          <div class="card-content">
          我已仔细阅读<span>{{item.content}}</span>，同意协议中的有关条款，充分了解银行和自身的权利和义务。
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
    </el-tab-pane>
  </el-tabs>
  </div>
  </div>
  <div slot="slot-footer">
  <el-button type="primary" size="medium" @click="$router.push({path:'open'})">返 回</el-button>
  <el-button type="primary" size="medium" @click="submitForm">确认提交</el-button>
  </div>
</common>
<el-dialog :visible.sync="dialogSucces" center :close-on-click-modal='false' :show-close='false'>
    <el-row>
      <el-col :span="24" class="success">
        <img src="../../assets/img/logo/success.png" alt="">
        <!-- <h3>{{number}}</h3> -->
      </el-col>
    </el-row>
  <span slot="footer" class="content-dialog">
   <el-button type="primary" size="medium" @click="resetBack">返回首页</el-button>
</span>
</el-dialog>
</div>
</template>
<script>
import HeaderTitle from '../components/HeaderTitle'
import common from '../components/common'
import product from '@/json/bocPro.json'
import { mapGetters } from 'vuex'
import { saveAccount } from '@/api/open'
export default {
  name: 'Message',
  data() {
    return {
      number: '',
      dialogSucces: false,
      checkedList: new Array(8).fill(false),
      depositPeopleType: product.depositPeopleType,
      currencys: product.currencys,
      accountType: product.accountType,
      productItem: product.productList,
      tradeType: product.tradeType,
      enterpriseType: product.enterpriseType,
      activeName: 'first',
      formRules: {
        'enter.docType': [
          { required: true, trigger: 'blur' }
        ],
        'enter.currencyType': [
          { required: true, trigger: 'blur' }
        ],
        'enter.creditCode': [
          { required: true, trigger: 'blur' }
        ],
        'enter.enterpriseType': [
          { required: true, trigger: 'change' }
        ],
        'enter.depositPeopleType': [
          { required: true, trigger: 'blur' }
        ],
        'enter.accountType': [
          { required: true, trigger: 'blur' }
        ],
        'enter.tradeType': [
          { required: true, trigger: 'blur' }
        ],
        'enter.enterpriseName': [
          { required: true, trigger: 'blur' }
        ],
        'enter.establishmentDate': [
          { required: true, trigger: 'change' }
        ],
        'enter.registeredCapital': [
          { required: true, trigger: 'blur' }
        ],
        'enter.legalPersonName': [
          { required: true, trigger: 'blur' }
        ],
        'enter.registrationAuthority': [
          { required: true, trigger: 'blur' }
        ],
        'term': [
          { required: true, trigger: 'blur' }
        ],
        'enter.registrationStatus': [
          { required: true, trigger: 'blur' }
        ],
        'enter.addressCode': [
          { required: true, trigger: 'blur' }
        ],
        'enter.postCode': [
          { required: true, trigger: 'blur' }
        ],
        'enter.approvalDate': [
          { required: true, trigger: 'change' }
        ],
        'enter.registeredAddress': [
          { required: true, trigger: 'blur' }
        ],
        'enter.operationScope': [
          { required: true, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'subForm',
      'stateProductList'
    ])
  },
  methods: {
    resolveTerm() { // 营业期限赋值
      this.subForm.enter.businessStartDate = this.subForm.term[0]
      this.subForm.enter.businessEndDate = this.subForm.term[1]
    },
    // 提交表单
    submitForm() {
      this.$refs.chenRef.validate((valid) => {
        if (valid) {
          this.$confirm('是否提交信息?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.subForm.enter.busySeason = this.subForm.enter.busySeason.join(',');
            (this.subForm.idCardPerson).forEach((item, index) => {
              item.authorizationItems = item.authorizationItems.join(',')
              item.personStatus = item.personStatus.join(',')
            })
            saveAccount(this.subForm).then(res => {
              if (res.code === 0) {
                this.number = res.result.reservationNum
                this.dialogSucces = true
              } else {
                this.$alert(res.msg)
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交'
            })
          })
        } else {
          this.$alert('请完善基本信息！！')
        }
      })
    },
    resetBack() {
      this.$store.commit('RESET_FORM')
      this.dialogSucces = false
      this.$router.push({ path: 'dashboard' })
    },
    changeCardType(value, index) {
      var Value = ''
      if (index === 1) {
        product.cardType.find((item, index) => {
          if (item.value === value) {
            Value = item.label
          }
        })
      } else if (index === 2) {
        product.isPartner.find((item, index) => {
          value.forEach((x) => {
            if (item.value === x) {
              Value += item.label + '，'
            }
          })
        })
      }
      return Value
    }
  },
  watch: {
    $route(to, from) {
      this.$forceUpdate()
    }
  },
  components: {
    HeaderTitle,
    common
  }
}
</script>
<style lang='scss' scoped>
/deep/.home-container .home-warp{
  width: 1210px;
}
/deep/
.el-tabs__nav-scroll{
.el-tabs__nav{
  width: 100%;
  .el-tabs__item {
    text-align: center;
    // color: #fff;
    width: 33%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    // background: #409EFF;
    &.is-active{
      // background-color: #fff;
      color: #2479EC;
    }
  }
}
}
/deep/.full-input{
  .el-form-item{
    width: 100%;
    .el-form-item__content{
      width: 80%
    }
  }
}
  /deep/.list-row .el-col-6{
   min-height: 190px;
   margin-bottom: 10px;
 }
  /deep/.el-card {
   .card-title{
       margin: 0px;
    margin-bottom: 12px;
    font-weight: lighter;
    font-size: 14px;
    text-align: center;
    color: #666;
   }
   .card-content{
     color: #666;
     font-size: 14px;
     span{
       color: #2479EC;
       font-family: inherit;
     }
   }
   .el-card__header{
  padding: 10px 20px;
  text-align: center;
}
 }
 .success{
   position: relative;
   img{
     max-width: 100%;
     max-height: 100%;
   }
   h3{
     position: absolute;
      left: 378px;
    top: 248px;
    color: #2479EC;
   }
 }
 .check-info{
   margin-top: 20px;
 }
</style>