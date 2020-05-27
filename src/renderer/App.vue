<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { removeToken } from '@/utils/auth'

export default {
  name: 'App',
  mounted() {
    ipcRenderer.on('message', (event, { message, data }) => {
      if (message === 'checking-for-update') {
        // this.checkUpdateLoading = this.$loading({
        //   lock: true,
        //   text: '正在检查更新',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // })
      } else if (message === 'update-not-available') {
        // this.checkUpdateLoading.close()
        // this.$message({
        //   message: '当前版本为最新版本',
        //   type: 'success'
        // })
      } else if (message === 'update-available') {
        // this.checkUpdateLoading.close()
      } else if (message === 'downloadProgress') {
        this.downloadLoading = this.$loading({
          lock: true,
          text: '正在下载',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      } else if (message === 'isUpdateNow') {
        this.$message.warning('检测到有新版本，正在更新...')
        ipcRenderer.send('updateNow')
        ipcRenderer.removeAllListeners('message')
      }
    })
    // 检查更新
    // if (process.env.NODE_ENV === 'production') ipcRenderer.send('update')

    // 关闭窗口前触发
    ipcRenderer.on('close', (event) => {
      removeToken()
    })
  }
}
</script>
<style lang="scss">
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
