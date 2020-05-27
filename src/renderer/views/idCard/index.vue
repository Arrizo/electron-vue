
<template>
<div>
<common>
  <div slot="slot-header">
         <header-title :headerTitle="'身份证扫描'"></header-title>
  </div>
  <div slot="slot-main">
    <div>
      <div class="warp-doc">
        <h1 class="type-file">证件种类:</h1>
        <h1 class="type-file"><el-radio v-model="checkFile" label="1">居民身份证</el-radio></h1>
      </div>
    <el-row class="main-conent">
      <el-col :span='10'>
        <div class="type-file" style="margin-left:50px;">
  <div class="el-dropdown-link">
    已扫描的身份证:
  </div>
      <el-select v-model="idname">
        <el-option v-for="(items,indexs) in subForm.idCardPerson" @click.native='showIdCardInfo(indexs)' :key="items+indexs" :label="items.name" :value="indexs"></el-option>
      </el-select>

        </div>

      </el-col>
      <el-col :span='14'>
        <div class="camere">
          <div class="camere-1">
          <span>扫描身份证</span>
         <div @click="personScan"><i >点击扫描</i></div>
            </div>
        </div>
      </el-col>
    </el-row>
    </div>
  </div>
  <div slot="slot-footer">
              <el-button  size="medium" @click="$router.push({path:'filescanner'})">返回</el-button>
              <el-button type="primary" size="medium" @click="scanNext()">下一步</el-button>
  </div>
</common>
<!-- 扫描数据 -->
<el-dialog title="信息详情" v-if="dialogFormInfo" width='600px' :visible.sync="dialogFormInfo" :modal='false' :close-on-click-modal='false' :show-close="false">
  <el-form  :rules="formRules" :model="subForm" ref="idCardForm" size="medium"> 
    <el-form-item label="姓 名："  prop="idCardPerson.name" :show-message="false" class="id-input-size">
      <el-input v-model="subForm.idCardPerson[idIndex].name"></el-input>
    </el-form-item>
    <el-form-item label="证件种类：" prop="idCardPerson.cardType" :show-message="false">
    <el-select v-model="subForm.idCardPerson[idIndex].cardType">
    <el-option v-for="(item,index) in cardType" :label="item.label" :key="item+index" :value="item.value"></el-option>
  </el-select>
    </el-form-item>
    <el-form-item label="证件号码：" prop="idCardPerson.cardNumber" :show-message="false" class="id-input-size">
      <el-input v-model="subForm.idCardPerson[idIndex].cardNumber"></el-input>
    </el-form-item>
    <el-form-item label="证件有限期：" prop="idCardPerson.cardTermDate" :show-message="false">
    <el-date-picker type="date" placeholder="选择成立日期" v-model="subForm.idCardPerson[idIndex].cardTermDate" 
    value-format="yyyyMMdd" format="yyyy-MM-dd" @change="subForm.idCardPerson[idIndex].cardTermDate=$event">
  </el-date-picker>
    </el-form-item>
    <el-form-item label="联系地址：" prop="idCardPerson.cardAddress" :show-message="false" class="id-input-size">
      <el-input v-model="subForm.idCardPerson[idIndex].cardAddress"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button  @click="cancleidCardFomr" size="medium">删除</el-button>
    <el-button type="primary" @click="dialogFormInfo = false" size="medium">确定</el-button>
  </div>
</el-dialog>
<net-dialog :dialog="dialogCard" :dialogTitle="'请至少扫描两张身份证'">
  <div slot="dialog-button"> <el-button type="danger" size="medium" @click="dialogCard=false">确 定</el-button></div>
