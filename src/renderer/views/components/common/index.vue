<template>
  <div class=" home-container">
    <div class="home-warp">
      <el-container>
        <el-header>
          <slot name='slot-header'></slot>
        </el-header>
        <el-main>
          <slot name='slot-main'></slot>
        </el-main>
        <el-footer>
            <slot name="slot-footer"></slot>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>





<style lang='scss'>
.home-container {
  .home-warp {
    background: #fff;
    margin: 5% auto;
    width: 800px;
  }
}
.el-main{
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-header, .el-footer {
  height: auto !important;
  background: #eee;
}
.el-footer{
  padding-top: 40px;
  text-align: center;
}
</style>