<template>
  <div class="app-container">
    List Hospital Setting
    <!-- Search button -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="requestObj.hospitalName" placeholder="Hospital Name"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="requestObj.hospitalCode" placeholder="Hospital Code"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">Search</el-button>
    </el-form>

    <!-- Batch Delete Button -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()">Batch Delete</el-button>
    </div>

    <!-- List in Table -->
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <!-- add selection box -->
      <el-table-column type="selection" width="55"/>
      <el-table-column type="index" width="50" label="Index"/>
      <el-table-column prop="hospitalName" label="Hospital Name"/>
      <el-table-column prop="hospitalCode" label="Hospital Code"/>
      <el-table-column prop="apiUrl" label="API Base Path" width="200"/>
      <el-table-column prop="contactName" label="Contact Name"/>
      <el-table-column prop="contactPhone" label="Contact Phone"/>
      <el-table-column label="Status" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? 'Available' : 'Unavailable' }}
        </template>
      </el-table-column>

      <!-- Add delete button -->
      <el-table-column label="Operations" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteDataById(scope.row.id)">Delete</el-button>

          <el-button
            v-if="scope.row.status==1"
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="lockHospitalSetting(scope.row.id,0)">Lock</el-button>

          <el-button
            v-if="scope.row.status==0"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="lockHospitalSetting(scope.row.id,1)">Unlock</el-button>

          <!-- add  edit button -->
          <router-link :to="'/hospitalsetting/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">Edit</el-button>
          </router-link>

        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <el-pagination
      :current-page="currentPage"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>

<script>
// import api js
import hospitalSetting from '@/api/hospitalSetting'

export default {
  // define and initiate variables
  data() {
    return {
      currentPage: 1,
      limit: 3,
      requestObj: {},
      list: [],
      total: 0,
      multipleSelection: []
    }
  },
  created() { // execute before page rendering
    // call method
    this.getList()
  },
  methods: { // define method, call api
  // lock and unlock
    lockHospitalSetting(id, status) {
      hospitalSetting.lockHospitalSetting(id, status)
        .then(response => {
          // refresh
          this.getList()
        })
    },
    // retrieve ids of selected rows
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },
    // batch delete
    removeRows() {
      this.$confirm('This operation will permanently delete the hospital setting. Continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        var idList = []
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var obj = this.multipleSelection[i]
          var id = obj.id
          idList.push(id)
        }
        hospitalSetting.batchDeleteHospitalSetting(idList)
          .then(response => {
            // Show message
            this.$message({
              type: 'success',
              message: 'Batch Delete successful!'
            })
            // Refresh page
            this.getList(1)
          })
      })
    },
    getList(page = 1) { // current page
      this.currentPage = page
      hospitalSetting.getHospitalSettingList(this.currentPage, this.limit, this.requestObj)
        .then(response => { // response
          this.list = response.data.records
          this.total = response.data.total
          console.log(response)
        }) // request success
        .catch(error => {
          console.log(error)
        }) // request fail
    },
    // delete method
    deleteDataById(id) {
      this.$confirm('This operation will permanently delete the hospital setting. Continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // Call API
        hospitalSetting.deleteHospitalSetting(id)
          .then(response => {
            // Show message
            this.$message({
              type: 'success',
              message: 'Delete successful!'
            })
            // Refresh page
            this.getList(1)
          })
      })
    }
  }

}
</script>
