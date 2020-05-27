<template>
  <div class="app-wrapper" :class="classObj">
    <div class="layout-title clearfix">对公自助开户系统</div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  #app .sidebar-container{
    top: 50px;
    background-color: #fff;
  }
  .layout-title{  
    position: fixed;
    height: 50px;
    text-align: center;
    line-height: 50px;
    width: 250px;
    background-color:#409EFF;
    font-size:15px;
font-family:'SimHei';
font-weight:400;
color:#fff;
  }
</style>
