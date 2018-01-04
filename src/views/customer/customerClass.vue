<template>
  <div>
    <crumbs :crumbs="crumbList"></crumbs>
    <div class="content-body">
      <div class="content-border">
        <div class="content-title">
          <span class="tip">客户分类</span>
          <div class="right-but">
            <el-button  class="trade-btn tip-btn" type="primary" @click="add">添加分类</el-button>
          </div>
        </div>
        <div class="trade-table">
          <div class="margin-tab">
            <el-table
              ref="table"
              :data="tableData"
              border
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="type"
                label="客户类型">
              </el-table-column>
              <el-table-column
                prop="number"
                label="客户数量">
              </el-table-column>
              <el-table-column
                prop="remarks"
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
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible" width="666px">
      <el-form :model="form" :rules="rules" ref="form" label-width="90px" class="form-css">
        <el-form-item label="客户分类:" prop="name">
          <el-input v-model="form.name" class="normal"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remarkMsg">
        	<el-input type="textarea" v-model="form.remarkMsg" placeholder="不能大于300字"></el-input>
        </el-form-item>
      </el-form>
      <div class="center_align">
        <el-button class="save trade-btn">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        crumbList:[
          {crumb: '客户管理', path: ''},
          {crumb: '客户分类', path: ''},
        ],
        tableData:[
        ],
        form:{
          name:'',
          remarkMsg:''
        },
        dialogFormVisible:false,
        rules:{
        	name:[{
        		required: true,
        		message: "分类名称不能为空",
        		trigger: "blur"
        	}],
        	remarkMsg: [{
						required: false,
						max: 300,
        		message: "备注内容在300以内",
        		trigger: "blur"
        	}]
        }
      }
    },
    methods:{
      add(){
        this.dialogFormVisible = true
      }
    }
  }
</script>

<style>
  .el-button--text{text-decoration: underline}
  .des{position: absolute;left:-115px;width:100px;text-align: right;margin:0}
  .center_align{text-align: center;margin:8px 0}
</style>
