/**
 * Created by qiushaoyu on 2017/12/6.
 */
import Qs from 'qs'
import baseUrl from '../../static/baseUrl.json'
let base_url = baseUrl.base_url;
/*if (process.env.NODE_ENV == 'production') {
 // 测试部使用的生产环境，上线时改为发布环境
 base_url = '/server/shop/web/web/';
 } else {
 // 开发环境
 // base_url = '/api/';

 base_url = 'http://192.168.0.247/mockjsdata/39/';
 }*/

export default{
  // 基础url前缀
  baseURL: base_url,
  // baseURL: "http://zzb.tunnel.echomod.cn",
  //设置超时时间
  timeout: 10000,
  //返回数据类型
  responseType: 'json', // default
  // 请求头信息
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded, multipart/form-data'
    // 'Content-Type': 'application/json'
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },


  // url: '/get',
  // method: 'POST',
  transformRequest: [
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs
    function (data) {
      //由于使用的form-data传数据所以要格式化
      // data = JSON.parse(data);
      data = Qs.stringify(data);
      return data
    }
  ],
  transformResponse: [
    // 这里提前处理返回的数据
    function (data) {
      // console.log(data)
      if(data.code == 410){
        console.error("登录超时")
        window.location.href = "/";
      }
      return data;
    }
  ],

  //parameter参数
  params: {},

  /* paramsSerializer: function (params) {
   return Qs.stringify(params)
   },
   */
  //post参数
  data: {},



  // withCredentials: false, // default


  //将upload事件注释掉，防止跨域状态下发起option请求

  // onUploadProgress: function(progressEvent) {
  // 	// Do whatever you want with the native progress event
  // },


  // onDownloadProgress: function(progressEvent) {
  // 	// Do whatever you want with the native progress event
  // },


  // maxContentLength: 2000,


  /*  validateStatus: function (status) {
   return status >= 200 && status < 300; // default
   },*/


  // maxRedirects: 5, // default
}
