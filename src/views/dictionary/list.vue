<template>
  <div class="app-container">
    <div class="el-toolbar">
      <div class="el-toolbar-body" style="justify-content: flex-start;">
        <a href ="http://localhost:8202/admin/dataManagement/dictionary/export" target="_blank">
          <el-button type="text">
            <i class="fa fa-plus"/> Export
          </el-button>
        </a>
        <el-button type="text" @click="importData">
          <i class="fa fa-plus"/> Import
        </el-button>
      </div>
    </div>
    <el-table
      :data="list"
      :load="getChildrens"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%"
      row-key="id"
      border
      lazy>
      <el-table-column label="Name" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Code" width="220">
        <template slot-scope="{row}">
          {{ row.dictCode }}
        </template>
      </el-table-column>
      <el-table-column label="Value" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Creation Time" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- add pop up dialog for import -->
    <el-dialog :visible.sync="dialogImportVisible" title="Import" width="480px">
      <el-form label-position="right" label-width="170px">
        <el-form-item label="File">
          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="'http://localhost:8202/admin/dataManagement/dictionary/import'"
            class="upload-demo">
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">
              Only xls files not exceeding 500kb can be uploaded
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false">
          Cancel
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dictionary from '@/api/dictionary'

export default {
  data() {
    return {
      list: [], // data dictionary list,
      dialogImportVisible: false // set window pop up
    }
  },
  created() {
    this.getDictionaryList(1) // get all data dictinary
  },
  methods: {
    // data dictionary
    getDictionaryList(id) {
      dictionary.getDictionaryList(id)
        .then(response => {
          this.list = response.data
        })
    },
    getChildrens(tree, treeNode, resolve) { // get next child level recursively(1,2,3)
      dictionary.getDictionaryList(tree.id).then(response => {
        resolve(response.data)
      })
    },
    exportData() {
      window.location.href = 'http://localhost:8202/admin/dataManagement/dictionary/export'
    },
    importData() {
      this.dialogImportVisible = true
    },
    onUploadSuccess() {
      this.dialogImportVisible = false
    
    }
  }
}
</script>
