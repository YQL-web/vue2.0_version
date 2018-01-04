<template>
  <div class="register_main loginView">

    <div class="login_header">
      <div class="headBar">
        <img class="logo" src="../../assets/images/img_signlogo.png" alt=""/>
        <div class="officialWebsite">
          <a href="http://www.izhangmai.com">进入官网</a>|
          <router-link to="/">登录</router-link>
        </div>
      </div>
    </div>

    <div class="register_title">
      <div class="title_con">商贸营销大师 - <span>注册</span>
      </div>
    </div>
    <div class="login_section">
      <div class="main_con">
        <div :class="{'login_error':error_phone != ''}" class="form_group">
          <span class="icon icon-icon_login2"></span>
          <input type="number" v-model="phone" placeholder="请输入手机号" @change="changeVal">
          <span v-if="error_phone" class="error">{{error_phone}}</span>
        </div>
        <div :class="{'login_error':error_smsCode != ''}" class="form_group">
          <span class="icon icon-icon_login3"></span>
          <input type="number" style="width: 308px;" oninput="if(value.length>6)value=value.slice(0,6)"
                 v-model="smsCode" placeholder="请输入手机验证码">
          <button v-loading="codeLoading" class="auth_code" @click="getSmsCode" style="">
            {{codeMessage}}
          </button>
          <br>
          <span v-if="error_smsCode" class="error ">{{error_smsCode}}</span>
        </div>
        <div v-if="isShowCode" :class="{'login_error':error_captchaCode != ''}" class="form_group">
          <span class="icon icon-icon_login4"></span>
          <input type="text" maxlength="4" v-model="captchaCode" style="width: 308px;" @change="checkCaptchaCode"
                 placeholder="请输入图形验证码">
          <span class="auth_code" style="cursor:pointer;">
            <img @click="refreshCaptchaCode" width="80px" height="36px" alt="验证码" :src="captchaCodeURL">
          </span>
          <span v-if="error_captchaCode" class="error">{{error_captchaCode}}</span>
        </div>

        <div :class="{'login_error':error_password != ''}" class="form_group">
          <span class="icon icon-icon_login5"></span>
          <input :type="type" autocomplete="off" v-model="password" placeholder="请设置登录密码" @keydown="checkBlank($event)">
          <i class="pwd-icon" @click="viewPwd" :class="type=='text'?'open':'close'"></i>
          <span v-if="error_password" class="error">{{error_password}}</span>
        </div>
        <div :class="{'login_error':error_password_again != ''}" class="form_group">
          <span class="icon icon-icon_login5"></span>
          <input type="text" onfocus="this.type='password'" autocomplete="off" v-model="passwordAgain"
                 placeholder="请再次输入密码"  @keydown="checkBlank($event)">
          <span v-if="error_password_again" class="error">{{error_password_again}}</span>
        </div>
        <div class="protocol">
          <el-checkbox v-model="checked" style="color:#324057;">&nbsp;&nbsp;&nbsp;已阅读并同意<span
            class="spans" href="#" @click="openAgreement">《掌麦商家使用协议》</span></el-checkbox>
        </div>
        <div class="form_group regis-btn" style="width: 342px;border:none;" @click="onRegister">
          <el-input type="button" class="el_input" style="cursor:pointer;height:44px;"
                    value="立即注册"></el-input>
        </div>
      </div>
    </div>

    <div class="login_footer">
      <div class="footer_con">
        <div class="list">
          <a href="#">关于我们</a>
          <a href="#">常见问题</a>
          <a href="#">新手指南</a>
          <a href="#">操作视频</a>
          <a href="#">意见反馈</a>
        </div>
        <p>Copyright © 2017 掌麦 - 蜀ICP备14024909号</p>
      </div>
    </div>

    <!-- 协议弹出框 -->
    <agreement @close="closeAgreement" :dialogVisible="dialogAgreement"></agreement>

  </div>
</template>

