import {
  baseUrl
} from './env'

export function get (url, data) {
  return ajax(url, data)
}

export function post (url, data) {
  return ajax(url, data, 'post')
}

function ajax (url = '', data = {}, type = 'get', method = 'fetch') {
  type = type.toUpperCase()
  url = baseUrl + url
  if (type === 'GET') {
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }
  return new Promise((resolve, reject) => {
    let requestObj = new XMLHttpRequest()
    let sendData = ''
    if (type === 'POST') {
      Object.keys(data).forEach((key, index) => {
        if ((index + 1) === Object.keys(data).length) {
          sendData += key + '=' + data[key]
        } else {
          sendData += key + '=' + data[key] + '&'
        }
      })
    }
    requestObj.open(type, url, true)
    requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    requestObj.send(sendData)
    requestObj.onreadystatechange = () => {
      if (requestObj.readyState === 4) {
        if (requestObj.status === 200) {
          let obj = requestObj.response
          if (typeof obj !== 'object') {
            obj = JSON.parse(obj)
          }
          resolve(obj)
        } else {
          reject(requestObj)
        }
      }
    }
  })
}
