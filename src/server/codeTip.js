/**
 * Created by qiushaoyu on 2017/12/25.
 */
export default {
  errorCode(code, message){
    switch (code) {
      case 500:
        return "服务器开小差了o(╯□╰)o";
        break;
      case 410:
        return "登录超时，请重新登录";
        break;
      default:
        return message;
    }
  }
}
