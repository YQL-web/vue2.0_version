<template>
  <div id="loginView" class="loginView">
    <!--head-->
    <div class="headBar">
      <img class="logo" src="../../assets/images/img_signlogo.png">
      <a href="http://www.izhangmai.com" target="_blank" class="officialWebsite">进入官网</a>
    </div>
    <!--content-->
    <div class="content ">
      <div class="allCenterV content_main">
        <img class="login_bg" src="../../assets/images/img_logo.png" alt="">
        <!-- 密码登录 -->
        <div class="login_main">
          <div class="login_con">
            <div class="mainTitle">商贸营销大师</div>
            <div class="subTitle">账号登录</div>
            <div class="form_text">
              <input :class="{'login_error': error_account!=''}" placeholder="请输入手机号" autocomplete="on"
                     v-model="account" @keydown="submit($event)">
              <datalist id="words"></datalist>
              <div class="error_account">{{error_account}}</div>
            </div>

            <div class="form_text2 form_text ">
              <input :class="{'login_error': error_password!=''}" :type="type" placeholder="请输入密码"
                     @keyup.enter="onLogin" v-model="password" @keydown="submit($event)">
              <i class="pwd-icon" @click="viewPwd" :class="type=='text'?'open':'close'"></i>
              <div v-if="error_password" class="error_account">{{error_password}}</div>
            </div>

            <div v-if="isCaptchaCode" :class="{'login_error': error_captchaCode!=''}"
                 class="form_text form_text2  form_border">
              <input type="text" v-model="captchaCode" maxlength="4" @keyup.enter="onLogin"
                     style="width: 200px;float:left;border:none;" placeholder="请输入图形验证码">
              <a class="auth_code" href="#" style="cursor:pointer;">
                <img width="80px" height="36px" @click="refreshCaptchaCode" alt="验证码" :src="captchaCodeURL">
              </a>
              <div v-if="error_captchaCode" style="position:absolute;bottom:-25px;" class="error_account">
                {{error_captchaCode}}
              </div>
            </div>

            <div class="is_remember">
              <el-checkbox v-model="remindPwd" style="color:#324057;">记住密码</el-checkbox>
            </div>

            <div class="form_text2 form_text form_button">
              <input type="submit" value="登录" @click="onLogin">
            </div>

            <div class="form_reg">
              没有账号？
              <router-link to="/register" style="color:#ff4949;">免费注册</router-link>
              <router-link to="/forgetPassword" class="forgot_password">忘记密码？</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="login_footer">
      <div class="footer_con">
        <div class="list">
          <a href="http://www.izhangmai.com/index.html" target="_blank">关于我们</a>
          <a href="http://www.izhangmai.com/service.html" target="_blank">常见问题</a>
          <a href="http://www.izhangmai.com/service.html" target="_blank">新手指南</a>
          <a href="http://www.izhangmai.com/service.html" target="_blank">操作视频</a>
          <a
            href="tencent://message/?Menu=yes&uin=938052757&Service=58&SigT=A7F6FEA02730C9885B037155C864771FF9789A1C2B336ED8238CBCB1FA375BE8805210098C30A6A07607749B9D08B8E7C26C661FDA7ACB50E0A7C486BBEAF3F1BC2B80BF4A374F6A6CD6ADA44A289AE968C90A4594F90AECF3622DA6BDA957379EC9F31A1E8668F807A6BD66B38DADF512BBA8A8F0E2F8C2&SigU=30E5D5233A443AB22DF0BA4CB55362055D8DCDA4D734F5B5BEF486463F3E2CBC9F88833EF33AE864634711F9A84A1E2DB4101B1C29699C208FF3C3DE5E9EC0C0A29CA3F24518673E"
            target="_blank">意见反馈</a>
        </div>
        <p>Copyright © 2017 掌麦 - 蜀ICP备14024909号</p>
      </div>
    </div>
    <!-- 用于index的打包图片（后续更改图片打包） -->
    <div style="display:none">
      <img class="logo" src="../../assets/images/google.jpg" alt="login-logo.jpg">
      <img class="logo" src="../../assets/images/firfox.jpg" alt="login-logo.jpg">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        account: "",  //账号
        remindPwd: true, //是否记住密码
        error_account: "",  //账号错误提示
        password: "",   //密码
        error_password: "",  //密码错误提示
        error_pwd_count: 0,//密码错误次数
        captchaCodeURL: "",  //图片验证码URL
        captchaCode: "",   //图片验证码
        captchaCodeKey:"",
        error_captchaCode: "",  //图片验证码错误提示
        isCaptchaCode: false,
        type: 'password'
      }
    },
    methods: {
      checkPassword(){

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
      /**
       * 登录
       * @returns {boolean}
       */
      onLogin(){
        if (!this.account) {
          this.error_account = "手机号码不能为空";
          return false;
        } else {
          if (!this.regExp.PHONE_NO_EX.test(this.account)) {
            this.error_account = "请输入正确手机号";
            return false;
          }
          this.error_account = "";
        }
        if (!this.password) {
          this.error_password = "密码不能为空";
          return false;
        } else {
          this.error_password = "";
        }
        if (this.isCaptchaCode) {
          if (!this.captchaCode) {
            this.error_captchaCode = "验证码不能为空";
            return false
          } else {
            this.error_captchaCode = "";
          }
        }
        let pwd = this.tools.zmMd5(this.password);
        let param = {
          account: this.account,
          password: pwd
        }
        if(this.isCaptchaCode){
          param.captcha_code = this.captchaCode;
          param.captcha_key = this.captchaCodeKey;
        }
        this.$http.zmPost(this.server.login, param).then(res => {
          if (res.code == 200) {
            let userInfos = this.tools.zmGetLocalStorage()
            let password = this.remindPwd ? this.password : '';
            let userInfo = {
              account: this.account,
              password: password,
            }
            let repeatFlag = false;
            if (userInfos && userInfos.length > 0) {
              userInfos.forEach(item => {
                if (item.account == userInfo.account){
                  repeatFlag = true;
                  item.password = userInfo.password;
                }
              })
              if (!repeatFlag)
                userInfos.push(userInfo)
            }
            else {
              userInfos = [];
              userInfos.push(userInfo)
            }
            this.tools.zmSaveLocalStorage(userInfos)
            this.tools.zmSaveUser(res.data)
            this.$router.push('/home/home');
          }
        }).catch(error=>{
          let userInfos = this.tools.zmGetLocalStorage();
          this.error_pwd_count++;
          if(this.error_pwd_count==3){
            this.isCaptchaCode = true;
            this.refreshCaptchaCode();
          }
          this.$message.error(this.server.errorCode(error.code, error.message))
        })
      },
      submit(event){
        if(event.keyCode=='13')
          this.onLogin();
      },
      refreshCaptchaCode(){
        this.$http.zmPost(this.server.getImgCode,{}).then(res=>{
          if(res.code == 200){
            this.captchaCodeURL = 'http://api.dev.izhangmai.com/'+res.data.captcha_url;
            this.captchaCodeKey = res.data.captcha_key;
          }
        }).catch(error=>{
          this.$message.error(this.server.errorCode(error.code, error.message))
        })
      }
    },
    created(){
      let userInfos = this.tools.zmGetLocalStorage();
      if (userInfos) {
        var userObj = userInfos[userInfos.length - 1];
        this.account = userObj.account
        this.password = userObj.password
      }
    }
  }
</script>

<style>
  .pwd-icon {
    height: 20px;
    width: 20px;
    position: absolute;
    right: 28px;
    bottom: 8px;
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
