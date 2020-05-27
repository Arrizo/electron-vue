<template>
       <div><span class="process process-1"></span><span class="process process-2"></span>
            <div class="open-type">{{headerTitle}}</div>
          </div>
</template>
<script>
export default {
  name: 'title-name',
  props: {
    headerTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  }

}
</script>
<style scoped lang='scss'>
  .open-type {
    color: #666666;
    font-size: 20px;
    margin: 12px auto 30px;
  }
  .process {
    display: inline-block;
    height: 6px;
    background: rgba(36, 121, 236, 1);
    border-radius: 4px;
    margin-right: 10px;
  }
  .process-1 {
    width: 25px;
  }
  .process-2 {
    width: 50px;
  }
</style>