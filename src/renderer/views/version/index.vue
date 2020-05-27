<template>
 <div class="app-container">
    <el-form :inline="true" :model="queryParam" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="queryParam.version" placeholder="版本号" clearable></el-input>
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
      <el-table-column label="版本号" width="150" align="center" >
        <template slot-scope="scope">
          {{scope.row.version}}
        </template>
      </el-table-column>
      <el-table-column label="内部编号" width="200" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.innerNo}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新内容" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="200">
        <template slot-scope="scope">
          <span>{{getStatus(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建人" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.creator}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新人" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.updater}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="400">
        <template slot-scope="scope">
          <el-button size="small" @click="addOrUpdate(scope.row.id)">编辑</el-button>
          <el-button type="primary" v-if="scope.row.status == 0" size="small" @click="effect(scope.row.id)">生效</el-button>
          <el-button type="primary" v-if="scope.row.status == 1" size="small" @click="failure(scope.row.id)">失效</el-button>
          <el-button type="primary" size="small" @click="downloadExe(scope.row.id)">下载安装包</el-button>
          <el-button type="primary" size="small" @click="downloadYml(scope.row.id)">下载配置文件</el-button>
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
        <el-form-item label="版本号" prop="version">
          <el-input v-model="form.version"></el-input>
        </el-form-item>
        <el-form-item label="更新内容" prop="content">
          <el-input v-model="form.content" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
        <el-form-item label="上传文件">
            <el-upload
                ref="upload"
                :action="path"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="handleSuccess"
                :on-error="handleError"
                :on-progress="handleProgress"
                multiple
                show-file-list
                accept=".exe,.yml"
                :limit="2"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-tooltip class="item" effect="dark" content="请上传安装包及latest.yml文件" placement="top-start">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-tooltip>
              </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOrUpdateCancel()">取 消</el-button>
        <el-button type="primary" :disabled="read" @click="formSubmit()">确 定</el-button>
      </div>
    </el-dialog>
   
  </div>
  
</template>

<script>
import { getList, getInfo, add, update, del, effect, failure } from '@/api/version'
export default {
  data() {
    return {
      list: null,
      read: false,
      listLoading: true,
      queryParam: {
        page: 1,
        limit: 10,
        totalPage: 0,
        version: ''
      },
      addOrUpdateVisible: false,
      addOrUpdateTitle: '',
      form: {},
      dataListSelections: [],
      deptListVisble: false,
      treeData: [],
      baseURL: process.env.BASE_API,
      path: '',
      fileList: [],
      rules: {
        version: [
          { required: true, message: '请输入版本号', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入更新内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getDataList()
    this.getPath()
  },
  methods: {
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
    // 多选
    selectHandle(val) {
      this.dataListSelections = val
    },
    // 新增或编辑
    addOrUpdate(id) {
      this.fileList = []
      this.addOrUpdateVisible = true
      if (!id) {
        this.addOrUpdateTitle = '新增'
        this.form = {}
      } else {
        this.addOrUpdateTitle = '编辑'
        getInfo(id).then(r => {
          if (r.code === 0) {
            this.form = r.sysVersion
            this.fileList = r.sysVersion.fileList
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
          if (!this.form.versionPath) {
            this.$message.error('请先上传安装包')
            return
          }
          if (!this.form.ymlPath) {
            this.$message.error('请先上传配置文件')
            return
          }
          if (!this.form.id) {
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
          console.log('更新版本列表异常')
        }
      })
    },
    // 删除
    del() {
      const ids = this.dataListSelections.map(item => {
        return item.id
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
    getPath() {
      this.path = this.baseURL + '/sys/version/upload?token=' + localStorage.getItem('token')
    },
    // 点击文件列表中已上传的文件时调用
    handlePreview(file) {
      console.log(file.id)
    },
    // 文件删除成功后调用
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    // 文件列表删除前调用
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 超出限制时调用
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 2 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 文件上传成功时调用
    handleSuccess(response, file, fileList) {
      if (response.result.yml) {
        this.form.ymlPath = response.result.yml
      }
      if (response.result.exe) {
        this.form.versionPath = response.result.exe
      }
      this.read = false
    },
    // 文件上传失败时调用
    handleError() {
      this.$message.warning('上传失败')
    },
    handleProgress() {
      this.read = true
    },
    getStatus(val) {
      if (val === 0) {
        return '失效'
      }
      if (val === 1) {
        return '生效'
      }
    },
    effect(id) {
      this.$confirm('确定让该版本生效?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        effect(id).then((r) => {
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
    failure(id) {
      this.$confirm('确定让该版本失效?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        failure(id).then((r) => {
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
    downloadExe(id) {
      window.open(this.baseURL + '/sys/version/downloadExe/' + id + '?token=' + localStorage.getItem('token'))
    },
    downloadYml(id) {
      window.open(this.baseURL + '/sys/version/downloadYml/' + id + '?token=' + localStorage.getItem('token'))
    }
  }
}
</script>
