<template>
  <div id="forgetPasswdView" class="forgetPasswd loginView">

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
      <div class="title_con">商贸营销大师 - <span>忘记密码</span>
      </div>
    </div>
    <div class="login_section">
      <div class="main_con">
        <div :class="{'login_error': error_phone != ''}" class="form_group ">
          <span class="icon icon-icon_login2"></span>
          <input type="number" v-model="phone" placeholder="请输入手机号">
          <span v-if="error_phone" class="error">{{error_phone}}</span>
        </div>
        <div :class="{'login_error': error_smsCode != ''}" class="form_group">
          <span class="icon icon-icon_login3"></span>
          <input type="number" style="width: 308px;" oninput="if(value.length>6)value=value.slice(0,6)"
                 v-model="smsCode" placeholder="请输入手机验证码">
          <button v-loading="loadingCode" type="button" class="auth_code" @click="getSmsCode">{{codeMessage}}</button>
          <span v-if="error_smsCode" class="error">{{error_smsCode}}</span>
        </div>
        <div :class="{'login_error': error_password != ''}" class="form_group">
          <span class="icon icon-icon_login5"></span>
          <input type="password" v-model="password" placeholder="请输入新密码">
          <span v-if="error_password" class="error">{{error_password}}</span>
        </div>
        <div :class="{'login_error': error_password2 != ''}" class="form_group">
          <span class="icon icon-icon_login5"></span>
          <input type="password" @keyup.enter="onRefreshPasswd" v-model="passwordRepeat" placeholder="请再次输入新密码">
          <span v-if="error_password2" class="error">{{error_password2}}</span>
        </div>
        <div class="form_group  form_btn" style="width: 342px;margin-top: 36px;">
          <input type="button" style="cursor:pointer;" @click="onRefreshPasswd" value="确认修改">
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
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        phone: '',
        error_phone: '',
        password: '',
        error_password: '',
        passwordRepeat: '',
        error_password2: '',
        smsCode: '',
        error_smsCode: '',
        captchaCode: '',
        captchaCodeURL: '',
        loadingCode: false,
        codeMessage: '获取验证码',
      }
    },
    methods: {
      /**
       * 更新密码
       */
      onRefreshPasswd(){
        let flag = this.checkPhone();
        if(!flag) return false;
        if(!this.smsCode){
          this.error_smsCode = "手机验证码不能为空";
          return false;
        } else {
          this.error_smsCode = "";
        }
        if(!this.password){
          this.error_password = "新密码不能为空";
          return false;
        } else {
          if(!this.regExp.PASSWORD.test(this.password)){
            this.error_password = "请输入6至16位的数值、字母和特殊字符"
            return false;
          }
          this.error_password = "";
        }
        if (this.passwordRepeat === this.password) {
          this.error_password2 = "";
        } else {
          this.error_password2 = "2次输入的密码不一致";
          return false;
        }
        let pwd = this.tools.zmMd5(this.password)
        let param = {
          account:this.phone,
          password:pwd,
          sms_code:this.smsCode
        }
        this.$http.zmPost(this.server.resetPasswd,param).then(res=>{
          if(res.code == 200){
            this.$router.push('/');
          }else{
            this.$message({
              showClose: true,
              message: res.message,
              type: 'error'
            });
          }
        })
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
          this.error_phone = "";
          return true;
        }
      },
      /**
       * 获取手机验证码
       */
      async getSmsCode(){
        if (this.codeMessage == "获取验证码") {
          let flag = this.checkPhone();
          if(!flag) return false;
          let params = {
            "mobile":this.phone,
            "type":2
          }
          this.loadingCode = true;
          this.$http.zmPost(this.server.getSmsCode,params).then(res=>{
            if(res.code == '200'){
              this.codeMessage = '';
              let time = 60;
              let timer = setInterval(() => {
                time--;
                if (time <= 0) {
                  this.codeMessage = "获取验证码";
                  this.loadingCode = false;
                  clearInterval(timer);
                  return false;
                }
                this.codeMessage = time + "s";
              }, 1000);
            }
            else if(res.code == '400'){
              this.error_phone = res.message;
              this.loadingCode = false;
            }
            else{
              this.error_smsCode = res.message;
              this.loadingCode = false;
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .el-loading-mask{background:none}
</style>
