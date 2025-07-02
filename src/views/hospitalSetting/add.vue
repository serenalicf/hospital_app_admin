<template>
  <div class="app-container">
    Add Hospital Setting

    <el-form label-width="120px">
      <el-form-item label="Hospital Name">
        <el-input v-model="hospitalSetting.hospitalName"/>
      </el-form-item>
      <el-form-item label="Hospital Code">
        <el-input v-model="hospitalSetting.hospitalCode"/>
      </el-form-item>
      <el-form-item label="API Base Path">
        <el-input v-model="hospitalSetting.apiUrl"/>
      </el-form-item>
      <el-form-item label="Contact Name">
        <el-input v-model="hospitalSetting.contactName"/>
      </el-form-item>
      <el-form-item label="Contact Phone">
        <el-input v-model="hospitalSetting.contactPhone"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">Save</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import hospitalSetting from '@/api/hospitalSetting'

export default {
  data() {
    return {
      hospitalSetting: {}
    }
  },
  created() { // execute before page rendering
  // retrieve id from router
  // call api to get hospital sestting
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getHospitalSetting(id)
    } else {
      this.hospitalSetting = {}
    }
  },
  methods: {
    // get hospital setting by id
    getHospitalSetting(id) {
      hospitalSetting.getHospitalSetting(id)
        .then(response => {
          this.hospitalSetting = response.data
        })
    },
    save() {
      hospitalSetting.addHospitalSetting(this.hospitalSetting)
        .then(response => {
          // alert
          this.$message({
            type: 'success',
            message: 'Save successful!'
          })
          // rediect to list page, use router
          this.$router.push({ path: '/hospitalsetting/list' })
        })
    },
    update() {
      hospitalSetting.updateHospitalSetting(this.hospitalSetting)
        .then(response => {
          // alert
          this.$message({
            type: 'success',
            message: 'Update successful!'
          })
          // rediect to list page, use router
          this.$router.push({ path: '/hospitalsetting/list' })
        })
    },
    saveOrUpdate() {
      // check it's save or update
      if (!this.hospitalSetting.id) {
        this.save()
      } else {
        this.update()
      }
    }
  }
}
</script>

