<template>
  <div class="zm-container" :class="menuControl?'menu-open':'menu-close'">
    <div class="menu-left">
      <div class="zm-logo open"></div>
      <div class="menu-items">
        <div v-for="(item,index) in navData">
          <div @click="showMenu(index,item)" :class="{'highlight-group':item.isShow}" class="menu-group">
            <i :class="item.icon" class="zm-icon"></i>
            <span class="menu-name">{{item.menu}}</span>
            <i v-if="index==0" class="home-icon icon-common_icon_shoucebian"></i>
            <i v-if="item.childList" :class="{'rotate-icon':item.isShow}" class="el-icon icon-common_icon_open"></i>
          </div>
          <div :class="{'show-menu-list':item.isShow}" class="menu-list">
            <div @click="highlightMenu(index,i,key.path)" :class="{'highlight-menu':key.isShow}" v-for="(key,i) in item.childList" class="menu-item">{{key.menu}}</div>
          </div>
        </div>
      </div>
      <div class="menucontrol" @click="menuControlFc">
        <img src="../assets/images/icon_daohangopen.svg" alt="打开" title="打开" v-show="!menuControl"/>
        <img src="../assets/images/icon_daohangstop.svg" alt="收起" title="收起" v-show="menuControl"/>
      </div>
    </div>
    <div class="main">
      <div class="main-top">
        <div class="main-user">
          <div class="top-button">
            <i class="icon icon-icon_help"></i>
            <span class="icon-font">帮助</span>
          </div>
          <div class="top-button">
            <i class="icon icon-icon_message"></i>
            <span class="icon-font">消息</span>
          </div>
          <el-dropdown @command="handleCommand">
            <div class="top-button">
              <i class="icon icon-Icon_User"></i>
              <span class="icon-font">用户</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command='account'>账号信息</el-dropdown-item>
              <el-dropdown-item command='reset_pwd'>修改密码</el-dropdown-item>
              <el-dropdown-item command='logout'>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="main-content">
        <router-view />
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="resetPwdForm" width="500px">
      <el-form :model="form"  label-width="100px">
        <el-row>
          <el-col :span="22">
            <el-form-item label="原密码：" class="bold">
              <el-input type="password" v-model="form.old_pwd" placeholder=""></el-input>
              <p v-show="form.old_error_password.length!=0" class="error">{{form.old_error_password}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="新密码：" class="bold">
              <el-input type="password" v-model="form.new_pwd" placeholder="" ></el-input>
              <p v-show="form.new_error_password.length!=0" class="error">{{form.new_error_password}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="确认密码：">
              <el-input type="password" v-model="form.repeat_pwd" placeholder="" ></el-input>
              <p v-show="form.repeat_error_password.length!=0" class="error">{{form.repeat_error_password}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="center_align">
          <el-button  class="trade-btn sure-btn" @click="updatePwd" >确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog title="账号信息" :visible.sync="baseInfoFormDia" width="450px" class="accountInfo">
      <el-form :model="baseInfoForm"  label-width="180px">
        <el-row>
          <el-col :span="22">
            <el-form-item label="账号：">
              <p>{{baseInfoForm.account}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="姓名：">
              <p>{{baseInfoForm.user_name}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="手机号：">
              <p>{{baseInfoForm.mobile}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="角色：">
              <p>{{baseInfoForm.role_name}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="center_align" style="margin:5px 0">
          <el-button  class="trade-btn sure-btn" @click="close" >确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '../axios'
  export default {
    data () {
      return {
        navData: [
          {
            menu: "首页",
            icon: "icon-home3",
            isShow: false,
            path:"/home/home"
          },
          {
            menu: "商品管理",
            icon: "icon-common_icon_shangpin",
            isShow: false,
            childList: [
              {
                menu: "商品资料",
                isShow: false,
                path: "/commodity/commodityList"
              },
              {
                menu: "品牌列表",
                isShow: false,
                path: "/commodity/brandList"
              }
            ]
          },
          {
            menu: "销售管理",
            icon: "icon-common_icon_xiaoshou",
            isShow: false,
            childList: [
              {
                menu: "销售订单",
                isShow: false,
                path: "/sale/saleOrderManage"
              }
            ]
          },
          {
            menu: "客户管理",
            icon: "icon-common_icon_kehu",
            isShow: false,
            childList: [
              {
                menu: "客户列表",
                isShow: false,
                path: "/customer/customerList"
              },
              {
                menu: "客户分类",
                isShow: false,
                path: "/customer/customerClass"
              }
            ]
          },
          {
            menu: "设置",
            icon: "icon-common_icon_shezhi",
            isShow: false,
            childList: [
              {
                menu: "公司信息",
                isShow: false,
                path: "/system/companyInfo"
              },
              {
                menu: "打印模板",
                isShow: false,
                path: "/system/printModel"
              },
              {
                menu: "配送规则",
                isShow: false,
                path: "/system/distributionSet"
              }
            ]
          }
        ],
        menuControl:true,
        resetPwdForm:false,
        form:{
          old_pwd:'',
          new_pwd:'',
          repeat_pwd:'',
          old_error_password:'',
          new_error_password:'',
          repeat_error_password:''
        },
        baseInfoFormDia:false,
        baseInfoForm:{}
      }
    },
    mounted(){
      let arr = this.$router.currentRoute.path.split("/")
      for (let item of this.navData){
        if(item.childList){
          for (let key of item.childList){
            if(this.$router.currentRoute.path.includes(key.path)){
              key.isShow = true;
              item.isShow = true;
              break;
            }
          }
        }else{
          if(item.path){
            if(item.path.includes(arr[1])){
              item.isShow = true;
            }
          }
        }
      }
    },
    created(){
      this.getBaseInfo();
    },
    methods: {
      showMenu(index,item){
        for (let item of this.navData) {
          item.isShow = false;
          if(item.childList){
            for(let key of item.childList){
              key.isShow = false;
            }
          }
        }
        this.navData[index].isShow = true;
        if(this.navData[index].path){
          this.$router.push({path:this.navData[index].path})
        }
        item.childList[0].isShow = true;
        this.$router.push(item.childList[0].path)
      },
      highlightMenu(index,i,path){
        for(let item of this.navData){
          item .isShow = false;
          if(item.childList){
            for(let key of item.childList){
              key.isShow = false;
            }
          }
        }
        this.navData[index].isShow = true;
        this.navData[index].childList[i].isShow = true;
        if(this.$route.path == path){
          //如果是在当前激活菜单上再次点击
          this.$router.replace({
            path: path,
            query: {
              t: +new Date()//保证每次点击路由的query项都是不一样的，确保会重新刷新view
            }
          })
          this.$router.replace({path: path});
        }else{
          this.$router.push({path: path})
        }
      },
      menuControlFc(){
        this.menuControl = !this.menuControl;
      },
      handleCommand(command){
        switch (true){
          case command == 'account':
                this.baseInfoFormDia = true;
                break;
          case command == 'reset_pwd':
            this.resetPwdForm = true;
                break;
          case command=='logout':
            this.$confirm('是否退出？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.zmPost(this.server.logout, {}).then(res=> {
                if (res.code == 200) {
                  this.tools.zmQuitUser();
                  this.$message({
                    type: 'success',
                    message: '退出成功!'
                  });
                  setTimeout(()=> {
                    this.$router.push("/")
                  }, 1000)
                }
              }).catch(error=>{
                this.$message.error(this.server.errorCode(error.code, error.message))
              })
            })
            break;
        }
      },
      /**
       * 修改密码
       */
      updatePwd(){
        if (!this.form.old_pwd) {
          this.form.old_error_password = "请输入当前登录密码"
          return false
        } else {
          if(!this.regExp.PASSWORD.test(this.form.old_pwd)){
            this.form.old_error_password = "密码为6至16位的数值、字母和特殊字符"
            return false;
          }
          this.form.old_error_password = "";
        }
        if (!this.form.new_pwd) {
          this.form.new_error_password = "请输入新密码"
          return false
        } else {
          if(!this.regExp.PASSWORD.test(this.form.new_pwd)){
            this.form.new_error_password = "密码为6至16位的数值、字母和特殊字符"
            return false;
          }
          if(this.form.new_pwd==this.form.old_pwd){
            this.form.new_error_password = "新旧密码不能重复"
            return false;
          }
          this.form.new_error_password = "";
        }
        if(this.form.new_pwd!=this.form.repeat_pwd){
          this.form.repeat_error_password = "两次密码输入不一致"
          return false
        }
        let old_pwd = this.tools.zmMd5(this.form.old_pwd)
        let new_pwd = this.tools.zmMd5(this.form.new_pwd)
        let data = {
          ori_password:old_pwd,
          password:new_pwd
        }
        this.$http.zmPost(this.server.resetPwd,data).then(res=>{
          this.$message({
            type: 'success',
            message: '密码修改成功!'
          });
          for(var i in this.form){
            this.form[i] = '';
          }
          this.resetPwdForm = false;
        }).catch(error=>{
          this.$message.error(this.server.errorCode(error.code, error.message))
        })
      },
      /**
       *获取用户基本信息
       */
      getBaseInfo(){
        this.$http.zmGet(this.server.getBaseInfo,{}).then(res=>{
          this.baseInfoForm = res.data;
        }).catch(error=>{
          this.$message.error(this.server.errorCode(error.code, error.message))
        })
      },
      close(){
        this.baseInfoFormDia = false;
      }
    }
  }
</script>

<style lang="scss" type="text/css">
  .transition{
    transition: all .3s;
  }
  .zm-container {
    position: absolute;
    overflow: hidden;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  @extend .transition;
  }

  .menu-left {
    position: absolute;
    left: 0;
    top: 0;
    background: rgb(110, 192, 185);
    z-index: 1991;
    height: 100%;
  @extend .transition;
  }

  .zm-logo {
    height: 96px;
    background-repeat: no-repeat;
    flex-grow: 0;
    flex-shrink: 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(110, 192, 185);
    transition: background .6s ease-out
  }

  .open {
    background: url(../assets/images/common_img_logo.png);
    background-repeat: no-repeat;
    background-size: 140px auto;
    background-position: center 23px;
  }

  .menu-items {
    overflow-y: auto;
    background: #283849;
    height: 100%;
    -moz-appearance: none !important;
  }

  .menu-group {
    position: relative;
    line-height: 48px;
    font-size: 16px;
    display: flex;
    background: #283849;
    align-items: center;
    border-bottom: 1px solid #24313e;
    box-sizing: border-box;
    transition: background .2s;
    height: 48px;
    padding: 0 50px;
    white-space: nowrap;
    cursor: pointer;
    color: rgb(153, 169, 192);
  &:hover {
     color: #ffffff;
   }
  .zm-icon {
    position: absolute;
    font-size: 18px;
    text-align: center;
    left: 18px;
    top: 14px;

  }

  .menu-name {
    display: block;
    width: 100%;
    font-size: 16px;
    text-align: left;
    transition: all .3s;
  }
  .el-icon {
    position: absolute;
    width: 50px;
    font-size: 12px;
    text-align: center;
    box-sizing: border-box;
    right: 0;
    top:14px;
  }
  .home-icon {
    position: absolute;
    width: 50px;
    font-size: 16px;
    text-align: center;
    box-sizing: border-box;
    right: 0;
    top:14px;
  }
  }

  .menu-list {
    overflow: hidden;
    display: none;
  }

  .show-menu-list {
    display: block;
    transition: all 1s;
  }

  .menu-item {
    background: #202d3d;
    line-height: 36px;
    height: 36px;
    color: #99a9c0;
    font-size: 14px;
    cursor: pointer;
    text-align: left;
    padding-left: 50px;
    transition: background .2s;
    position: relative;
    z-index: 1;
    overflow: hidden;

  &:hover {
     color: #ffffff;
   }

  }

  .main {
    position: relative;
    padding-top: 48px;
    height: 100vh;
  }

  .main-top {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 48px;
    top: 0;
    left: 0;
    border-bottom: 1px solid #d3dce6;
  .main-user {
    float: right;
    border-left: 1px solid #d3dce6;
    padding-right: 20px;
  .top-button {
    display: inline-block;
    height: 48px;
    min-width: 100px;
    text-align: center;
    cursor: pointer;
    line-height: 48px;
  &:hover {
     background-color: #e5e9f2;
   }
  .icon-font {
    font-size: 14px;
  }
  .icon {
    position: relative;
    top: 5px;
    margin-right: 10px;
    font-size: 22px;
    color: rgb(110, 192, 185);
  }
  }
  }
  }

  .main-content {
    position: relative;
    overflow: hidden;
    padding-top: 48px;
  }

  .highlight-group {
    color: #ffffff !important;
  }

  .highlight-menu {
    background-color: rgb(110, 192, 185);
    color: #ffffff;
  }

  $degree: 180deg;
  .rotate-icon {
    transform: rotate($degree);
    -ms-transform: rotate($degree); /* IE 9 */
    -moz-transform: rotate($degree); /* Firefox */
    -webkit-transform: rotate($degree); /* Safari 和 Chrome */
    -o-transform: rotate($degree); /* Opera */
  }
  .menucontrol{
    position: absolute;
    top: 50%;
    right: -10px;
    margin-top: -24px;
    cursor: pointer;
    z-index: 999999;}
  .zm-container.menu-open{
    padding-left:200px;
  .menu-left{
    width:200px;
  .menu-name{
    opacity: 1;
  }
  .home-icon,.el-icon{
    opacity: 1;
  }
  }
  }
  .zm-container.menu-close{
    padding-left:48px;
  .menu-left{
    width:48px;
  .menu-name{
    opacity: 0;
  }
  .home-icon,.el-icon{
    opacity: 0;
  }
  }
  .menu-item{
    opacity: 0;
  }
  .highlight-menu{
    opacity: 1;
  }
  }
  .error{
    font-weight: 100;
    position: absolute;
    line-height: 14px;
    color:red;
    bottom:-16px;
    left:0px;
  }
  .accountInfo .el-form-item{margin-bottom: 0}
</style>
