<template>
  <div class="app-container">
    <el-form :inline="true" :model="queryParam" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="queryParam.username" placeholder="用户名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdate()">新增</el-button>
        <el-button type="danger" @click="del()">删除</el-button>
      </el-form-item>
    </el-form>

     <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%;" 
      @selection-change="selectHandle">
       <el-table-column
        type="selection"
        width="55"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column align="center" label='序号' width="80">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="用户名称" width="150" align="center" >
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <!-- <el-table-column label="邮箱" width="200" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="手机号码" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column> -->
       <el-table-column label="机构" width="200" align="center">
        <template slot-scope="scope">
          {{scope.row.deptName}}
        </template>
      </el-table-column>
      <el-table-column label="角色" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.roleName}}
        </template>
      </el-table-column>
      <el-table-column label="二级人行账号" width="180" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.bankAccount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="四级人行账号" width="180" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.fourLevelBankAccount}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="created_at" label="联网核查系统账号" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.onlineVerificationAccount}}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" prop="created_at" label="征信系统账号" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.creditReportUsername}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="人行密码更新时间" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.bankPasswordUpdateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作" align="center"
        width="164">
        <template slot-scope="scope">
          <el-button size="small" @click="addOrUpdate(scope.row.userId)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="queryParam.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="queryParam.limit"
      :total="queryParam.totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

    <!-- 新增或编辑弹窗 -->
    <el-dialog :title="addOrUpdateTitle" :visible.sync="addOrUpdateVisible" width="880px" :before-close="addOrUpdateCancel">
      <el-form :model="form" ref="form" :rules="rules" :inline="true" label-width="150px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="form.password" name="password" :type="inputType[0]" style="width:91%;"></el-input>
          <span class="show-pwd" @click.stop="showPwd(0)"><svg-icon icon-class="eye" /></span>
        </el-form-item>
        <el-form-item label="机构" prop="deptId">
          <el-input v-model="form.deptId" v-show="false"></el-input>
          <el-input v-model="form.deptName" placeholder="请选择机构" @click.native="openTree()" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="form.roleId" placeholder="请选择角色" style="width:93%">
            <el-option v-for="item in roleIds" :value="item.value" :key="item.value" :label='item.label'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级人行账号" prop="bankAccount">
          <el-input v-model="form.bankAccount"></el-input>
        </el-form-item>
        <el-form-item label="二级人行密码" prop="bankPassword">
          <el-input v-model="form.bankPassword" name="password" :type="inputType[1]" style="width:91%;"></el-input>
          <span class="show-pwd" @click.stop="showPwd(1)"><svg-icon icon-class="eye" /></span>
        </el-form-item>
        <el-form-item label="四级人行账号" prop="fourLevelBankAccount">
          <el-input v-model="form.fourLevelBankAccount"></el-input>
        </el-form-item>
        <el-form-item label="四级人行密码" prop="fourLevelBankPassword">
          <el-input v-model="form.fourLevelBankPassword" name="password" :type="inputType[2]" style="width:91%;"></el-input>
          <span class="show-pwd" @click.stop="showPwd(2)"><svg-icon icon-class="eye" /></span>
        </el-form-item>
        <!-- <el-form-item label="联网核查系统账号" prop="onlineVerificationAccount">
          <el-input v-model="form.onlineVerificationAccount"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="联网核查系统密码" prop="onlineVerificationPassword">
          <el-input v-model="form.onlineVerificationPassword" type="password"></el-input>
        </el-form-item> -->
        <el-form-item label="征信系统账号" prop="creditReportUsername">
          <el-input v-model="form.creditReportUsername"></el-input>
        </el-form-item>
        <el-form-item label="征信系统密码" prop="creditReportPassword">
          <el-input v-model="form.creditReportPassword" name="password" :type="inputType[3]" style="width:91%;"></el-input>
          <span class="show-pwd" @click.stop="showPwd(3)"><svg-icon icon-class="eye" /></span>
        </el-form-item>
       <el-form-item label="账号状态" prop="status">
          <el-select v-model="form.status" style="width:93%">
            <el-option v-for="item in statusItems" :value="item.value" :key="item.value" :label="item.label"></el-option>
          </el-select>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOrUpdateCancel()">取 消</el-button>
        <el-button type="primary" @click="formSubmit()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 机构树级列表 -->
    <el-dialog title="请选择机构" width="880px" :visible.sync="deptListVisble" append-to-body> 
      <el-tree  :data="treeData" ref="deptTree">
      </el-tree >
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTree()">取 消</el-button>
        <el-button type="primary" @click="selectDept()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
