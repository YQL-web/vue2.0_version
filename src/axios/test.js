/**
 * Created by qiushaoyu on 2017/12/6.
 */

import axios from 'axios'
import config from './config'
import tools from '../util/tools'

/**
 * 阿里云OSS参数配置
 */
let client = new OSS.Wrapper({
  region: 'oss-cn-shenzhen',
  accessKeyId: '0xf9Sr6u6I6zyzG2',
  accessKeySecret: 'eioDBIPuhvWz1QlpMZNeOaxmU9lmGO',
  bucket: 'fatjiong',
  object: 'upload/shop/'
});


exports.install = (Vue, options) => {
  Vue.prototype.$http = {
    /**
     * axios Post请求
     * @param apiObj  服务器API
     * @param params  对象参数
     * @returns {Promise}
     * @constructor
     */
    zmPost (apiObj, params) {
      return new Promise((resolve, reject) => {
        config.params = {};
        axios.post(apiObj.api, params, config)
          .then(res => {
            //响应成功回调
            if (res.data.code != 200) {
              reject(res.data.code, res.data.message);  // 服务器错误码返回
              return false;
            }
            resolve(res.data)
          })
          .catch(err => {
            //响应失败回调  统一返回错误码 500
            reject(500, "服务器响应失败")
          })
      })
    },
    /**
     * axios  Get请求
     * @param apiObj  服务器api
     * @param params  路径参数
     * @returns {Promise}
     * @constructor
     */
    zmGet(apiObj, params){
      return new Promise((resolve, reject) => {
        config.params = params;
        axios.get(apiObj.api, config)
          .then(res => {
            //响应成功回调
            if (res.data.code != 200) {
              reject(res.data.code, res.data.message);  // 服务器错误码返回
              return false;
            }
            resolve(res.data)
          })
          .catch(err => {
            //响应失败回调  统一返回错误码 500
            reject(500, "服务器响应失败")
          })
      })
    },
    /**
     * 阿里云OSS文件上传
     * @param file       上传文件DOM
     * @returns {Promise}
     * @constructor
     */
    zmUpload (file) {
      let storeAs = tools.getUUid();
      // let file = e.target.files[0];
      return new Promise((resolve, reject) => {
        client.multipartUpload(storeAs, file).then(function (result) {
          let src = "http://imageqsy.oss-cn-shanghai.aliyuncs.com/" + result.name;
          resolve(src)
        }).catch(function (err) {
          reject(err)
        });
      })
    },
    /**
     * base64上传OSS
     * @param base64
     * @constructor
     */
    zmBase64Upload (base64){
      let co = require('co');
      let storeAs = tools.getUUid() + ".png";
      let pic = base64.substring(base64.indexOf("base64,") + 7, base64.length);
      let buffer = tools._base64ToArrayBuffer(pic);
      return new Promise((resolve, reject) => {
        co(function*() {
          let result = yield client.put(storeAs, new Buffer(buffer));
          resolve(result);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }
}

//添加请求拦截器
axios.interceptors.request.use(function (config) {
  //在发送请求之前做些什么
  let inExclude = exclude.some((value) => {
    return config.url.includes(value);
  });
  let user = tools.zmGetUser();
  if (!inExclude) {
    if (config.method == "get") {
      config.params.token = user.token;
    } else {
      config.data.token = user.token;
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

let exclude = ['login/login'];