<script type="text/ecmascript-6">
  import Agreement from '../../components/Agreement'
  import axios from '../../axios'
  export default {
    components: {
      Agreement
    },
    data () {
      return {
        codeMessage: "获取验证码",
        isShowCode: false,  //判断验证码是否输出3次
        phone: "",  //手机号
        error_phone: "",  //手机号码错误提示
        phone_repeat:false,//手机号重复标识
        repeat_ph_number:'',
        smsCode: "",    //验证码
        error_smsCode: "", //验证码错误提示
        password: "",  //密码
        error_password: "",  //密码错误提示
        error_password_again: "", //2次输入密码不一致
        passwordAgain: "",  //2次密码
        captchaCodeURL: "",  //图形验证码路径
        captchaCode: "",   //图形验证码
        error_captchaCode: "", //图形验证码错误提
        checked: true,  //是否阅读用户注册协议
        dialogAgreement: false,
        codeLoading: false,
        type: 'password'
      }
    },
    methods: {
      checkCaptchaCode(){

      },
      changeVal(){
        this.repeat_ph_number = ''
      },
      /**
       *检验密码空格
       */
      checkBlank(e){
        console.log(e.keyCode)
      },
      /**
       * 获取手机验证码
       */
      async getSmsCode(){
        if (this.codeMessage == "获取验证码") {
          let flag = this.checkPhone();
          if(!flag) return false;
//          let res = await this.checkPhoneRepeat();
          this.codeLoading = true;
          this.codeMessage = '';
          this.checkPhoneRepeat().then(res=>{
            if(res.code == '200'){
              let time = 60;
              let timer = setInterval(() => {
                time--;
                if (time <= 0) {
                  this.codeMessage = "获取验证码";
                  this.codeLoading = false;
                  clearInterval(timer);
                  return false;
                }
                this.codeMessage = time + "s";
              }, 1000);
            }
          }).catch(error=>{
            if(error.code == 400){
              this.phone_repeat = true;
              this.repeat_ph_number = this.phone;
              this.error_phone = error.message;
            }
            this.codeMessage = "获取验证码";
            this.codeLoading = false;
            this.$message.error(this.server.errorCode(error.code, error.message))
          })
//          else if(res.code == '400'){
//            this.phone_repeat = true;
//            this.repeat_ph_number = this.phone;
//            this.error_phone = res.message;
//            this.codeLoading = false;
//          }else{
//            this.error_smsCode = res.message;
//            this.codeLoading = false;
//            Promise.reject(res.message)
//          }
        }
      },
      openAgreement(){
        this.dialogAgreement = true;
      },
      /**
       * 验证手机号合法性(同一手机号不能重复注册)
       * @returns {*}
       */
      checkPhone(){
        if (!this.phone) {
          this.error_phone = "手机号码不能为空";
          return false;
        } else {
          if (!this.regExp.PHONE_NO_EX.test(this.phone)) {
            this.error_phone = "手机号码格式错误";
            return false;
          }
          else{
            if(this.repeat_ph_number!==this.phone)
              this.phone_repeat = false;
            if(this.phone_repeat){
              return false;
            }
          }
          this.error_phone = "";
          return true;
        }
      },
      /**
       * 获取验证码,验证手机号是否注册过
       * @returns {*}promise对象
       */
      checkPhoneRepeat(){
        let params = {
          "mobile":this.phone,
          "type":1
        }
        return this.$http.zmPost(this.server.getSmsCode,params);
      },
      /**
       * 提交注册
       */
      onRegister(){
        let flag = this.checkPhone();
        if(!flag) return false;
        if (!this.smsCode) {
          this.error_smsCode = "手机验证码不能为空";
          return false;
        } else {
          this.error_smsCode = "";
        }
        if (!this.password) {
          this.error_password = "请设置登录密码"
          return false
        } else {
          if(!this.regExp.PASSWORD.test(this.password)){
            this.error_password = "请输入6至16位的数值、字母和特殊字符"
            return false;
          }
          this.error_password = "";
        }
        if (this.passwordAgain === this.password) {
          this.error_password_again = "";
        } else {
          this.error_password_again = "2次输入的密码不一致";
          return false;
        }
        if(!this.checked){
          this.$message.error('请阅读用户注册协议');
          return false;
        }
        let pwd = this.tools.zmMd5(this.password)
        let param = {
          account:this.phone,
          password:pwd,
          sms_code:this.smsCode
        }
        this.$http.zmPost(this.server.register,param).then(res=>{
          if(res.code == 200){
            this.$router.push('/');
          }
        }).catch(error=>{
          this.$message.error(this.server.errorCode(error.code, error.message))
        })
      },
      /**
       * 协议模态框弹出
       */
      closeAgreement(){
        this.dialogAgreement = false;
        this.checked = true;
      },
      /**
       * 刷新图片验证码
       */
      refreshCaptchaCode(){
      },
      /**
       * 查看密码
       */
      viewPwd(){
        if (this.type == 'text') {
          this.type = 'password';
          return false;
        } else {
          this.type = 'text';
          return false;
        }
      },
    }
  }

</script>

<style scoped>
  .el-loading-mask{background:none}
  ::-webkit-input-placeholder {  color:#c8d2dc;  }
  :-moz-placeholder {  color:#c8d2dc;  }
  ::-moz-placeholder {  color:#c8d2dc;  }
  :-ms-input-placeholder {  color:#c8d2dc;  }
  .pwd-icon {
    height: 20px;
    width: 20px;
    position: absolute;
    right: 28px;
    bottom: 10px;
    display: block;
    transition: all 300ms
  }

  .open {
    background: url("../../assets/images/eyes-open.svg") no-repeat;
    background-size: cover
  }

  .close {
    background: url("../../assets/images/eyes-close.svg") no-repeat;
    background-size: cover
  }
</style>
