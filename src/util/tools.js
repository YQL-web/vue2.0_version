/**
 * Created by qiushaoyu on 2017/12/12.
 */
const crypto = require('crypto');



/********************数据签名参数配置****************************/
/**
 * cookie加密所需要的密钥
 * @type {string}
 */
const secret_key = 'zm_shop_trade';
/************************************************************/

export default {
  /**
   * Md5加密
   * @param str 字符串
   * @returns {*}
   */
  zmMd5(str){
    const hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex')
  },
  /**
   * 加密
   * @param str
   * @param pwd
   * @return {*}
   */
  zmEncrypt(str, pwd) {
    if (pwd == null || pwd.length <= 0) {
      alert("Please enter a password with which to encrypt the message.");
      return null;
    }
    let prand = "";
    for (let i = 0; i < pwd.length; i++) {
      prand += pwd.charCodeAt(i).toString();
    }
    let sPos = Math.floor(prand.length / 5);
    let mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5));
    let incr = Math.ceil(pwd.length / 2);
    let modu = Math.pow(2, 31) - 1;
    if (mult < 2) {
      alert("Algorithm cannot find a suitable hash. Please choose a different password. \nPossible considerations are to choose a more complex or longer password.");
      return null;
    }
    let salt = Math.round(Math.random() * 1000000000) % 100000000;
    prand += salt;
    while (prand.length > 10) {
      prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
    }
    prand = (mult * prand + incr) % modu;
    let enc_chr = "";
    let enc_str = "";
    for (let i = 0; i < str.length; i++) {
      enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
      if (enc_chr < 16) {
        enc_str += "0" + enc_chr.toString(16);
      } else enc_str += enc_chr.toString(16);
      prand = (mult * prand + incr) % modu;
    }
    salt = salt.toString(16);
    while (salt.length < 8)salt = "0" + salt;
    enc_str += salt;
    return enc_str;
  },
  /**
   * 解密
   * @param str
   * @param pwd
   * @return {*}
   */
  zmDecrypt(str, pwd) {
    if (str == null || str.length < 8) {
      alert("A salt value could not be extracted from the encrypted message because it's length is too short. The message cannot be decrypted.");
      return;
    }
    if (pwd == null || pwd.length <= 0) {
      alert("Please enter a password with which to decrypt the message.");
      return;
    }
    let prand = "";
    for (let i = 0; i < pwd.length; i++) {
      prand += pwd.charCodeAt(i).toString();
    }
    let sPos = Math.floor(prand.length / 5);
    let mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5));
    let incr = Math.round(pwd.length / 2);
    let modu = Math.pow(2, 31) - 1;
    let salt = parseInt(str.substring(str.length - 8, str.length), 16);
    str = str.substring(0, str.length - 8);
    prand += salt;
    while (prand.length > 10) {
      prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
    }
    prand = (mult * prand + incr) % modu;
    let enc_chr = "";
    let enc_str = "";
    for (let i = 0; i < str.length; i += 2) {
      enc_chr = parseInt(parseInt(str.substring(i, i + 2), 16) ^ Math.floor((prand / modu) * 255));
      enc_str += String.fromCharCode(enc_chr);
      prand = (mult * prand + incr) % modu;
    }
    return enc_str;
  },
  /**
   * 保存用户信息到cookie
   * @param user  用户信息
   * @constructor
   */
  zmSaveUser (user) {
    let Days = 7; //此 cookie 将被保存 7 天
    let exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    let userInfo = JSON.stringify(user);
    userInfo = encodeURI(userInfo);
    document.cookie = "zm_bj_user=" + this.zmEncrypt(userInfo, secret_key) + ";expires=" + exp.toGMTString();
  },
  /**
   * 从cookie获取用户信息
   * @constructor
   */
  zmGetUser () {
    let user = this.zmGetCookie("zm_bj_user");
    user = decodeURI(user);
    return JSON.parse(user);
  },
  /**
   * 得到指定的cookie
   * @param objName
   * @return {*}
   */
  zmGetCookie(objName) {  //获取指定名称的cookie的值
    let arr = document.cookie.match(new RegExp("(^| )" + objName + "=([^;]*)(;|$)"));
    if (arr != null) {
      return this.zmDecrypt(arr[2], secret_key);
    }
    return null;
  },
  /**
   * 删除user cookie
   * @constructor
   */
  zmQuitUser () {
    document.cookie = "zm_bj_user=;expires=" + new Date(0).toGMTString();
  },
  /**
   * 获取cookie
   * @param name
   * @returns {*}
   */
  getCookie(name){
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
  /**
   * 设置cookie
   * @param name
   * @param value
   */
  setCookie(name, value){
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  },
  /**
   *保存用户信息到sessionStorage
   * @param user
   */
  zmSessionUser(user){
    let str = encodeURI(JSON.stringify(user));
    sessionStorage.setItem("ZMUser", zmEncrypt(str, secret_key));
  },
  /**
   * 从sessionStorage删除用户信息
   * @constructor
   */
  zmGetSessionUser(){
    let str = decodeURI(sessionStorage.getItem("ZMUser"));
    str = decodeURI(str);
    return JSON.parse(str);
  },
  /**
   * 保存用户信息到localstorage
   * @param user
     */
  zmSaveLocalStorage(user){
    if(typeof user === 'object'&& Array.isArray(user)){
      let storage = window.localStorage;
      let userInfo = [ ],userInfoStr = '';
      user.forEach(item=>{
        userInfo.push(JSON.stringify(item))
      });
      userInfoStr = userInfo.join('|');
      userInfoStr = encodeURI(userInfoStr);
      storage.setItem("ZMUser", this.zmEncrypt(userInfoStr, secret_key));
    }
    else
      Promise.reject('请传入数组对象')
  },
  /**
   * 从localstorage获取用户信息
   */
  zmGetLocalStorage(){
    let storage = window.localStorage;
    if(!storage.getItem('ZMUser')) return false;
    let userInfoStr = decodeURI(this.zmDecrypt(storage.getItem('ZMUser'),secret_key))
    let userInfo = [];
    userInfoStr.split('|').forEach(item=>{
      userInfo.push(JSON.parse(item))
    });
    return userInfo;
  },
  /**
   * 生成UUID
   * @returns {string}
   */
  getUUid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid;
  },
  /**
   * base64转buffer
   * @param base64
   * @returns {ArrayBuffer}
   * @private
   */
  _base64ToArrayBuffer(base64) {
    let binary_string = window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  },
  /**
   * 获得一个完整可用的url
   * @param api
   * @param log
   */
  zmUrl (apiObj, parameter, log) {
    let api = this.sjUrl(apiObj.api, parameter);
    return api;
  },
  sjUrl (api, parameter) {
    let apiUrl = "";
    let parArray = api.match(/\{(.+?)\}/);
    if (parArray != null) {
      let str = api.split(parArray[0]);
      if (str[1]) {
        apiUrl += str[0] + "?" + parArray[1] + "=" + parameter[parArray[1]];
        apiUrl += this.forUrl(str[1], parameter);
      } else {
        apiUrl += str[0] + "?" + parArray[1] + "=" + parameter[parArray[1]];
      }
    } else {
      apiUrl = api;
    }
    return apiUrl;
  },
  forUrl(api, parameter){
    let url = "";
    let parArray = api.match(/\{(.+?)\}/);
    if (parArray != null) {
      let str = api.split(parArray[0]);
      if (str[1]) {
        url += "&" + parArray[1] + "=" + parameter[parArray[1]];
        url += this.forUrl(str[1], parameter);
      } else {
        url += "&" + parArray[1] + "=" + parameter[parArray[1]];
      }
    } else {
      url = api;
    }
    return url;
  }
}
