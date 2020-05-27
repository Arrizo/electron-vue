<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary"
                   @click="addOrUpdate()">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- <tree-table :data="data" border>
      <el-table-column label="菜单名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="100">
        <template slot-scope="scope">
          <span>{{ getType(scope.row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="url">
        <template slot-scope="scope">
          <span>{{ scope.row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="授权">
        <template slot-scope="scope">
          <span>{{ scope.row.perms }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="addOrUpdate(scope.row.menuId)">编辑</el-button>
          <el-button type="danger" @click="deleteMenu(scope.row.menuId)">删除</el-button>
        </template>
      </el-table-column>
    </tree-table> -->
    <el-table :data="data"
              border
              style="width: 100%;">
      <el-table-column prop="menuId"
                       header-align="center"
                       align="center"
                       width="80"
                       label="ID">
      </el-table-column>
      <table-tree-column prop="name"
                         header-align="center"
                         treeKey="menuId"
                         width="150"
                         label="名称">
      </table-tree-column>
      <el-table-column prop="parentName"
                       header-align="center"
                       align="center"
                       width="120"
                       label="上级菜单">
      </el-table-column>
      <!-- <el-table-column
        header-align="center"
        align="center"
        label="图标">
        <template slot-scope="scope">
          <icon-svg :name="scope.row.icon || ''"></icon-svg>
        </template>
      </el-table-column> -->
      <el-table-column prop="type"
                       header-align="center"
                       width="80"
                       align="center"
                       label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0"
                  size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 1"
                  size="small"
                  type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === 2"
                  size="small"
                  type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="url"
                       header-align="center"
                       align="center"
                       :show-overflow-tooltip="true"
                       label="菜单URL">
      </el-table-column>
      <el-table-column prop="perms"
                       header-align="center"
                       align="center"
                       :show-overflow-tooltip="true"
                       label="授权标识">
      </el-table-column>
      <el-table-column prop="orderNum"
                       header-align="center"
                       width="80"
                       align="center"
                       label="排序号">
      </el-table-column>
      <el-table-column fixed="right"
                       header-align="center"
                       align="center"
                       width="150"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="small"
                     @click="addOrUpdate(scope.row.menuId)">编辑</el-button>
          <el-button type="danger"
                     size="small"
                     @click="deleteMenu(scope.row.menuId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增或编辑弹窗 -->
    <el-dialog :title="addOrUpdateTitle"
               :visible.sync="addOrUpdateVisible"
               width="800px"
               :before-close="addOrUpdateCancel">
      <el-form :model="form"
               ref="form"
               :rules="rules"
               :inline="true"
               label-width="120px">
        <el-form-item label="菜单名称"
                      prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型"
                      prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label=0>目录</el-radio>
            <el-radio :label=1>菜单</el-radio>
            <el-radio :label=2>按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上级菜单"
                      prop="parentId">
          <el-input v-model="form.parentId"
                    v-show="false"></el-input>
          <el-input v-model="form.parentName"
                    @click.native="openTree()"
                    readonly></el-input>
        </el-form-item>
        <el-form-item label="url"
                      prop="url"
                      v-if="form.type == 1">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="授权"
                      prop="perms"
                      v-if="form.type != 0">
          <el-input v-model="form.perms"></el-input>
        </el-form-item>
        <el-form-item label="排序"
                      prop="orderNum">
          <el-input v-model="form.orderNum"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addOrUpdateCancel()">取 消</el-button>
        <el-button type="primary"
                   @click="formSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 上级菜单树级列表 -->
    <el-dialog title="上级菜单"
               width="500px"
               :visible.sync="parentMenuVisble"
               append-to-body>
      <el-tree :data="treeData"
               ref="menuTree">
      </el-tree>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="parentMenuCancel()">取 消</el-button>
        <el-button type="primary"
                   @click="sumbitParentMenu()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
 
<script>
import treeTable from '@/components/TreeTable'
import TableTreeColumn from '@/components/table-tree-column'
import { treeDataTranslate } from '@/utils/tree'
import { getList, getParentList, getInfo, add, update, del } from '@/api/menu'

export default {
  components: { treeTable, TableTreeColumn },
  data() {
    return {
      form: {},
      addOrUpdateVisible: false,
      parentMenuVisble: false,
      addOrUpdateTitle: '',
      data: [],
      treeData: [],
      types: [
        {
          name: '目录',
          value: 0
        }, {
          name: '菜单',
          value: 1
        }, {
          name: '按钮',
          value: 2
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ]

      }
    }
  },
  created() {
    this.getDataList()
    this.getParentDataList()
  },
  methods: {
    getDataList() {
      this.listLoading = true
      getList().then(data => {
        this.data = treeDataTranslate(data.menus, 'menuId')
        this.listLoading = false
      })
    },
    getParentDataList() {
      this.listLoading = true
      getParentList().then(response => {
        this.treeData = response.menuList
        this.listLoading = false
      })
    },
    getType(type) {
      switch (type) {
        case 0:
          return '目录'
        case 1:
          return '菜单'
        case 2:
          return '按钮'
        default:
          return ''
      }
    },
    /**  新增或编辑 */
    addOrUpdate(id) {
      this.addOrUpdateVisible = true
      if (!id) {
        this.addOrUpdateTitle = '新增'
        this.form = {
          type: 0,
          parentName: '一级菜单',
          parentId: 0
        }
      } else {
        this.addOrUpdateTitle = '编辑'
        getInfo(id).then(r => {
          if (r.code === 0) {
            this.form = r.sysMenu
          } else {
            this.$message.error(r.msg)
          }
        })
      }
    },
    /**   取消新增或编辑*/
    addOrUpdateCancel() {
      this.addOrUpdateVisible = false
    },
    /**  提交表单*/
    formSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.menuId) {
            add(this.form).then((r) => {
              if (r.code === 0) {
                this.addOrUpdateVisible = false
                this.$message.success('操作成功')
                this.getDataList()
                this.getParentDataList()
              } else {
                this.$message.error(r.msg)
              }
            }).catch(() => { })
          } else {
            update(this.form).then((r) => {
              if (r.code === 0) {
                this.addOrUpdateVisible = false
                this.$message.success('操作成功')
                this.getDataList()
                this.getParentDataList()
              } else {
                this.$message.error(r.msg)
              }
            }).catch(() => { })
          }
        } else {
          console.log('error submit')
        }
      })
    },
    /**  删除*/
    deleteMenu(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(id).then((r) => {
          if (r.code === 0) {
            this.$message.success('操作成功')
            this.getDataList()
            this.getParentDataList()
          } else {
            this.$message.error(r.msg)
          }
        }).catch(() => { })
      }).catch(() => {
        this.$message.warning('操作取消')
      })
    },
    /** 打开上级菜单 */
    openTree() {
      this.parentMenuVisble = true
    },
    /** 取消上级菜单 */
    parentMenuCancel() {
      this.parentMenuVisble = false
    },
    /** 确认上级 */
    sumbitParentMenu() {
      this.form.parentId = this.$refs.menuTree.getCurrentNode().id
      this.form.parentName = this.$refs.menuTree.getCurrentNode().label
      this.parentMenuVisble = false
    }
  }
}
</script>
