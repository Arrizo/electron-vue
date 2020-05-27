
<template>
<div>
<common>
  <div slot="slot-header">
         <header-title :headerTitle="'开户单位证明文件扫描'"></header-title>
  </div>
  <div slot="slot-main">
    <div>
      <div class="warp-doc">
        <h1 class="type-file">文件种类:</h1>
        <h1 class="type-file"><el-radio size='medium' v-model="checkFile" label="1">企业营业执照</el-radio></h1>
       </div>
    <el-row class="main-conent">
      <el-col :span='12'>
        <div class="camere">
          <div class="camere-1">
          <span>企业二维码</span><a @click="dialogFormFile=true" v-show="subForm.enter.creditCode" >扫描详情</a>
         <div @click="readQrCode" :class="{'succeed':!!subForm.enter.creditCode}"><i > {{subForm.enter.creditCode ?'扫描完成':'点击扫描'}}</i></div>
            </div>
        </div>
      </el-col>
      <el-col :span='12'>
                <div class="camere">
          <div class="camere-1">
          <span>营业执照拍照</span>
         <div @click="businessLicenseTakePhoto" :class="{'succeed':!!subForm.businessImgPath}"><i >{{subForm.businessImgPath ?'拍摄完成':'点击拍摄'}}</i></div>
            </div>
        </div>
      </el-col>
    </el-row>
    </div>
  </div>
  <div slot="slot-footer">
              <el-button  size="medium" @click="$router.push({path:'/'})">返   回</el-button>
              <el-button type="primary" size="medium" @click="fileNext()">下一步</el-button>
  </div>
</common>
<!-- 扫描数据 -->
<el-dialog title="信息" :visible.sync="dialogFormFile" :show-close="false" :close-on-click-modal='false'>
  <el-form :inline='true' :rules="formRules" size='medium' ref="scanRef" :model="subForm">
    <el-form-item label="文件种类：" prop="enter.docType"  :show-message="false">
      <el-select v-model="subForm.enter.docType" placeholder="请选择文件种类">
      <el-option v-for="(item,indexs) in docType" :value="item.value" :key="indexs+'index'" :label='item.label'></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="统一代码：" prop="enter.creditCode" :show-message="false">
      <el-input placeholder="请输入统一信用代码" v-model="subForm.enter.creditCode" @keyup.native="(subForm.enter.creditCode)=(subForm.enter.creditCode).replace(/[^\da-zA-Z]*$/g,'')"></el-input>
    </el-form-item>
    <el-form-item label="企业名称：" prop="enter.enterpriseName" :show-message="false">
      <el-input v-model="subForm.enter.enterpriseName"></el-input>
    </el-form-item>
    <el-form-item label="成立日期：" prop="enter.establishmentDate"  class="small-time" :show-message="false">
    <el-date-picker type="date" placeholder="选择成立日期" v-model="subForm.enter.establishmentDate" 
    value-format="yyyyMMdd" format="yyyy-MM-dd" @change="subForm.enter.establishmentDate=$event">
  </el-date-picker>
    </el-form-item>
    <el-form-item label="注册资本：" prop="enter.registeredCapital" :show-message="false" >
      <el-input v-model="subForm.enter.registeredCapital"></el-input>
    </el-form-item>
    <el-form-item label="登记机关：" prop="enter.registrationAuthority" :show-message="false">
      <el-input v-model="subForm.enter.registrationAuthority"></el-input>
    </el-form-item>
    <el-form-item label="登记状态：" prop="enter.registrationStatus" :show-message="false">
      <el-input v-model="subForm.enter.registrationStatus"></el-input>
    </el-form-item>
    <el-form-item label="核准日期：" prop="enter.approvalDate"   class="small-time" :show-message="false">
    <el-date-picker type="date" placeholder="选择核准日期" v-model="subForm.enter.approvalDate" value-format="yyyyMMdd" format="yyyy-MM-dd" @change="subForm.enter.approvalDate=$event">
        </el-date-picker>
    </el-form-item >
    <el-form-item label="注册地址：" prop="enter.registeredAddress" class='input-size-80' :show-message="false">
      <el-input v-model="subForm.enter.registeredAddress"></el-input>
    </el-form-item>
    <el-form-item label="经营范围：" prop="enter.operationScope" class='input-size-80' :show-message="false" >
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" v-model="subForm.enter.operationScope"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="checkFormFile('scanRef')">确定</el-button>
  </div>
</el-dialog>
<net-dialog :dialog='dialogFile'>
  <div slot="dialog-button"> <el-button type="danger" @click="dialogFile=false">确定</el-button></div>
