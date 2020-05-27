/*
 * @Author: dachuant 
 * @Date: 2019-01-08 10:45:45 
 * @Last Modified by: xiajinfeng
 * @Last Modified time: 2019-03-26 16:31:36
 */
<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="main-form" size="mini">
      <transition name="el-fade-in-linear">
        <div v-show="step == 1" class="transition-box">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card class="box-card box-card-half">
                <div slot="header" class="clearfix">
                  <span>经办人</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="scanAgent">
                    身份证扫描<i class="iconfont icon-card_fill el-icon--right"></i>
                  </el-button>
                </div>
                <el-form-item class="form-item" label="姓名" prop="cusName">
                  <el-input v-model="form.cusName"></el-input>
                </el-form-item>
                <el-form-item class="form-item" label="身份证" prop="cusId">
                  <el-input v-model="form.cusId"></el-input>
                </el-form-item>
                <el-form-item class="form-item" label="身份选择">
                  <el-checkbox label="法人代表" v-model="isLegalPerson"></el-checkbox>
                </el-form-item>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card box-card-half">
                <div slot="header" class="clearfix">
                  <span>法人代表</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="scanLegalPerson">
                    身份证扫描<i class="iconfont icon-card_fill el-icon--right"></i>
                  </el-button>
                </div>
                <el-form-item class="form-item" label="姓名" prop="authName">
                  <el-input v-model="form.authName"></el-input>
                </el-form-item>
                <el-form-item class="form-item" label="身份证" prop="authId">
                  <el-input v-model="form.authId"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card class="box-card box-card-half">
                <div slot="header" class="clearfix">
                  <span>客户销户信息</span>
                </div>
                <el-form-item class="form-item" label="账户币种" prop="accountType">
                  <el-select v-model="form.accountType" placeholder="请选择账户币种">
                    <el-option v-for="item in select.accountType" :value="item.value" :key="item.value" :label='item.label'></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="form-item" label="账户类型" prop="custActType1">
                  <el-select v-model="form.custActType1" placeholder="请选择账户类型" style="width: 49%">
                    <el-option v-for="item in select.custActType1" :value="item.value" :key="item.value" :label='item.label'></el-option>
                  </el-select>
                  <el-select v-model="form.custActType2" placeholder="请选择账户类型" style="width: 49%">
                    <el-option v-for="item in select.custActType2" :value="item.value" :key="item.value" :label='item.label'></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="form-item" label="账户名称" prop="accountName">
                  <el-input placeholder="" v-model="form.accountName">
                  <el-input v-model="form.name"></el-input>
                  </el-input>
                </el-form-item>
                <el-form-item class="form-item" label="账号" prop="accountNumber">
                  <el-input v-model="form.accountNumber"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card box-card-half">
                <div slot="header" class="clearfix">
                  <span>销户原因</span>
                </div>
                <el-form-item class="form-item" label="销户原因" prop="destoryReason">
                  <el-select v-model="form.cancelType" placeholder="请选择销户原因">
                    <el-option v-for="item in select.destoryReason" :value="item.value" :key="item.value" :label='item.label'></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="form.cancelType == 7" class="form-item" label="其他" prop="otherCancelReason" 
                  :rules="form.cancelType == 7 ? [{ required: true, message: '请输入其它原因', trigger: 'blur' }] : []">
                  <el-input type="textarea" v-model="form.otherCancelReason"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="grantUser ? 24 : 12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <el-checkbox label="被授权人信息" v-model="grantUser"></el-checkbox>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <sub>注：法定代表人或单位负责人亲自到开户行办理销户业务的，可不填被授权人信息</sub>
                </div>

                 <transition name="el-fade-in-linear">
                  <div v-show="grantUser" class="transition-box">
                    <el-form-item class="form-item2" label="法人/负责人" prop="chargerName"
                      :rules="grantUser ? [{ required: true, message: '请输入法人/负责人', trigger: 'blur' }] : []">
                      <el-input v-model="form.chargerName"></el-input>
                    </el-form-item>
               
                    <el-card class="box-card sub-el-card">
                      <div slot="header" class="clearfix">
                        <span>授权人一</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="scanGrantUser">
                          身份证扫描<i class="iconfont icon-card_fill el-icon--right"></i>
                        </el-button>
                      </div>
                      <el-form-item class="form-item" label="姓名" prop="authPersonName1"
                      :rules="grantUser ? [{ required: true, message: '请输入姓名', trigger: 'blur' }] : []">
                        <el-input v-model="form.authPersonName1"></el-input>
                      </el-form-item>
                      <el-form-item class="form-item" label="证件类型" prop="authPersonIdcardType1"
                      :rules="grantUser ? [{ required: true, message: '请选择证件类型', trigger: 'blur' }] : []">
                        <el-select v-model="form.authPersonIdcardType1" placeholder="请选择证件类型">
                          <el-option v-for="item in select.authPersonIdcardType" :value="item.value" :key="item.value" :label='item.label'></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item class="form-item" label="证件号码" prop="authPersonIdcard1"
                      :rules="grantUser ? [{ required: true, message: '请输入证件号码', trigger: 'blur' }] : []">
                        <el-input v-model="form.authPersonIdcard1"></el-input>
                      </el-form-item>
                      <el-form-item class="form-item" label="办公电话" prop="authPersonTel1"
                      :rules="grantUser ? [{ required: true, message: '请输入办公电话', trigger: 'blur' }] : []">
                        <el-input v-model="form.authPersonTel1"></el-input>
                      </el-form-item>
                      <el-form-item class="form-item" label="移动电话" prop="authPersonPhone1"
                      :rules="grantUser ? [{ required: true, message: '请输入移动电话', trigger: 'blur' }] : []">
                        <el-input v-model="form.authPersonPhone1"></el-input>
                      </el-form-item>
                    </el-card>
                    
                    <el-card class="box-card sub-el-card">
                      <div slot="header" class="clearfix">
                        <span>授权人二</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="scanGrantUser2">
                          身份证扫描<i class="iconfont icon-card_fill el-icon--right"></i>
                        </el-button>
                      </div>
                      <el-form-item class="form-item" label="姓名">
                        <el-input v-model="form.authPersonName2"></el-input>
                      </el-form-item>
                      <el-form-item class="form-item" label="证件类型">
                        <el-select v-model="form.authPersonIdcardType2" placeholder="请选择证件类型">
                          <el-option v-for="item in select.authPersonIdcardType" :value="item.value" :key="item.value" :label='item.label'></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item class="form-item" label="证件号码">
                        <el-input v-model="form.authPersonIdcard2"></el-input>
                      </el-form-item>
                      <el-form-item class="form-item" label="办公电话">
                        <el-input v-model="form.authPersonTel2"></el-input>
                      </el-form-item>
                      <el-form-item class="form-item" label="移动电话">
                        <el-input v-model="form.authPersonPhone2"></el-input>
                      </el-form-item>
                    </el-card>
                    </div>
                </transition>

              </el-card>
            </el-col>
          </el-row>
          <el-row class="line">
            <el-button type="primary" @click="sumbit">提交</el-button>
          </el-row>
        </div>
      </transition>
    </el-form>

    <el-dialog title="验证码1" :visible.sync="dialogFormVisible" width="600px" class="dialog" data-v-f3f12322g9>
      <el-form :model="megForm" ref="megForm" :rules="rules">
        <el-form-item label="手机号码" prop="telNo">
          <el-input v-model="megForm.telNo"></el-input>
        </el-form-item>
        <el-form-item label="图片验证码">
          <el-input placeholder="" class="vcode" v-model="vcode1">
            <template slot="append">
              <img :src="vcode"  @click="getVCode1" alt="验证码">

            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机验证码">
          <el-input placeholder="" v-model="msgCode1">
            <template slot="append">
              <el-button class="vcode-btn" v-show="vcodeFlag" @click="getMcode1">获取验证码</el-button>
              <span v-show="!vcodeFlag">{{vcodeTimer1}}秒后重新获取</span>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle1">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="验证码2" :visible.sync="dialogFormVisible2" width="600px" class="dialog" data-v-f3f12322g9>
      <el-form :model="form">
        <el-form-item label="图片验证码">
          <el-input placeholder="" class="vcode" v-model="vcode2">
            <template slot="append">
              <img :src="vcode" @click="getVCode1" alt="验证码">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机验证码">
          <el-input placeholder="" v-model="msgCode2">
            <template slot="append">
              <el-button class="vcode-btn" v-show="vcodeFlag" @click="getMcode2">获取验证码</el-button>
              <span v-show="!vcodeFlag">{{vcodeTimer2}}秒后重新获取</span>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle2">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="login">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 申请结果 -->
    <transition name="el-fade-in-linear">
      <div v-show="step == 2" class="transition-box">
        <el-row>
          <el-col :span="24">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>申请结果</span>
              </div>
                <p>您已成功预约账户销户申请，预约申请编号：<em>{{busApplyNum}}</em></p>
                <p>需要提供的证明文件：</p>
                <ol>
                  <li>授权书（法人代表或负责人直接办理销户业务的，可不提供）。</li>
                  <li>销户申请书。</li>
                  <li>法人代表或负责人、经办人员身份证原件及复印件各一份。</li>
                  <li>各种卡证，包括开户许可证、回单箱IC卡、预留印鉴卡片、各种重要空白票据及结算凭证等，不能交回各种重要空白票据和结算凭证的，应出具相关证明或公函。</li>
                  <li>其他销户相关证明文件。</li>
                </ol>
                <el-table
                  :data="print.list" row-key="name" height="250" border tooltip-effect="dark" style="width: 100%">
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column label="序号" width="50">
                    <template slot-scope="scope">
                      {{scope.$index + 1}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="文件名称" width="300">
                  </el-table-column>
                  <el-table-column label="打印份数" width="300">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.num" class="edit-input" size="small"/>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="拖拽" width="80">
                  <template slot-scope="">
                      <svg-icon class="drag-handler" icon-class="drag"/>
                    </template>
                  </el-table-column>
                </el-table>
            </el-card>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-button type="primary" @click="printHandle">打 印</el-button>
          <el-button type="primary" @click="step = 1">完 成</el-button>
        </el-row>
      </div>
    </transition>

  </div>

</template>

<script>
// import vcode from '@/assets/img/vcode.gif'
import { readIdCard, createIdCardImage } from '@/utils/idCard'
import { idCardRule, phoneRule } from '@/utils/validate'
import { ipcRenderer } from 'electron'
import Sortable from 'sortablejs'
import { getCode, getFirstMCode, getSecondMCode, register, login, submit } from '@/api/destory'
export default {
  data() {
    return {
      sumbitFlag: 1,
      vcode: '',
      vcode1: '',
      msgCode1: '',
      vcode2: '',
      msgCode2: '',
      step: 1,
      show: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      vcodeFlag: true,
      vcodeTimer1: 60,
      vcodeTimer2: 60,
      isLegalPerson: false,
      grantUser: false,
      loading: false,
      busApplyNum: '',
      select: {
        accountType: [
          { value: 0, label: '人民币账户' },
          { value: 1, label: '外币账户' }
        ],
        custActType1: [
          { value: 1, label: '基本结算账户' },
          { value: 2, label: '一般结算账户' },
          { value: 3, label: '专用账户' },
          { value: 4, label: '临时账户' },
          { value: 5, label: '注册验资账户' }
        ],
        custActType2: [
          { value: 6, label: '经常项目' },
          { value: 7, label: '资本项目' }
        ],
        destoryReason: [
          { value: 1, label: '转户' },
          { value: 2, label: '撤并' },
          { value: 3, label: '解散' },
          { value: 4, label: '宣告破产' },
          { value: 5, label: '关闭' },
          { value: 6, label: '被吊销营业执照或执业许可证' },
          { value: 7, label: '其他' }
        ],
        authPersonIdcardType: [
          { value: '01', label: '居民身份证' },
          { value: '02', label: '临时身份证' },
          { value: '03', label: '护照' },
          { value: '04', label: '户口簿' },
          { value: '05', label: '军人身份证' },
          { value: '06', label: '武装警察身份证' },
          { value: '07', label: '外交人员身份证' },
          { value: '09', label: '外国人居留许可证' },
          { value: '10', label: '边民出入境通行证' },
          { value: '11', label: '其它' },
          { value: '47', label: '港澳居民来往内地通行证（香港）' },
          { value: '48', label: '港澳居民来往内地通行证（澳门）' },
          { value: '49', label: '台湾居民来往大陆通行证' }
        ]
      },
      // 打印
      print: {
        // 列表
        list: [{
          name: '销户申请书',
          num: '2',
          order: '1'
        }, {
          name: '法人身份证',
          num: '1',
          order: '2'
        }, {
          name: '经办人身份证',
          num: '1',
          order: '3'
        }],
        sortable: null,
        oldList: [],
        newList: []
      },
      rules: {
        cusName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        cusId: [
          { required: true, message: '请输入身份证', trigger: 'blur' },
          { validator: idCardRule, trigger: 'blur' }
        ],
        telNo: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: phoneRule, trigger: 'blur' }
        ],
        authName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        authId: [
          { required: true, message: '请输入身份证', trigger: 'blur' },
          { validator: idCardRule, trigger: 'blur' }
        ],
        accountType: [
          { required: true, message: '请选择账户币种', trigger: 'blur' }
        ],
        custActType1: [
          { required: true, message: '请选择账户类型', trigger: 'blur' }
        ],
        accountName: [
          { required: true, message: '请输入账户名称', trigger: 'blur' }
        ],
        accountNumber: [
          { required: true, message: '请输入账户', trigger: 'blur' }
        ],
        otherCancelReason: [
          { required: true, message: '请输入其他销户原因', trigger: 'blur' }
        ]
      },
      form: {
        authorityDivChk: '',
        cusName: '',
        cusId: '',
        cusIdDate: '',
        telNo: '',
        cusIdCardImg: '',
        authName: '',
        authId: '',
        accountName: '',
        accountNumber: '',
        accountType: 0,
        custActType1: 1,
        custActType2: 6,
        cancelType: '1',
        otherCancelReason: '',
        authPersonName1: '',
        authPersonIdcardType1: '01',
        authPersonIdcard1: '',
        authPersonTel1: '',
        authPersonPhone1: '',
        authPersonName2: '',
        authPersonIdcardType2: '01',
        authPersonIdcard2: '',
        authPersonTel2: '',
        authPersonPhone2: ''
      },
      sumTel: '',
      megForm: {
        telNo: ''
      }
    }
  },
  watch: {
    isLegalPerson(newVal, oldVal) {
      if (newVal) {
        if (this.form.cusName) {
          this.form.authName = this.form.cusName
        }
        if (this.form.cusId) {
          this.form.authId = this.form.cusId
        }
      }
      this.form.chargerName = this.form.cusName
    },
    grantUser(newVal, oldVal) {
      if (newVal) {
        this.form.authorityDivChk = '1'
        this.rules.chargerName = [
          { required: true, message: '请输入法人/负责人', trigger: 'blur' }
        ]
      } else {
        this.form.authorityDivChk = ''
        this.rules.chargerName = []
      }
    }
  },
  mounted() {
    this.setPrintListSort()
  },
  methods: {
    // 经办人身份证扫描
    scanAgent() {
      readIdCard((idCardData) => {
        if (idCardData.code === 0) {
          this.form.cusName = idCardData.data.name
          this.form.cusId = idCardData.data.idCardNo
          this.form.chargerName = idCardData.data.name
          createIdCardImage(idCardData.data, (res) => {
            this.cusIdCardImg = res
          })
        } else {
          this.$alert(idCardData.msg)
        }
      })
    },
    // 法人代表身份证扫描
    scanLegalPerson() {
      readIdCard((idCardData) => {
        if (idCardData.code === 0) {
          this.form.authName = idCardData.data.name
          this.form.authId = idCardData.data.idCardNo
        } else {
          this.$alert(idCardData.msg)
        }
      })
    },
    // 授权人一身份证扫描
    scanGrantUser() {
      readIdCard((idCardData) => {
        if (idCardData.code === 0) {
          this.form.authPersonName1 = idCardData.data.name
          this.form.authPersonIdcard1 = idCardData.data.idCardNo
        } else {
          this.$alert(idCardData.msg)
        }
      })
    },
    // 授权人二身份证扫描
    scanGrantUser2() {
      readIdCard((idCardData) => {
        if (idCardData.code === 0) {
          this.form.authPersonName2 = idCardData.data.name
          this.form.authPersonIdcard2 = idCardData.data.idCardNo
        } else {
          this.$alert(idCardData.msg)
        }
      })
    },
    // 提交
    sumbit() {
      // if (this.form.cusName === '' && this.form.cusId === '') {
      //   this.$message.error('请输入经办人姓名和身份证')
      //   return
      // }

      this.$refs['form'].validate((valid) => {
        if (valid) {
          getCode().then((r) => {
            if (r.code === 0) {
              this.vcode = r.codeData
            } else {
              this.$message.error(r.msg)
            }
          })

          this.dialogFormVisible = true
        } else {
          return false
        }
      })
    },
    cancle1() {
      this.dialogFormVisible = false
      this.megForm.telNo = ''
      this.vcode1 = ''
      this.msgCode1 = ''
    },
    cancle2() {
      this.dialogFormVisible2 = false
      this.megForm.telNo = ''
      this.vcode1 = ''
      this.msgCode1 = ''
      this.vcode2 = ''
      this.msgCode2 = ''
    },
    // 获取图片验证码1
    getVCode1() {
      getCode().then((r) => {
        if (r.code === 0) {
          this.vcode = r.codeData
        } else {
          this.$message.error('获取失败')
        }
      })
    },
    // 获取短信验证码1
    getMcode1() {
      this.$refs['megForm'].validate((valid) => {
        if (valid) {
          this.vcodeFlag = false
          getFirstMCode(this.vcode1, this.form.cusName, this.form.cusId, this.megForm.telNo)
          const timer = setInterval(() => {
            this.vcodeTimer1--
            if (this.vcodeTimer1 <= 0) {
              this.vcodeFlag = true
              clearInterval(timer)
            }
          }, 1000)

          this.vcodeTimer1 = 60
        } else {
          return false
        }
      })
    },
    register() {
      register(this.vcode1, this.form.cusName, this.form.cusId, this.megForm.telNo, this.msgCode1).then((r) => {
        if (r.code === 0) {
          getCode()
          this.sumTel = this.megForm.telNo
          this.$message.success('操作成功')
          this.vcodeFlag = true
          this.dialogFormVisible = false
          this.dialogFormVisible2 = true
          this.megForm.telNo = ''
          this.vcode2 = ''
          this.msgCode2 = ''
          this.form.telNo = this.megForm.telNo
        } else {
          this.$message.error('验证码错误')
        }
      })
    },
    login() {
      this.loading = true
      login(this.vcode2, this.form.cusName, this.form.cusId, this.msgCode2).then((r) => {
        if (r.code !== 0) {
          this.loading = false
          this.$message.error('验证码错误')
        } else {
          this.vcodeFlag = true
          this.form.telNo = this.sumTel
          const accountDestroy = this.form
          console.log(accountDestroy)
          submit(accountDestroy).then((r) => {
            this.loading = false
            if (r.code === 0) {
              this.sumbitFlag = 2
              this.$message.success('申请成功')
              this.dialogFormVisible2 = false
              this.busApplyNum = r.data
              this.step = 2
              this.megForm.telNo = ''
              this.vcode2 = ''
              this.msgCode2 = ''
            } else {
              this.$message.error(r.msg)
            }
          })
        }
      })
    },
    // 获取短信验证码2
    getMcode2() {
      this.vcodeFlag = false
      getSecondMCode(this.vcode2, this.form.cusName, this.form.cusId, this.megForm.telNo)
      const timer = setInterval(() => {
        this.vcodeTimer2--
        if (this.vcodeTimer2 <= 0) {
          this.vcodeFlag = true
          clearInterval(timer)
        }
      }, 1000)

      this.vcodeTimer2 = 60
    },
    /**
     * 打印列表拖拽排序
     */
    setPrintListSort() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          const targetRow = this.print.list.splice(evt.oldIndex, 1)[0]
          this.print.list.splice(evt.newIndex, 0, targetRow)
          localStorage.setItem('destoryList', JSON.stringify(this.print.list))
          console.log(1111, this.print.list.map(m => m.name))
          // for show the changes, you can delete in you code
          // const tempIndex = this.print.newList.splice(evt.oldIndex, 1)[0]
          // this.print.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    },
    // 打印
    printHandle() {
      // 参数
      // const param = 1
      ipcRenderer.send('openDestoryPrintWin', this.busApplyNum)
    }
  }
}
</script>

<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
.vcode .el-input-group__append {
  background-color: #ffffff;
  color: #ffffff;
  padding: 0;
}
.dialog[data-v-f3f12322g9] .el-form-item .el-form-item__content {
  width: 80%;
  display: inline-block;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.line{
  text-align: center;
}
.el-row {
    margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.form-item {
  width: 50%;
  min-width: 320px;
  display: inline-block;
  float: left;
  margin-right: 0;
}
.form-item2 {
  width: 100%;
  display: inline-block;
  float: left;
  margin-right: 0;
  .el-input{
    width: 280px;
  }
}
.sub-el-card {
  width: 48%;
  float: left;
  margin: 1%;
}
.el-checkbox__label {
  font-size: 15px;
}
.box-card-half{
  min-height: 210px;
}

.vcode-btn {
  color: #fff !important;
  background-color: #409EFF !important;
  border-color: #409EFF !important;
}
.el-select {
  width: 100%;
}
</style>

