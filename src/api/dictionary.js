import request from '@/utils/request'

export default {
  // list data dictionary
  getDictionaryList(id) {
    return request({
      url: `/admin/dataManagement/dictionary/findChildren/${id}`,
      method: 'get'
    })
  }

}
