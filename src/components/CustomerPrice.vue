<template>
  <div>
    <el-button @click="customerModel" class="from-text-btn" type="text">分客定价</el-button>

    <el-dialog class="trade-model" title="分客定价" :visible.sync="dialogCustomer" width="432px">
      <div class="trade-table" style="padding: 0">
        <el-table ref="multipleTable" :data="customers" border tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="name" align="center" label="客户分类"></el-table-column>

          <el-table-column align="center" label="售价价格">
            <template slot-scope="scope">
              <el-input class="from-input"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <div class="from-sub">
          <el-button class="trade-btn" type="primary">保存</el-button>
        </div>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from '../axios'
  export default {
    data () {
      return {
        dialogCustomer: false,
        customers:[]
      }
    },
    methods: {
      customerModel(){
//        axios.zmGet(axios.server.customerList, {limit: 0})
        axios.get("http://192.168.0.247/mockjsdata/38/custom/category", {limit: 0})
          .then(res => {
            this.customers = res.list
          })
          .catch(err => {

          })
        this.dialogCustomer = true;
      }
    }
  }
</script>

<style scoped>

</style>
