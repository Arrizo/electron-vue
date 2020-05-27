<template>
<el-dialog :visible.sync="dialog" center :close-on-click-modal='false' :show-close='false'>
    <el-row>
      <el-col :span="16">
        <h3 class="h3">{{dialogTitle}}</h3>
      </el-col>
      <el-col :span="8" class="dialog-warp">
        <img src="../../../assets/img/logo/dialog.png" alt="">
      </el-col>
    </el-row>
<span slot="footer" class="content-dialog">
  <slot name="dialog-button"></slot>
</span>
</el-dialog>
</template>
<script>
export default {
  name: 'diol',
  props: {
    dialogTitle: {
      type: String,
      default: '请先完成扫描开户单位证明文件'
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  }
}
</script>
<style lang='scss' scoped>
.content-dialog{
  font-size: 18px;
display: flex;
justify-content: center;
align-items: flex-end;
}
/deep/
.el-dialog{
  width: 540px;
  height: 340px;

}
.dialog-warp{
  img{
    max-width: 100%;
    max-height: 100%;
  }
}
.h3{
  text-align: right;
  margin-top: 25px;
  color: #666666;
}
/deep/
.el-dialog__footer{
      width: 100%;
    bottom: 100px;
    position: absolute;
}
</style>