<template>
<div>
<common>
  <div slot="slot-header">
    <header-title :headerTitle="headerTitle"></header-title>
  </div>
  <div slot="slot-main">
    <el-form :inline="true" size='medium' v-show="personInfo===0" :rules="legRules" :model="subForm" ref='legForm' class='accout-form'>
    <el-form-item label="文件种类：" prop="enter.docType" :show-message="false" class="form-size">
      <el-select v-model="subForm.enter.docType" placeholder="请选择文件种类">
      <el-option v-for="(item,indexs) in docType" :value="item.value" :key="indexs+'index'" :label='item.label'></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="统一代码：" prop="enter.creditCode" :show-message="false" class="form-size">
      <el-input placeholder="请输入统一信用代码" v-model="subForm.enter.creditCode" @keyup.native="(subForm.enter.creditCode)=(subForm.enter.creditCode).replace(/[^\da-zA-Z]*$/g,'')"></el-input>
    </el-form-item>
      <el-form-item label="企业名称：" prop="enter.enterpriseName" :show-message="false" class="form-size">
      <el-input v-model="subForm.enter.enterpriseName"></el-input>
    </el-form-item>
    <el-form-item label="成立日期：" prop="enter.establishmentDate" :show-message="false" class="form-size">
    <el-date-picker type="date" placeholder="选择成立日期" v-model="subForm.enter.establishmentDate" 
      format='yyyy-MM-dd' value-format='yyyyMMdd' @change="subForm.enter.establishmentDate=$event">
  </el-date-picker>
    </el-form-item>
    <el-form-item label="注册资本：" prop="enter.registeredCapital" :show-message="false" class="form-size">
      <el-input v-model="subForm.enter.registeredCapital" @keyup.native="(subForm.enter.registeredCapital)=(subForm.enter.registeredCapital).replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/,'$1') "></el-input>
    </el-form-item>
    <el-form-item label="登记机关：" prop="enter.registrationAuthority" :show-message="false" class="form-size">
      <el-input v-model="subForm.enter.registrationAuthority"></el-input>
    </el-form-item>
    <el-form-item label="登记状态：" prop="enter.registrationStatus" :show-message="false" class="form-size">
      <el-input v-model="subForm.enter.registrationStatus"></el-input>
    </el-form-item>
    <el-form-item label="核准日期：" prop="enter.approvalDate" :show-message="false" class="form-size">
    <el-date-picker type="date" placeholder="选择核准日期" v-model="subForm.enter.approvalDate" value-format="yyyyMMdd" format="yyyy-MM-dd"  @change="subForm.enter.approvalDate=$event">
        </el-date-picker>
    </el-form-item >
    <el-form-item label="注册地址：" prop="enter.registeredAddress" class='input-size-80' :show-message="false">
      <el-input v-model="subForm.enter.registeredAddress"></el-input>
    </el-form-item>
    <el-form-item label="经营范围：" prop="enter.operationScope" class='input-size-80 line' :show-message="false">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="subForm.enter.operationScope"></el-input>
    </el-form-item>
    <el-form-item label='开户类型：'>
    <el-radio-group size="medium" v-model="subForm.enter.accountType">
          <el-radio-button v-for="(item,index) in accountType" :label="item.value" :key="item+index">{{item.label}}</el-radio-button>
      </el-radio-group>
    </el-form-item>
      <el-form-item  label="邮政编码：" :show-message="false" class="form-size">
    <el-input v-model="subForm.enter.postCode" @keyup.native="(subForm.enter.postCode)=(subForm.enter.postCode).replace(/[^\d]/g,'')" :maxlength="6"></el-input>
  </el-form-item>
  <el-form-item  label="年销售额：">
        <el-input v-model="subForm.enter.annualSales"></el-input>
      </el-form-item>
  <el-form-item class="form-item2" label="从业人数：">
        <el-input v-model="subForm.enter.engagedNumber"></el-input>
      </el-form-item>
  <el-form-item class="form-item2" label="是否上市：">
        <el-select  v-model="subForm.enter.listedCompany">
          <el-option label="否" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
        </el-select>
      </el-form-item>
         <el-form-item class="form-item2" label="商业旺季：">
        <el-checkbox-group v-model="subForm.enter.busySeason" ref="busySeas">
          <el-checkbox  v-for="(item,index) in 4" :label="index+1" :key="item+index">{{index+1}}</el-checkbox>
        </el-checkbox-group>
        </el-form-item>
          </el-form>

      <div v-show="personInfo===1">
    <el-tabs :stretch='true'   v-model="activeName">
    <el-tab-pane  v-for="(item,index) in subForm.idCardPerson" :key="item+index" :label="'成员'+(index+1)" :name="'tab'+index">
      <el-form size='medium' :inline='true'>
        <el-row class="id-info">
          <el-col :span="16">
          <el-form-item label="身份：" >
          <el-alert title="请选择对应身份" type="error" v-show="selectPer" class="slect" @close='selectPer=false'></el-alert>
          <el-checkbox-group v-model="item.personStatus" @change="changBox($event,index)">
            <el-checkbox v-for="(item1,indexs) in isPartner" :key="item1+indexs" :label="item1.value" >{{item1.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item> 
         <div class="muiplit">(可多选)</div>
        </el-col>

                       <el-col :span="8">
        <el-form-item label="姓名：" prop="creatCode" :show-message="false"> 
          <el-input  v-model="item.name"></el-input>
        </el-form-item>
          </el-col>
   
        </el-row>
        <el-row class="id-info">
              <el-col :span="8">
             <el-form-item label="证件有效期：" prop="creatCode" :show-message="false" class="item-time">
    <el-date-picker type="date" placeholder="选择成立日期" v-model="item.cardTermDate" 
    value-format="yyyyMMdd" format="yyyy-MM-dd" @change="subForm.enter.establishmentDate=$event">
  </el-date-picker>
    </el-form-item>
          </el-col>
          <el-col :span="8">
        <el-form-item label="住址：" prop="creatCode" :show-message="false">
          <el-input v-model="item.cardAddress"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="8">
        <el-form-item label="证件种类：">
             <el-select v-model="item.cardType" placeholder="请选择证件类型">
                  <el-option v-for="item in cardType" :value="item.value" :key="item.value" :label='item.label'></el-option>
                </el-select>
        </el-form-item>
          </el-col>
        </el-row>
        <el-row class="id-info">
          <el-col :span="8">
     <el-form-item label="证件号码：" prop="creatCode" :show-message="false">
          <el-input v-model="item.cardNumber"></el-input>
        </el-form-item>
          </el-col>
      <el-col :span="8">
        <el-form-item label="持股比例" class="item-time" >
          <el-input v-model="item.shareholdings"><template slot="append">%</template></el-input>
        </el-form-item>
        </el-col>
          <el-col :span="8">
           <el-form-item label="手机号码：" prop="creatCode" :show-message="false">
          <el-input v-model="item.telephone"></el-input>
        </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="授权书项目：" >
          <el-checkbox-group v-model="item.authorizationItems" @change="changeItem($event,index)">
            <el-checkbox label="A">A、开办手续</el-checkbox>
            <el-checkbox label="B">B、签协议</el-checkbox>
            <el-checkbox label="C">C、留印鉴</el-checkbox>
            <el-checkbox label="D">D、个人</el-checkbox>
            <el-checkbox label="C2"  :disabled="isShowSeal">公章</el-checkbox>
            <el-checkbox label="C3"  :disabled="isShowSeal">财务</el-checkbox>
            <el-checkbox label="E">E、日常办理业务</el-checkbox>
            <el-checkbox label="F">F、大额查证</el-checkbox>
            <el-checkbox label="G">G、签署非居民</el-checkbox>
            <el-checkbox label="H">H、其他选项</el-checkbox>
             <el-input v-model="item.authorizationOtherContent" class="OtherContent" :disabled="isShowOther"></el-input>
          </el-checkbox-group>
        </el-form-item>
    
      </el-form>
    </el-tab-pane>
  </el-tabs>



</div>

<div v-show="personInfo===2">
  <el-row :gutter="20" >
    <el-col :span="6" v-for="(item,index) in productItem" :key="item+index">
      <el-card>
        <div slot="header" class="clearfix" >
          <el-checkbox :disabled="index===2||index===5"  @change="selectProduct($event,index)" v-model="stateProductList[index]">{{item.header}}</el-checkbox></div>
        <div>
          <h3 class="card-title">{{item.title}}</h3>
          <div class="card-content">
          我已仔细阅读<span>{{item.content}}</span>，同意协议中的有关条款，充分了解银行和自身的权利和义务。
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
  </div>
  <div slot="slot-footer">
      <el-button  size="medium" @click="preve">上一步</el-button>
    <el-button type="primary" size="medium" @click="next">下一步</el-button>
  </div>
</common>
<!-- 企业对账 -->
  <el-dialog title="———————————————     企业对账     ——————————————" :visible.sync="productList[0]"    center :show-close='false' class="dialog-product" :close-on-click-modal='false'>
    <el-form size='medium' :rules="formRules">
        <el-form-item label="对账联系人姓名" prop="creatCode" :show-message="false">
         <el-select v-model="indexItem" >
        <el-option v-for="(item,index) in subForm.idCardPerson" :label="item.name" :key="item+index" :value="index" ></el-option>
      </el-select>
        </el-form-item>
        <el-form-item label="对账联系人手机" prop="docType">
            <el-input  v-model="(subForm.idCardPerson[indexItem]).telephone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="对账联系人电子邮箱" prop="docType">
            <el-input autocomplete="off"></el-input>
        </el-form-item> -->
    </el-form>
    <div slot="footer">
      <el-button @click="determineProduct(0,indexItem,'reconciliation_contacts','1')" type="primary">确定</el-button>
    </div>
  </el-dialog>
<!-- 企业网银 -->
    <el-dialog title="———————————————     企业网银     ——————————————" :visible.sync="productList[1]" center :show-close='false' class="dialog-product" :close-on-click-modal='false'>
    <el-form size='medium' :rules="formRules">
        <!-- <el-form-item label="企业网银客户号：" prop="docType">
            <el-input autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="企业网银授权人：" prop="docType">
          <el-select v-model="indexNetWork" clearable>
        <el-option v-for="(item,index) in subForm.idCardPerson" :label="item.name" :key="item+index" :value="index" :disabled="indexNetWork1===index"></el-option>
      </el-select>
        </el-form-item>
        <el-form-item label="企业网银经办人：" prop="docType">
       <el-select v-model="indexNetWork1" clearable>
        <el-option v-for="(item,index) in subForm.idCardPerson" :label="item.name" :key="item+index" :value="index" :disabled="index===indexNetWork"></el-option>
      </el-select>
        </el-form-item>
        <el-form-item label="网银经办人证件种类：" prop="docType">
        <el-select v-model="(subForm.idCardPerson[(indexNetWork1||0)]).cardType">
      <el-option v-for="(item,index) in cardType" :label="item.label" :key="item+index" :value="item.value"></el-option>
      </el-select>
        </el-form-item>
        <el-form-item label="网银经办人证件号码：" prop="docType">
            <el-input v-model="(subForm.idCardPerson[(indexNetWork1||0)]).cardNumber"></el-input>
        </el-form-item>
        <el-form-item label="网银经办人联系号码：" prop="docType">
            <el-input v-model="(subForm.idCardPerson[(indexNetWork1||0)]).telephone"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="determineProduct(1,indexNetWork,'onlineBankIdentity','1');determineProduct(1,indexNetWork1,'onlineBankIdentity','2')" type="primary">确定</el-button>
    </div>
  </el-dialog>
<!-- 电话网银 -->
<el-dialog title="———————————————     电话银行     ——————————————" :visible.sync="productList[2]" center :show-close='false' class="dialog-product" :close-on-click-modal='false'>
    <el-form size='medium' :rules="formRules">
        <el-form-item label="企业客户：" prop="docType">
            <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话银行密码" prop="docType">
            <el-input autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="determineProduct(2)" type="primary">确定</el-button>
    </div>
  </el-dialog>
<!-- 公司客户短信通 -->
<el-dialog title="——————————————     公司客户短信通     —————————————" :visible.sync="productList[3]" center :show-close='false' class="dialog-product" :close-on-click-modal='false'>
    <el-form size='medium' :rules="formRules">
        <!-- <el-form-item label="付款账户户名：" prop="docType">
            <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户：" prop="docType">
            <el-input autocomplete="off" class="item-input-size1"></el-input>
            <el-input autocomplete="off" class="item-input-size1"></el-input>
        </el-form-item> -->
        <el-form-item label="短信接收人：" prop="docType">
        <el-select v-model="indexMsg">
        <el-option v-for="(item,index) in subForm.idCardPerson" :label="item.name" :key="item+index" :value="index"></el-option>
      </el-select>
        </el-form-item>
        <!-- <el-form-item label="收费标准：" prop="docType">
            <el-input autocomplete="off"> <template slot="append">元/月</template></el-input>
        </el-form-item> -->
    </el-form>
    <div slot="footer">
      <el-button @click="determineProduct(3,indexMsg,'smsRecipient','1');" type="primary">确定</el-button>
    </div>
  </el-dialog>

<!-- 单位结算卡 -->
<el-dialog title="——————————————     单位结算卡     —————————————" :visible.sync="productList[4]" center :show-close='false' class="dialog-product" :close-on-click-modal='false'>
    <el-form size='medium' :rules="formRules">
      <el-row class="line-row">
        <el-col :span="16">
        <el-form-item label="对账联系人姓名：" prop="docType">
        <el-select v-model="indexContact" clearable >
        <el-option v-for="(item,index) in subForm.idCardPerson" :label="item.name" :key="item+index" :value="index" :disabled="indexContact1===index"></el-option>
      </el-select>
        </el-form-item>
        <!-- <el-form-item label="对账联系人电话：" prop="docType">
            <el-input v-model="(subForm.idCardPerson[(indexContact||0)]).telephone"></el-input>
        </el-form-item> -->
        <el-form-item label="对账联系人手机：" prop="docType">
            <el-input v-model="(subForm.idCardPerson[(indexContact||0)]).telephone"> </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="6" class="debit-card">
                主卡持有人
          </el-col>
         </el-row>
      <el-row>
        <el-col :span="16">
        <el-form-item label="对账联系人姓名：" prop="docType">
        <el-select v-model="indexContact1" clearable>
        <el-option v-for="(item,index) in subForm.idCardPerson" :label="item.name" :key="item+index" :value="index" :disabled="indexContact===index"></el-option>
      </el-select>
        </el-form-item>
        <!-- <el-form-item label="对账联系人电话：" prop="docType">
            <el-input v-model="(subForm.idCardPerson[(indexContact1||0)]).telephone"></el-input>
        </el-form-item> -->
        <el-form-item label="对账联系人手机：" prop="docType">
            <el-input v-model="(subForm.idCardPerson[(indexContact1||0)]).telephone"> </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="6" class="debit-card">
                子卡持有人
          </el-col>
         </el-row>
    </el-form>
    <div slot="footer">
      <el-button @click="determineProduct(4,indexContact,'cardHolder','1');determineProduct(4,indexContact1,'cardHolder','2')" type="primary">确定</el-button>
    </div>
  </el-dialog>


  <!-- 支付密码 -->
<el-dialog title="——————————————     支付密码     —————————————" :visible.sync="productList[5]" center :show-close='false' class="dialog-product" :close-on-click-modal='false'>
    <el-form size='medium' :rules="formRules">
        <el-form-item label="设置密码：" prop="docType">
            <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="docType">
            <el-input autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="determineProduct(5)" type="primary">确定</el-button>
    </div>
  </el-dialog>

    <!-- 电子回单箱 -->
<el-dialog title="——————————————     电子回单箱     —————————————" :visible.sync="productList[6]" center :show-close='false' class="dialog-product" :close-on-click-modal='false'>
    <el-form size='medium' :rules="formRules">
        <el-form-item label="姓名：" prop="docType">
        <el-select v-model="indexreceiptBox">
        <el-option v-for="(item,index) in subForm.idCardPerson" :label="item.name" :key="item+index" :value="index"></el-option>
      </el-select>
        </el-form-item>
        <!-- <el-form-item label="存款人账户：" prop="docType">
            <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收款人账户：" prop="docType">
            <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收款人户名：" prop="docType">
            <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收款人开户行：" prop="docType">
            <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="金额：" prop="docType">
            <el-input autocomplete="off"><template slot="append">元</template> </el-input>
        </el-form-item>
        <el-form-item label="用途：" prop="docType">
            <el-input autocomplete="off"></el-input>
        </el-form-item> -->
    </el-form>
    <div slot="footer">
      <el-button @click="determineProduct(6,indexreceiptBox,'receiptBox','1')" type="primary">确定</el-button>
    </div>
  </el-dialog>


    <!-- 个人代发工资 -->
<el-dialog title="——————————————     个人代发工资     —————————————" :visible.sync="productList[7]" center :show-close='false' class="dialog-product" :close-on-click-modal='false'>
    <el-form size='medium' :rules="formRules">
        <!-- <el-form-item label="业务类型：" prop="docType">
            <el-input autocomplete="off" class="item-input-size1"></el-input>
            <el-input autocomplete="off" class="item-input-size1"></el-input>
        </el-form-item> -->
        <el-form-item label="付款人名称：" prop="docType">
        <el-select v-model="indexCapital">
        <el-option v-for="(item,index) in subForm.idCardPerson" :label="item.name" :key="item+index" :value="index"></el-option>
      </el-select>
        </el-form-item>
        <!-- <el-form-item label="付款人账号：" prop="docType">
            <el-input autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="用途：" prop="docType">
            <el-input autocomplete="off" class="item-input-size1"></el-input>
            <el-input autocomplete="off" class="item-input-size1"></el-input>
        </el-form-item> -->
    </el-form>
    <div slot="footer">
      <el-button @click="determineProduct(7,indexCapital,'receiptBox1','1')" type="primary">确定</el-button>
    </div>
  </el-dialog>
  <net-dialog :dialog="dialogAccout" :dialogTitle="'请先完善开户单位基本信息'">
  <div slot="dialog-button"> <el-button type="danger" @click="dialogAccout=false">确定</el-button></div>
</net-dialog>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderTitle from '../components/HeaderTitle'
import common from '../components/common'
import product from '@/json/bocPro.json'
import NetDialog from '../components/Netdialog'
export default {
  name: 'Dashboard',
  components: { HeaderTitle, common, NetDialog },
  data() {
    return {
      indexItem: 0,
      selectPer: false,
      indexNetWork: null,
      indexNetWork1: null,
      indexContact1: null,
      indexContact: null,
      indexreceiptBox: null,
      indexCapital: null,
      indexMsg: 0,
      isShowSeal: true,
      isShowOther: true,
      dialogAccout: false,
      headerTitle: '完善开户单位基本信息',
      // officeSeal: new Array(8).fill(''),
      // checkedList: new Array(8).fill(false),
      productList: new Array(8).fill(false),
      activeName: 'tab0',
      personInfo: 0,
      listedCompany: '',
      currency: '人民币',
      accountType: product.accountType,
      productItem: product.productList,
      docType: product.docType,
      cardType: product.cardType,
      isPartner: product.isPartner,
      panelArray: new Array(10).fill(''),
      formRules: {},
      legRules: {
        'enter.docType': [
          { required: true, trigger: 'blur' }
        ],
        'enter.creditCode': [
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
        'enter.registrationAuthority': [
          { required: true, trigger: 'blur' }
        ],
        'enter.registrationStatus': [
          { required: true, trigger: 'blur' }
        ],
        'enter.addressCode': [
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
  created() {
    if (this.subForm.idCardPerson.length === 0) {
      this.$alert('请选扫描身份证', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.push({ path: 'idcard' })
        }
      })
    }
  },
  watch: {
    personInfo(newV, oldV) {
      if (newV === 0) {
        this.headerTitle = '完善开户单位基本信息'
      } else if (newV === 1) {
        this.headerTitle = '开户人员信息核实'
      } else if (newV === 2) {
        this.headerTitle = '开户相关产品'
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
    next() {
      this.$refs.legForm.validate((valid) => {
        if (valid) {
          this.personInfo = ++this.personInfo % 3
          if (this.personInfo === 2) {
            var arry = []
            this.subForm.idCardPerson.forEach(item => arry.push(...item.personStatus))
            var newarry = arry.filter(x => x !== '4')
            if (newarry.length !== [...new Set(newarry)].length) {
              this.personInfo = 1
              this.selectPer = true
              this.$alert('身份对应有重复，请重新选择！！')
            }
          }
          if (this.personInfo === 0) {
            this.$router.push({ path: 'check' })
          }
        } else {
          this.dialogAccout = true
        }
      })
      // { this.personInfo = ++this.personInfo % 3 }
    },
    preve() {
      this.personInfo === 0 ? this.$router.push({ path: 'idcard' }) : this.personInfo = --this.personInfo % 3
    },
    // 选择项目
    changeItem(itemArray, index) {
      console.log(itemArray, index)
      if (itemArray.includes('D')) {
        this.isShowSeal = false
      } else {
        this.isShowSeal = true
        // this.officeSeal[index] = ''
      }
      if (itemArray.includes('H')) {
        this.isShowOther = false
      } else {
        this.isShowOther = true
        this.subForm.idCardPerson[index].authorizationOtherContent = ''
      }
    },
    changBox(a, index) {
      console.log(this.subForm.idCardPerson)
      this.selectPer = false
    },
    // 选择产品
    selectProduct(event, index) {
      this.$set(this.productList, index, event)
      console.log(this.productList)
      this.$store.commit('DEFAULT_FORM', { i: index, v: event })
    },
    determineProduct(index, itemIndex, value, indexValue) {
      if (itemIndex) {
        this.subForm.idCardPerson[itemIndex][value] = indexValue
      }
      this.$set(this.productList, index, false)
    }
    // 切换板

  }
}
</script>
<style lang='scss' scoped>


/deep/.home-container {
  .home-warp {
    width: 1210px;
  }
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
 /deep/.el-col-6{
   min-height: 190px;
  margin: 12px auto;
 }
   /deep/.dialog-product{
     .line-row{ 
    border-bottom: 1px solid #666666;
    margin-bottom: 10px;
    padding-bottom: 10px;
     }
     .el-dialog{
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .el-dialog__header{
      border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #2479EC;
  padding: 10px;
  span{
      color: #fff;
  }
  }
  .el-dialog__body{
    .el-form-item {
      margin-bottom: 10px;
      label{
        color: #2479EC;
      }
    }
  }
}
 }
 .item-input-size1{
   width: 20%;
   display: inline-block;
 }
 .debit-card{
   display: flex;
   justify-content: center;
   align-items: center;
   color: #8C8C8C;
   font-size: 16px;
 }
 /deep/.input-size-80{
  width: 100%;
  .el-form-item__content{
    width: 80%;
  }
}
 /deep/.input-size-40{
  width: 50%;
  .el-form-item__content{
    width: 100%;
  }
}
.OtherContent{
  width: 30%;
}
.slect{
  padding: 0px;
}
/deep/.item-time{
  .el-form-item__content{
    width: 180px;
  .el-date-editor {
      width: 160px !important;
  }
}
}
.form-size{
  width:32%;
}
.accout-form{
  margin: 40px auto;
}
.line::after{
  content: '';
  width: 100%;
  height: 2px;
  margin-top: 26px;
  background-color: #DCDFE6;
}
.muiplit{
  display: inline-block;
    vertical-align: sub;
    margin-top: 8px;
    margin-left: 15px;
    color: #409EFF;
}
.id-info{
  margin: 20px auto;
  }
</style>
