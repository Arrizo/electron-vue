/*
 * @Author: xiajinfeng 
 * @Date: 2019-03-05
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-07-30 18:06:36
 */
<template>
  <div class="app-container">
    <el-form :inline="true" :model="queryParam" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="queryParam.branchName" placeholder="机构名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="add()">新增</el-button>
        <el-button type="primary" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="data"
      border
      style="width: 100%;">
      <el-table-column
        header-align="center"
        align="center"
        label="序号">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <table-tree-column
        prop="branchName"
        header-align="center"
        treeKey="deptId"
        width="230"
        label="机构名称">
      </table-tree-column>
      <el-table-column
        prop="parentName"
        header-align="center"
        width="230"
        label="上级机构名称">
      </el-table-column>
      <el-table-column
        prop="branchNo"
        header-align="center"
        align="center"
        label="机构编号(联网核查账号)">
      </el-table-column>
      <el-table-column
        prop="branchTel"
        header-align="center"
        width="150"
        label="机构电话">
      </el-table-column>
      <el-table-column
        prop="branchAddress"
        header-align="center"
        width="150"
        label="机构地址">
      </el-table-column>
      <el-table-column
        prop="payNo"
        header-align="center"
        width="150"
        label="人行支付行号">
      </el-table-column>
      <el-table-column
        prop="postCode"
        header-align="center"
        width="100"
        label="邮编">
      </el-table-column>
      <el-table-column
        prop="addressCode"
        header-align="center"
        width="120"
        label="地区编码">
      </el-table-column>
      <el-table-column
        prop="retrialInstitution"
        header-align="center"
        width="150"
        label="复审机构名称">
      </el-table-column>
      <el-table-column
        prop="personName"
        header-align="center"
        width="80"
        label="负责人">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="addOrUpdate(scope.row.deptId)">编辑</el-button>
          <el-button type="danger" size="small" @click="del(scope.row.deptId)" v-show="( parseInt(scope.row.deptId) !== parseInt(deptId))">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增或编辑弹窗 -->
    <el-dialog :title="addOrUpdateTitle" :visible.sync="addOrUpdateVisible" width="800px" :before-close="addOrUpdateCancel">
      <el-form :model="form" ref="form" :rules="rules" :inline="true" label-width="120px">
        <el-form-item label="机构名称" prop="branchName">
          <el-input v-model="form.branchName"></el-input>
        </el-form-item>
        <el-form-item label="上级机构名称" prop="parentName">
          <el-input v-model="form.parentId" v-show="false" ></el-input>
          <el-input v-model="form.parentName" placeholder="请点击选择上级机构" :disabled="isShowTree"  @click.native="openTree(isShowTree)"></el-input> 
        </el-form-item>
        <el-form-item label="机构编号" prop="branchNo">
          <el-input v-model="form.branchNo"></el-input>
        </el-form-item>
        <el-form-item label="地区编码" prop="addressCode">
          <el-input v-model="form.addressCode" placeholder="请输入长度为6位数字" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="机构电话" prop="branchTel">
          <el-input v-model="form.branchTel"></el-input>
        </el-form-item>
        <el-form-item label="机构地址" prop="branchAddress">
          <el-input v-model="form.branchAddress"></el-input>
        </el-form-item>
        <el-form-item label="人行支付行号" prop="payNo">
          <el-input v-model="form.payNo"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="postCode">
          <el-input v-model="form.postCode" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="复审机构名称" prop="retrialInstitution">
          <el-input v-model="form.retrialInstitution"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="personName">
          <el-input v-model="form.personName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOrUpdateCancel()">取 消</el-button>
        <el-button type="primary" @click="formSubmit()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 上级机构树级列表 -->
    <el-dialog title="上级机构" width="500px" :visible.sync="parentMenuVisble" append-to-body> 
      <el-tree  :data="treeData" ref="deptTree">
      </el-tree >
      <div slot="footer" class="dialog-footer">
        <el-button @click="parentMenuCancel()">取 消</el-button>
        <el-button type="primary" @click="sumbitParentMenu()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
import TableTreeColumn from '@/components/table-tree-column'
import { treeDataTranslate } from '@/utils/tree'
import { getList, getInfo, add, update, del, getDeptSelect, getCurrentUserPid } from '@/api/branch'