import { getList, getRoles, getDepts, getInfo, add, update, del } from '@/api/user'
export default {
  data() {
    return {
      inputType: new Array(4).fill('password'),
      list: null,
      listLoading: true,
      queryParam: {
        page: 1,
        limit: 10,
        totalPage: 0,
        username: '',
        deptId: ''
      },
      addOrUpdateVisible: false,
      addOrUpdateTitle: '',
      form: { status: '1' },
      roleIds: {},
      statusItems: [
        { value: 1, label: '正常' },
        { value: 2, label: '异常' }
      ],
      dataListSelections: [],
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        deptId: [
          { required: true, message: '请选择机构', trigger: 'blur' }
        ],
        bankAccount: [
          { required: true, message: '请输入二级人行账号', trigger: 'blur' }
        ],
        bankPassword: [
          { required: true, message: '请输入二级人行密码', trigger: 'blur' }
        ],
        fourLevelBankAccount: [
          { required: true, message: '请输入四级人行账号', trigger: 'blur' }
        ],
        fourLevelBankPassword: [
          { required: true, message: '请输入四级人行密码', trigger: 'blur' }
        ],
        // onlineVerificationAccount: [
        //   { required: true, message: '请输入联网核查账户', trigger: 'blur' }
        // ],
        // onlineVerificationPassword: [
        //   { required: true, message: '请输入联网核查密码', trigger: 'blur' }
        // ],
        creditReportUsername: [
          { required: true, message: '请输入征信', trigger: 'blur' }
        ],
        creditReportPassword: [
          { required: true, message: '请输入征信密码', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择账户状态', trigger: 'change' }
        ]
      },
      deptListVisble: false,
      treeData: []
    }
  },
  created() {
    this.getDataList()
    this.getRoleIds()
    this.getDeptDatas()
  },
  mounted() {
    this.queryParam.deptId = this.$store.getters.user.DEPT_ID
  },
  methods: {
    showPwd(i) {
      const types = this.inputType[i] === 'password' ? 'text' : 'password'
      this.$set(this.inputType, i, types)
    },
    // 每页数
    sizeChange(val) {
      this.queryParam.limit = val
      this.queryParam.page = 1
      this.getDataList()
    },
    // 当前页
    currentChange(val) {
      this.queryParam.page = val
      this.getDataList()
    },
    // 加载列表
    getDataList() {
      this.listLoading = true
      getList(this.queryParam).then(response => {
        this.list = response.data
        this.queryParam.totalPage = response.count
        this.listLoading = false
      })
    },
    // 获取角色列表
    getRoleIds() {
      getRoles().then(r => {
        if (r.code === 0) {
          this.roleIds = r.data
        } else {
          this.$message.error(r.msg)
        }
      })
    },
    // 获取机构数据
    getDeptDatas() {
      this.treeData = getDepts(this.queryParam).then(response => {
        this.treeData = response.data
      })
    },
    // 机构树展示
    openTree() {
      this.deptListVisble = true
    },
    // 选择机构
    selectDept() {
      this.form.deptId = this.$refs.deptTree.getCurrentNode().id
      this.form.deptName = this.$refs.deptTree.getCurrentNode().label
      this.deptListVisble = false
    },
    // 关闭选择机构页面
    closeTree() {
      this.deptListVisble = false
    },
    // 多选
    selectHandle(val) {
      this.dataListSelections = val
    },
    // 新增或编辑
    addOrUpdate(id) {
      this.addOrUpdateVisible = true
      if (!id) {
        this.addOrUpdateTitle = '新增'
        this.form = {
          menuIdList: []
        }
      } else {
        this.addOrUpdateTitle = '编辑'
        getInfo(id).then(r => {
          if (r.code === 0) {
            this.form = r.sysUser
            this.form.password = ''
            this.form.bankPassword = ''
            // this.form.onlineVerificationPassword = ''
            this.form.creditReportPassword = ''
            this.form.fourLevelBankPassword = ''
          } else {
            this.$message.error(r.msg)
          }
        })
      }
    },
    //  取消新增或编辑
    addOrUpdateCancel() {
      this.addOrUpdateVisible = false
    },
    // 提交表单
    formSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.userId) {
            add(this.form).then((r) => {
              if (r.code === 0) {
                this.addOrUpdateVisible = false
                this.$message.success('操作成功')
                this.getDataList()
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
              } else {
                this.$message.error(r.msg)
              }
            }).catch(() => {})
          }
        } else {
          console.log('更新用户列表异常')
        }
      })
    },
    // 删除
    del() {
      const ids = this.dataListSelections.map(item => {
        return item.userId
      })
      if (!ids || ids.length === 0) {
        this.$message.warning('请至少勾选一行')
        return
      }
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(ids).then((r) => {
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