</net-dialog>
</div>
</template>
<script>
import { readIdCard } from '@/utils/idCard'
import common from '../components/common'
import HeaderTitle from '../components/HeaderTitle'
import NetDialog from '../components/Netdialog'
import product from '@/json/bocPro.json'
import { mapGetters } from 'vuex'
export default {
  name: 'FileScanner',
  components: { HeaderTitle, common, NetDialog },
  props: {},
  data() {
    return {
      idIndex: 0,
      idname: '',
      dialogFormInfo: false,
      dialogCard: false,
      checkFile: '1',
      formRules: {
        'idCardPerson.name': [
          { required: true, trigger: 'blur' }
        ],
        'idCardPerson.cardType': [
          { required: true, trigger: 'blur' }
        ],
        'idCardPerson.cardNumber': [
          { required: true, trigger: 'blur' }
        ],
        'idCardPerson.cardTermDate': [
          { required: true, trigger: 'change' }
        ],
        'idCardPerson.cardAddress': [
          { required: true, trigger: 'blur' }
        ]
      },
      cardType: product.cardType,
      idCardForm: {
        cardType: 1,
        name: '',
        cardNumber: '',
        telephone: '',
        birthday: '',
        country: 'CN',
        cardTermDate: '',
        // 网银对账人（1-是，0-不是）
        reconciliation_contacts: '0',
        // 电子回单箱（1-是，0-不是）
        receiptBox: '0',
        // 对账联系人
        onlineBankReconciliation: '0',
        // 短信接收人
        smsRecipient: '0',
        // 主卡持有人
        cardHolder: '0',
        // 网银经办人/授权人
        onlineBankIdentity: '0',
        // 授权书项目
        authorizationItems: ['A', 'B'],
        // 其他
        authorizationOtherContent: '',
        isPartner: '',
        shareholdings: '',
        personStatus: [],
        cardAddress: ''
      }
    }
  },

  computed: {
    ...mapGetters([
      'subForm'
    ])
  },
  methods: {
    // subFormidCard(form) {
    //   this.$refs[form].validate((vali) => {
    //     if (vali) {
    //       alert(1)
    //     } else {
    //       alert(2)
    //     }
    //   })
    //   this.
    // },
    showIdCardInfo(index) {
      this.idIndex = index
      this.dialogFormInfo = true
    },
    // 识别身份证
    personScan() {
      var that = this
      readIdCard((idCardData) => {
        if (idCardData.code === 0) {
          that.idCardForm.name = idCardData.data.name
          that.idCardForm.cardNumber = idCardData.data.idCardNo
          that.idCardForm.birthday = idCardData.data.birthday
          that.idCardForm.cardAddress = idCardData.data.address
          console.log('身份证返回', idCardData)
          that.idCardForm.cardTermDate = idCardData.data.expireDateEnd === '长期--' ? '20991231' : idCardData.data.expireDateEnd
          that.idIndex = that.subForm.idCardPerson.push(JSON.parse(JSON.stringify(that.idCardForm))) - 1
          that.dialogFormInfo = true
        } else {
          that.$alert(idCardData.msg)
        }
        console.log(this.subForm.idCardPerson)
      })
    },
    cancleidCardFomr() {
      this.subForm.idCardPerson.pop()
      this.dialogFormInfo = false
    },
    scanNext() {
      if (this.subForm.idCardPerson.length > 1) {
        this.dialogCard = false
        this.$router.push({ path: 'open' })
      } else {
        this.dialogCard = true
      }
    }
  }

}
</script>
<style lang="scss" scoped>
/deep/
.home-container .home-warp{
  width: 1000px !important;
}
.main-conent{
  margin: 110px auto 150px;;
}
.home-warp .el-footer{
  background: #fff !important;
  padding-bottom: 10px;
}
.type-file{
  margin: 10px auto;
  font-size: 28px;
  font-family:SimHei;
  color: #666666;
}
.camere{
  div.camere-1{
      margin: 0 auto;
     div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 280px;
    height: 248px;
    border-radius: 10px;
    border: 2px dotted #2479EC;
    i{
      background: #E9F1FD;
      width:110px;
      height: 110px;
      font-size: 16px;
      font-style: normal;
      color: #409EFF;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
    }
      }
  span{
    display: inline-block;
    color: #666;
    font-size: 14px;
    margin-bottom: 14px;
  }
a{
    color: #409EFF;
    margin-left: 54px;
    font-size: 14px;
    &:hover{
      text-decoration: underline;
    }
}
  }
}
/deep/.id-input-size{
  .el-form-item__content{
    display: inline-block;
    width: 80%;
  }
}
.warp-doc{
    margin-left: 47px;
    margin-top: 57px;
}
.el-dropdown-link{
  font-size: 18px;
  font-style: normal;
  margin-bottom: 10px;
}
</style>