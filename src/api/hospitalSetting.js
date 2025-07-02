import request from '@/utils/request'

export default {
  // list hospital setting
  getHospitalSettingList(currentPage, limit, requestObj) {
    return request({
      url: `/admin/hospital/hospitalsetting/searchPage/${currentPage}/${limit}`,
      method: 'post',
      data: requestObj // use json format
    })
  },
  // delete hospital setting
  deleteHospitalSetting(id) {
    return request({
      url: `/admin/hospital/hospitalsetting/${id}`,
      method: 'delete'
    })
  },
  batchDeleteHospitalSetting(idList) {
    return request({
      url: `/admin/hospital/hospitalsetting/batchRemove`,
      method: 'delete',
      data: idList
    })
  },
  lockHospitalSetting(id, status) {
    return request({
      url: `/admin/hospital/hospitalsetting/lock/${id}/${status}`,
      method: 'put'
    })
  },
  //  add hospital setting
  addHospitalSetting(hospitalSetting) {
    return request({
      url: `/admin/hospital/hospitalsetting/add`,
      method: 'post',
      data: hospitalSetting
    })
  },
  getHospitalSetting(id) {
    return request({
      url: `/admin/hospital/hospitalsetting/get/${id}`,
      method: 'get'
    })
  },
  updateHospitalSetting(hospitalSetting) {
    return request({
      url: `/admin/hospital/hospitalsetting/update`,
      method: 'post',
      data: hospitalSetting
    })
  }

}