</net-dialog>
      <!-- 扫描二维码 -->
    <el-dialog title="扫描企业二维码" :visible.sync="dialog.recognitionCode" center width="900px" :before-close="recRqCodeDialogClose">
      <div style="text-align: center;">
        <qr-scanner @getScanData="onDecode" v-if='isShowCamera' :eventIndex='eventIndex'></qr-scanner>
        <el-button type="primary" @click="eventIndex = (++eventIndex) % 3">切换摄像头</el-button>
      </div>
    </el-dialog>

       <!-- 拍照 -->
    <el-dialog title="营业执照拍照" :visible.sync="dialog.businessLicenseTakePhoto" :before-close="businessLicenseTakePhotoClose" center width="1000px">
      <el-form v-loading="uploadLoading" element-loading-text="图片正在上传..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <div style="text-align: center;width:800px;height:600px;">
          <canvas v-show="!dialog.isTakePhoto" ref="canvas" width="800" height="600"></canvas>
          <img v-show="dialog.isTakePhoto" :src="dialog.businessLicense " alt="营业执照" style="width: 800px;height: 600px;display: none;">
          <div style="display: none">
            <video ref="video" autoplay="autoplay" style="width: 2592px;height: 1944px; object-fit: scale-down;"  ></video>
            <canvas ref="canvas2" width="2592" height="1717" ></canvas>
          <div ref="image"></div>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer" >
        <el-button @click="businessLicenseTakePhotoClose">取 消</el-button>
        <el-button v-show="!dialog.isTakePhoto" type="primary" @click="doBusinessLicenseTakePhoto">拍 照</el-button>
        <el-button v-show="dialog.isTakePhoto" type="primary" @click="dialog.isTakePhoto = false; $set(subForm,'businessImgPath','')">重新拍照</el-button>
        <el-button v-show="dialog.isTakePhoto" type="primary" @click="businessLicenseTakePhotoClose" v-loading="uploadLoading">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>
