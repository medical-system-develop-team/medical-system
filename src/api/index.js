import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888/api'
//axios.defaults.withCredentials=true

export function serviceLogin(param) {
  return axios.post('/login', param).then(
    response => {
      return Promise.resolve(response.data)
    }
  )
}

export function commonApi(url, param) {
  return axios.post(url, param).then(res => {
    return Promise.resolve(res.data)
  })
}

export function checkuser(param) {
  return axios.post('https://www.fastmock.site/mock/12e9010cbb8f72411985efd3130dbd1b/mediacl/login', param).then(
    response => {
      return Promise.resolve(response.data)
    }
  )
}

export function adduser(param) {
  return axios.post('https://www.fastmock.site/mock/12e9010cbb8f72411985efd3130dbd1b/mediacl/login', param).then(
    response => {
      return Promise.resolve(response.data)
    }
  )
}

export function checkdepart(param) {
  return axios.post('https://www.fastmock.site/mock/12e9010cbb8f72411985efd3130dbd1b/mediacl/login', param).then(
    response => {
      return Promise.resolve(response.data)
    }
  )
}

export function serviceMyInfoSubmit(param) {
  return axios.post('/ChangeUserMyInfo', param).then(
    response => {
      return Promise.resolve(response.data)
    }
  )
}

export function getUserInfo() {
  return axios.post('/UserMyInfo').then(
    response => {
      return Promise.resolve(response.data)
    }
  )
}

export function getRecords() {
  return axios.post('https://www.fastmock.site/mock/12e9010cbb8f72411985efd3130dbd1b/mediacl/login').then(
    response => {
      return Promise.resolve(response.data)
    }
  )
}