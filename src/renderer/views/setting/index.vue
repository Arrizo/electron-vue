<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="关于开户系统" name="about">
        <p>当前版本 {{version}}</p>
        <el-button type="primary" @click="checkUpdate()">检查更新</el-button>
      </el-tab-pane>
      <!-- <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import packageJson from '../../../../package.json'
export default {
  data() {
    return {
      activeName: 'about',
      version: packageJson.version,
      checkUpdateLoading: null,
      downloadLoading: null,
      updateWin: null
    }
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
          this.updateWin = this.$confirm('发现新版本，是否现在更新?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            ipcRenderer.send('updateNow')
          }).catch(() => {
            this.downloadLoading.close()
          })
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
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    checkUpdate() {
      ipcRenderer.send('update')
    }
  }
}
</script>
