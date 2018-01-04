<template>
  <div>
    <crumbs :crumbs="crumbList"></crumbs>
    <div class="content-body">
      <div class="content-border">
        <div class="content-title">
          <span class="tip">配送规则</span>
          <div class="right-but">
            <el-button  class="trade-btn tip-btn" type="primary" @click="addRule">添加规则</el-button>
          </div>
        </div>
        <div class="trade-table">
          <div class="notice">注：客户在线订单达不到起送金额将不能够下单</div>
          <div class="margin-tab">
            <el-table
              ref="multipleTable"
              :data="tableData"
              border
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="province"
                label="省份">
              </el-table-column>
              <el-table-column
                prop="city"
                label="市">
              </el-table-column>
              <el-table-column
                prop="area"
                label="区县">
              </el-table-column>
              <el-table-column
                prop="money"
                label="起送金额">
              </el-table-column>
              <el-table-column
                prop="date"
                label="配送时间">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注">
              </el-table-column>
              <el-table-column
                fixed="right"
                prop="address"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="text">编辑</el-button>
                  <span class="del-btn">
                  <el-button type="text">删除</el-button>
                </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="配送规则" :visible.sync="dialogFormVisible" ref="dialog" width="680px">
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item label="配送区域：" class="bold">
          <AdsSelect></AdsSelect>
        </el-form-item>
        <el-row>
          <el-col :span="13">
            <el-form-item label="起送金额：" class="bold">
              <el-input v-model="form.money" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13">
            <el-form-item label="配送时间：" class="bold">
              <el-input v-model="form.date" placeholder="" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="备注：" class="bold">
              <Textarea :configure="textareaConfigure"></Textarea>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item>
              <div class="align">
                <el-button  class="trade-btn sure-btn" >保存</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        crumbList:[
          {crumb: '设置', path: ''},
          {crumb: '配送规则', path: ''}
        ],
        tableData:[
          {
            province:'四川省',
            city:'成都市',
            area:"高新区",
            money:'100',
            date:'星期三',
            remark:''
          }
        ],
        dialogFormVisible:false,
        form:{
          province:"",
          city:"",
          area:"",
          money:"",
          date:"",
          remark:""
        },
        textareaConfigure:{
          row:4,
          placeholder:'不能大于100字',
          text:'',
          maxlength:'100'
        }
      }
    },
    methods:{
      /**
       * 初始化级联地名数据
       */
      initCitySelectData(){

      },
      /**
       * 添加规则
       */
      addRule(){
        this.dialogFormVisible = true;
      }
    },
    mounted(){
    },
    created(){
      this.initCitySelectData();
    }
  }
</script>

<style scoped lang="scss">
  .notice{color:#fc483a;margin-bottom:20px}
  .el-button--text{text-decoration: underline;}
  .el-form{padding-left: 10px;}
  .bold{font-weight: bold}
  .align{text-align: center}
</style>
