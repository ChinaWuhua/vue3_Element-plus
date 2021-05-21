import axios from 'axios'
import store from '@/store/index'
import router from '@/router/index'
// import {ElMessage} from 'element-plus'
const token = store?.state?.userInfo?.user?.token
export default function request(params) {
  return new Promise((resolve, reject) => {
    axios({
      ...params,
      headers: { 'Authorization': token }
    })
      .then(res => {
        let data = res.data
        if (data.status === 200) {
          resolve(data)
        } else if (data.status === 401) {
          // ElMessage.warning(data.msg)
          store.dispatch('createUserInfo', null)
          localStorage.setItem('userInfo', null)
          router.push('/login')
        } else (
          reject(data)
        )
      })
      .catch(err => {
        reject(err)
      })
  })
}