export default {
  components: { treeTable, TableTreeColumn },
  data() {
    return {
      isShowTree: false,
      deptId: '',
      currentUserPid: '',
      parentMenuVisble: false,
      queryParam: {
        branchName: '',
        deptId: ''
      },
      addOrUpdateVisible: false,
      addOrUpdateTitle: '',
      form: {
        parentId: 0,
        parentName: ''
      },
      data: [],
      treeData: [],
      dataListSelections: [],
      rules: {
        branchName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        branchNo: [
          { required: true, message: '请输入机构编号', trigger: 'blur' }
        ],
        addressCode: [
          { required: true, message: '请输入地区编码', trigger: 'blur' }
        ],
        postCode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' }
        ],
        payNo: [
          { required: true, message: '请输入人行支付行号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getDataList()
    this.getDeptSelectList()
    this.getCuurentPid()
  },
  mounted() {
    this.deptId = this.$store.getters.user.DEPT_ID
    this.queryParam.deptId = this.$store.getters.user.DEPT_ID
  },
  methods: {
    // 获取当前用户上级机构id
    getCuurentPid() {
      getCurrentUserPid().then(r => {
        if (r.code === 0) {
          this.currentUserPid = r.data.parentId
        } else {
          this.$message.error('请求当前用户上级机构信息失败！')
        }
      })
    },
    // 加载列表
    getDataList() {
      this.listLoading = true
      getList(this.queryParam).then(response => {
        this.data = treeDataTranslate(response.data, 'deptId')
      })
    },
    reset() {
      this.queryParam = {}
      this.getDataList()
    },
    getDeptSelectList() {
      getDeptSelect(this.queryParam).then(response => {
        this.treeData = response.data
      })
    },
    /** 打开上级菜单 */
    openTree(value) {
      this.parentMenuVisble = !(value)
    },
    /** 取消上级菜单 */
    parentMenuCancel() {
      this.parentMenuVisble = false
    },
    /** 确认上级 */
    sumbitParentMenu() {
      this.form.parentId = this.$refs.deptTree.getCurrentNode().id
      this.form.parentName = this.$refs.deptTree.getCurrentNode().label
      this.parentMenuVisble = false
    },
    add() {
      this.isShowTree = false
      console.log('-=-=', this.form)
      this.addOrUpdateTitle = '新增'
      this.addOrUpdateVisible = true
      this.form.parentName = this.treeData[0].label
      this.form.parentId = this.treeData[0].id
    },
    // 新增或编辑
    addOrUpdate(deptId) {
      this.addOrUpdateVisible = true
      if (!deptId) {
        this.addOrUpdateTitle = '新增'

        this.form = {}
      } else {
        this.isShowTree = true
        this.addOrUpdateTitle = '编辑'
        getInfo(deptId).then(r => {
          if (r.code === 0) {
            this.form = r.dept
          } else {
            this.$message.error(r.msg)
          }
        })
      }
    },
    // 取消新增或编辑
    addOrUpdateCancel() {
      this.addOrUpdateVisible = false
      this.form = {}
    },
    // 表单提交
    formSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.deptId) {
            add(this.form).then((r) => {
              if (r.code === 0) {
                this.addOrUpdateVisible = false
                this.$message.success('操作成功')
                this.getDataList()
                this.getDeptSelectList()
                this.form = {}
              } else {
                this.$message.error(r.msg)
              }
            }).catch(() => {})
          } else {
            update(this.form).then((r) => {
              if (r.code === 0) {
                this.addOrUpdateVisible = false
                this.$message.success('操作成功')
                this.getDataList()
                this.getDeptSelectList()
                this.form = {}
              } else {
                this.$message.error(r.msg)
              }
            }).catch(() => {})
          }
        } else {
          console.log('error submit')
        }
      })
    },
    // 删除
    del(deptId) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const depts = []
        depts[0] = deptId
        del(depts).then((r) => {
          if (r.code === 0) {
            this.$message.success('操作成功')
            this.getDataList()
          } else {
            this.$message.error(r.msg)
          }
        }).catch(() => {})
      }).catch(() => {
        this.$message.warning('操作取消')
      })
    }
  }
}
</script>
