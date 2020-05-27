<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on"  :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="60px">
      <h3 class="title">对公自助开户系统</h3>
      <h5 class="title-1">Bocorder System</h5>
      <el-form-item prop="username" label="账号">
     
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
      
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="请输入密码"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class="tips">
        <!-- <span style="margin-right:20px;">username: admin</span>
        <span> password: admin</span> -->
      </div>
    </el-form>

    <el-dialog title="检查更新" :visible.sync="dialogVisible" width="600px" class="dialog" data-v-f3f1212229>
      <p>检测到有新版本，正在更新...</p>
    </el-dialog>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import { ipcRenderer } from 'electron'
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      pwdType: 'password',
      checkUpdateLoading: null,
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  mounted() {
    ipcRenderer.on('message', (event, { message, data }) => {
      if (message === 'checking-for-update') {
        this.checkUpdateLoading = this.$loading({
          lock: true,
          text: '正在检查更新',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      } else if (message === 'update-not-available') {
        this.checkUpdateLoading.close()
        this.$message({
          message: '当前版本为最新版本',
          type: 'success'
        })
      } else if (message === 'update-available') {
        this.checkUpdateLoading.close()
        if (!this.downloadLoading) {
          this.downloadLoading = this.$loading({
            lock: true,
            text: '正在下载',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
      } else if (message === 'downloadProgress') {
        //
      } else if (message === 'isUpdateNow') {
        if (!this.updateWin) {
          this.dialogVisible = true
          ipcRenderer.send('updateNow')
          this.downloadLoading.close()
        }
      } else if (message === 'error') {
        this.checkUpdateLoading.close()
        this.$message({
          message: '检查更新异常',
          type: 'error'
        })
      }
    })
  },
  methods: {
    showPwd() {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
    },
    handleLogin() {
      this.$router.push({ path: '/' })
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
            var message = localStorage.getItem('messages')
            this.$message({
              message: message,
              type: 'warning'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
// .login-container {
//   .el-input {
//     display: inline-block;
//     height: 47px;
//     width: 85%;
//     input {
//       background: transparent;
//       border: 0px;
//       -webkit-appearance: none;
//       border-radius: 0px;
//       padding: 12px 5px 12px 15px;
//       color: $light_gray;
//       height: 47px;
//       &:-webkit-autofill {
//         -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
//         -webkit-text-fill-color: #fff !important;
//       }
//     }
//   }
//   .el-form-item {
//     border: 1px solid rgba(255, 255, 255, 0.1);
//     background: rgba(0, 0, 0, 0.1);
//     border-radius: 5px;
//     color: #454545;
//   }
// }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#fff;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: #fff url('../../assets/img/login_bg.png') no-repeat fixed top left / 40% 100%;
  .login-form {
    position: absolute;
    left: 0;
    right: -40%;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 260px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    margin: 0px auto 9px auto;
    text-align: center;
    font-weight: bold;
    font-size:26px;
    font-family:'SimHei';
    font-weight:bold;
    color:rgba(0,48,87,1);
  }
  .title-1{
    text-align: center;
    margin: 0px 0px 50px;
font-size:14px;
font-family:Candara;
font-weight:400;
color:rgba(16,185,202,1);
opacity:0.6;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

</style>
