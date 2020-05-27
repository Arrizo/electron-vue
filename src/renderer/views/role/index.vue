/*
 * @Author: dachuant 
 * @Date: 2019-02-26 15:19:48 
 * @Last Modified by: liangjunjian
 * @Last Modified time: 2019-03-20 09:34:49
 */
<template>
  <div class="app-container">
    <el-form :inline="true" :model="queryParam" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="queryParam.roleName" placeholder="角色名称" clearable></el-input>
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
      <el-table-column label="角色名称" width="200">
        <template slot-scope="scope">
          {{scope.row.roleName}}
        </template>
      </el-table-column>
      <el-table-column label="备注" width="400" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button size="small" @click="addOrUpdate(scope.row.roleId)">编辑</el-button>
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
    <el-dialog :title="addOrUpdateTitle" :visible.sync="addOrUpdateVisible" width="800px" :before-close="addOrUpdateCancel">
      <el-form :model="form" ref="form" :rules="rules" :inline="true" label-width="120px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item size="mini" label="授权">
        <el-tree :data="treeData" show-checkbox  node-key="id" :props="props" ref="menuTree">
      </el-tree >
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOrUpdateCancel()">取 消</el-button>
        <el-button type="primary" @click="formSubmit()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getList, getInfo, add, update, del, getMenu } from '@/api/role'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      queryParam: {
        page: 1,
        limit: 10,
        totalPage: 0
      },
      addOrUpdateVisible: false,
      addOrUpdateTitle: '',
      form: {},
      dataListSelections: [],
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      },
      treeData: [],
      props: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 加载列表
    getDataList() {
      this.listLoading = true
      getList(this.queryParam).then(response => {
        this.list = response.data
        this.queryParam.totalPage = response.count
        this.listLoading = false
        this.getPermMenu()
      })
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
            this.form = r.role
            this.$refs.menuTree.setCheckedKeys(r.role.menuIdList)
          } else {
            this.$message.error(r.msg)
          }
        })
      }
    },
    // 取消新增或编辑
    addOrUpdateCancel() {
      this.addOrUpdateVisible = false
    },
    // 表单提交
    formSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.sumbitMenu()
          if (!this.form.roleId) {
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
          console.log('error submit')
        }
      })
    },
    // 删除
    del() {
      const ids = this.dataListSelections.map(item => {
        return item.roleId
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
    },
    getPermMenu() {
      getMenu().then((r) => {
        this.treeData = r.menuList
      })
    },
    /** 确认勾选权限 */
    sumbitMenu() {
      this.form.menuIdList = this.$refs.menuTree.getCheckedKeys()
    }
  }
}
</script>
