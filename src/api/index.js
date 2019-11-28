import axios from 'axios'

export function serviceLogin(param) {
  return axios.post('https://www.fastmock.site/mock/12e9010cbb8f72411985efd3130dbd1b/mediacl/login', param).then(
    response => {
      return Promise.resolve(response.data)
    }
  )
}

export function serviceMyInfoSubmit(param) {
  return axios.post('https://www.fastmock.site/mock/12e9010cbb8f72411985efd3130dbd1b/mediacl/login', param).then(
    response => {
      return Promise.resolve(response.data)
    }
  )
}