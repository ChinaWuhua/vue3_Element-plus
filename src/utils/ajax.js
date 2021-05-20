import axios from 'axios'
export default function request(params) {
  return new Promise((resolve, reject) => { // resolve, reject
    axios({
      ...params, 
      url: '/api' + params.url
    })
      .then(res => {
        let data = res.data
        if (data.status === 200) {
          resolve(data)
        } else (
          reject(data)
        )
      })
      .catch(err => {
        reject(err)
      })
  })
}