<script>
import common from '../components/common'
import HeaderTitle from '../components/HeaderTitle'
import NetDialog from '../components/Netdialog'
import QrScanner from '../components/qrScanner'
import product from '@/json/bocPro.json'
import { mapGetters } from 'vuex'
import { uploadImg } from '@/api/open'
export default {
  name: 'FileScanner',
  components: { HeaderTitle, common, NetDialog, QrScanner },
  props: {},
  data() {
    return {
      eventIndex: 1,
      isShowCamera: false, // 显示扫描二维码
      uploadLoading: false,
      dialog: {
        recognitionCode: false,
        businessLicenseTakePhoto: false,
        businessLicense: '',
        mediaStreamTrack: null,
        canvasInterval: null,
        isTakePhoto: false
      },
      dialogFormFile: false,
      dialogFile: false,
      checkFile: '1',
      formRules: {
        'enter.creditCode': [
          { required: true, trigger: 'blur' }
        ],
        'enter.docType': [
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
        'enter.approvalDate': [
          { required: true, trigger: 'change' }
        ],
        'enter.registeredAddress': [
          { required: true, trigger: 'blur' }
        ],
        'enter.operationScope': [
          { required: true, trigger: 'blur' }
        ]
      },
      docType: product.docType
    }
  },
  computed: {
    ...mapGetters([
      'subForm'
    ])
  },
  methods: {
    fileNext() {
      if (!!(this.subForm.businessImgPath) && !!(this.subForm.enter.creditCode)) {
        this.$router.push({ path: 'idcard' })
      } else {
        this.dialogFile = true
      }
    },
    checkFormFile(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          this.$alert('请完善信息！')
        } else {
          this.dialogFormFile = false
        }
      })
    },
    // 关闭摄像头
    recRqCodeDialogClose(done) {
      this.isShowCamera = false
      this.dialog.recognitionCode = false
    },
    readQrCode() {
      this.dialog.recognitionCode = true
      this.isShowCamera = true
    },
    // 解析二维码
    onDecode(decodedString) {
      console.log('984jnkhkdhs', decodedString)
      if (decodedString.indexOf('|') > -1) {
        this.isShowCamera = false
        this.dialog.recognitionCode = false
        this.dialogFormFile = true
        const qrInf = decodedString.split('|')
        this.subForm.enter.creditCode = qrInf[0]
        this.subForm.enter.enterpriseName = qrInf[1]
        this.subForm.enter.legalPersonName = qrInf[3]
        let registeredCapital = qrInf[4].slice(0)
        if (registeredCapital !== 'null' || registeredCapital !== '') {
          if (registeredCapital.indexOf('(人民币)') !== -1) {
            registeredCapital = registeredCapital.replace('(人民币)', '')
          }
          if (registeredCapital.indexOf('万人民币') !== -1) {
            registeredCapital = registeredCapital.replace('万人民币', '')
            registeredCapital = parseFloat(registeredCapital)
            registeredCapital = registeredCapital * 10000
            registeredCapital = registeredCapital.toString()
          } else if (registeredCapital.indexOf('万元') !== -1) {
            registeredCapital = registeredCapital.replace('万元', '')
            registeredCapital = parseFloat(registeredCapital)
            registeredCapital = registeredCapital * 10000
            registeredCapital = registeredCapital.toString()
          } else if (registeredCapital.indexOf('万') !== -1) {
            registeredCapital = registeredCapital.replace('万', '')
            registeredCapital = parseFloat(registeredCapital)
            registeredCapital = registeredCapital * 10000
            registeredCapital = registeredCapital.toString()
          }
        }
        this.subForm.enter.registeredCapital = registeredCapital
        this.subForm.enter.establishmentDate = qrInf[5].replace('年', '-').replace('月', '-').replace('日', '')
        this.subForm.term = [qrInf[6].replace('年', '-').replace('月', '-').replace('日', ''), qrInf[7].replace('年', '-').replace('月', '-').replace('日', '')]
        this.subForm.enter.registrationAuthority = qrInf[8]
        this.subForm.enter.approvalDate = qrInf[9].replace('年', '-').replace('月', '-').replace('日', '').replace(/-/g, '')
        this.subForm.enter.registrationStatus = qrInf[10]
        this.subForm.enter.operationScope = qrInf[12]
        this.subForm.enter.registeredAddress = qrInf[11]
        this.subForm.enter.postalAddress = qrInf[11]
        this.subForm.enter.businessStartDate = this.subForm.term[0].replace(/-/g, '')
        this.subForm.enter.businessEndDate = this.subForm.term[1].replace(/-/g, '')
        if (qrInf.length > 13 && qrInf[13] !== null && qrInf[13] !== '' && qrInf[14] !== null && qrInf[14] !== '') {
          const provice = qrInf[13].replace('省', '')
          const city = qrInf[14].replace('市', '')
          this.subForm.enter.postalAddressProvince = provice
          this.subForm.enter.postalAddressCity = city
          this.subForm.enter.registeredAddressProvince = provice
          this.subForm.enter.registeredAddressCity = city
          const address = qrInf[11]
          if (address.indexOf(qrInf[14]) !== -1) { // 包含具体的市 如:合肥市
            const sp_address = address.substring(address.indexOf(qrInf[14]) + qrInf[14].length)
            this.subForm.enter.postalAddressDetailed = sp_address // 具体地址
            this.subForm.enter.registeredAddressDetailed = sp_address // 具体地址
          } else if (address.indexOf(city) !== -1) { // 仅包含具体的市名 如:合肥
            const sp_address = address.substring(address.indexOf(city) + city.length)
            this.subForm.enter.postalAddressDetailed = sp_address // 具体地址
            this.subForm.enter.registeredAddressDetailed = sp_address // 具体地址
          } else {
            if (address.indexOf(qrInf[13]) !== -1) { // 仅包含具体的省 如:广东省
              const sp_address = address.substring(address.indexOf(qrInf[13]) + qrInf[13].length)
              this.subForm.enter.postalAddressDetailed = sp_address // 具体地址
              this.subForm.enter.registeredAddressDetailed = sp_address // 具体地址
            } else if (address.indexOf(provice) !== -1) { // 仅包含具体的省名 如:广东
              const sp_address = address.substring(address.indexOf(provice) + provice.length)
              this.subForm.enter.postalAddressDetailed = sp_address // 具体地址
              this.subForm.enter.registeredAddressDetailed = sp_address // 具体地址
            } else {
              this.subForm.enter.postalAddressDetailed = address // 具体地址
              this.subForm.enter.registeredAddressDetailed = address // 具体地址
            }
          }
        } else {
          const reg = /(省|市)/
          const srtInf = qrInf[11].split(reg)
          if (srtInf.length === 3) {
            if (srtInf[1].indexOf('省') !== -1) {
              // 有省没市
              this.subForm.enter.postalAddressProvince = srtInf[0]
              this.subForm.enter.postalAddressCity = ''
              this.subForm.enter.postalAddressDetailed = srtInf[2]
              this.subForm.enter.registeredAddressProvince = srtInf[0]
              this.subForm.enter.registeredAddressCity = ''
              this.subForm.enter.registeredAddressDetailed = srtInf[2]
            } else if (srtInf[1].indexOf('市') !== -1) {
              // 没省有市
              this.subForm.enter.postalAddressProvince = '广东'
              this.subForm.enter.postalAddressCity = srtInf[0]
              this.subForm.enter.postalAddressDetailed = srtInf[2]
              this.subForm.enter.registeredAddressProvince = '广东'
              this.subForm.enter.registeredAddressCity = srtInf[0]
              this.subForm.enter.registeredAddressDetailed = srtInf[2]
            }
          } else if (srtInf.length === 1) { // 没省没市
            this.subForm.enter.postalAddressProvince = '广东'
            this.subForm.enter.postalAddressCity = ''
            this.subForm.enter.postalAddressDetailed = srtInf[0]
            this.subForm.enter.registeredAddressProvince = '广东'
            this.subForm.enter.registeredAddressCity = ''
            this.subForm.enter.registeredAddressDetailed = srtInf[0]
          } else {
            if (srtInf[1] === '市') { // 没省但有两个市
              this.subForm.enter.postalAddressProvince = '广东'
              this.subForm.enter.postalAddressCity = srtInf[0]
              this.subForm.enter.postalAddressDetailed = srtInf[2]
              this.subForm.enter.registeredAddressProvince = '广东'
              this.subForm.enter.registeredAddressCity = srtInf[0]
              this.subForm.enter.registeredAddressDetailed = srtInf[2]
            } else { // 有省有市
              this.subForm.enter.postalAddressProvince = srtInf[0]
              this.subForm.enter.postalAddressCity = srtInf[2]
              this.subForm.enter.postalAddressDetailed = srtInf[4]
              this.subForm.enter.registeredAddressProvince = srtInf[0]
              this.subForm.enter.registeredAddressCity = srtInf[2]
              this.subForm.enter.registeredAddressDetailed = srtInf[4]
            }
          }
        }
        // this.qrCinfo = 1
        // this.showRegistProvenCode(this.subForm.enter.registeredAddressProvince, this.subForm.enter.registeredAddressCity)
        // this.showRegistProvenCodes(this.subForm.enter.postalAddressProvince, this.subForm.enter.postalAddressCity)
      }
    },
    // 营业执照拍照
    businessLicenseTakePhoto() {
      this.dialog.businessLicenseTakePhoto = true
      this.$nextTick(() => {
        const video = this.$refs.video
        const constraints = { audio: false, video: { width: 2592, height: 1944 }}
        const that = this
        navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
          that.dialog.mediaStreamTrack = mediaStream.getTracks()[0]
          video.srcObject = mediaStream
          video.onloadedmetadata = function(e) {
            video.play()
          }
        }).catch(function(err) {
          console.log(err)
        })
        this.dialog.canvasInterval = setInterval(function() {
          that.$refs.canvas.getContext('2d').drawImage(video, 129, 324, 2400, 1620, 0, 0, 800, 530)
          that.$refs.canvas2.getContext('2d').drawImage(video, 129, 324, 2400, 1620, 0, 0, 2592, 1717)
        }, 60)
      })
    },
    // 关闭拍摄
    businessLicenseTakePhotoClose(done) {
      this.dialog.mediaStreamTrack.stop()
      clearInterval(this.dialog.canvasInterval)
      this.dialog.businessLicenseTakePhoto = false
    },
    doBusinessLicenseTakePhoto() {
      this.uploadLoading = true
      const base64Str = this.$refs.canvas2.toDataURL()
      this.dialog.businessLicense = this.$refs.canvas.toDataURL()
      this.$refs.image.innerHTML = `<img src="${base64Str}" alt="照片">`
      this.dialog.isTakePhoto = true
      uploadImg(base64Str, this.subForm.enter.creditCode + '.png', 'busLicense').then((r) => {
        if (r.code === 0) {
          this.subForm.businessImgPath = r.path
          this.uploadLoading = false
        } else {
          this.$alert(r.msg)
        }
      })
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
    margin: 86px auto 189px;
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
  display: flex;
  div.camere-1{
      margin: 0 auto;
     div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 208px;
    border-radius: 10px;
    border: 2px dotted #2479EC;
    i{
      background: #E9F1FD;
      width: 90px;
      height: 90px;
      font-size: 15px;
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
    font-size: 15px;
    margin-bottom: 14px;
  }
a{
    color: #409EFF;
    margin-left: 54px;
    font-size: 15px;
    &:hover{
      text-decoration: underline;
    }
}
  }
}
/deep/.input-size-80{
  width: 100%;
  .el-form-item__content{
    width: 80%;
  }
}
/deep/.small-time .el-date-editor.el-input{
  width: 200px;
}
.camere div.camere-1 
.succeed{
border: 2px dotted  #67C23A;
i{
  background-color: #f0f9eb;
  color: #67C23A
}
}
.warp-doc{
    margin-left: 47px;
    margin-top: 57px;
}
</style>