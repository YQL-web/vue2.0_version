<template>
  <div class="address-container">
    <el-select v-model="province_name" placeholder="请选择" @change="switchPro" size="small">
      <el-option
        v-for="item in currentProvinces"
        :key="item.province_id"
        :label="item.province_name"
        :value="item.province_name">
      </el-option>
    </el-select>
    <el-select
      v-model="city_name"
      style="margin-left: 20px;"
      placeholder="请选择" @change="switchCity" size="small">
      <el-option
        v-for="item in currentCitys"
        :key="item.city_id"
        :label="item.city_name"
        :value="item.city_name">
      </el-option>
    </el-select>
    <el-select
      v-model="area_name"
      style="margin-left: 20px;"
      placeholder="请选择" @change="switchArea" size="small">
      <el-option
        v-for="item in currentAreas"
        :key="item.area_id"
        :label="item.area_name"
        :value="item.area_name">
      </el-option>
    </el-select>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        defaultData:[],
        currentProvinces:[],
        currentCitys:[],
        currentAreas:[],
        province_name:'',
        province_id:'',
        city_name:'',
        city_id:'',
        area_name:'',
        area_id:''
      }
    },
    methods:{
      /**
       * 初始化地名数据
       */
      getRegion() {
				return this.$http.zmGet(this.server.getRegion, {}).then(res => {
					if(res.code == 200) {
						let data = res.data.list
						data.unshift({
							province_id: '',
							province_name: '全部',
							child: [{
								city_id: '',
								city_name: '全部',
								child: [{
									area_id: '',
									area_name: '全部'
								}]
							}]
						})
						this.defaultData = data;
						this.$nextTick(()=>{
							this.initData();
						})
					} else {

					}
				}).catch(error => {
					Promise.reject(error)
				})
			},
      initData(){
        this.defaultData.forEach(item=>{
          this.currentProvinces.push({
            province_id:item.province_id,
            province_name:item.province_name
          })
        })
        this.defaultData[0].child.forEach(item=>{
          this.currentCitys.push({
            city_id:item.city_id,
            city_name:item.city_name
          })
        })
        this.defaultData[0].child[0].child.forEach(item=>{
          this.currentAreas.push({
            area_id:item.area_id,
            area_name:item.area_name
          })
        })
        this.province_name = this.currentProvinces[0].province_name;
        this.province_id = this.currentProvinces[0].province_id;
        this.city_name = this.currentCitys[0].city_name;
        this.city_id = this.currentCitys[0].city_id;
        this.area_name = this.currentAreas[0].area_name;
        this.area_id = this.currentAreas[0].area_id;
      },
      /**
       * 切换省份
       */
      switchPro(){
        this.defaultData.forEach(item=>{
          if(this.province_name == item.province_name){
            this.province_id = item.province_id;
            this.currentCitys = [ ];
            this.currentAreas = [ ];
            item.child.forEach(op=>{
              this.currentCitys.push({
                city_id:op.city_id,
                city_name:op.city_name
              })
            })
            item.child[0].child.forEach(p=>{
              this.currentAreas.push({
                area_id:p.area_id,
                area_name:p.area_name
              })
            })
          }
        })
        this.city_name = this.currentCitys[0].city_name;
        this.city_id = this.currentCitys[0].city_id;
        this.area_name = this.currentAreas[0].area_name;
        this.area_id = this.currentAreas[0].area_id;
        let res = {
          province:{
            id:this.province_id,
            name:this.province_name
          },
          city:{
            id:this.city_id,
            name:this.city_name
          },
          area:{
            id:this.area_id,
            name:this.area_name
          }
        }
        this.$emit('getAds',res)
      },
      /**
       * 切换城市
       */
      switchCity(){
        this.defaultData.forEach(item=>{
          if(this.province_name == item.province_name){
            this.province_id = item.province_id;
            item.child.forEach(op=>{
              if(this.city_name == op.city_name){
                this.city_id = op.city_id;
                this.currentAreas = [ ];
                op.child.forEach(p=>{
                  this.currentAreas.push({
                    area_id:p.area_id,
                    area_name:p.area_name
                  })
                })
              }
            })
          }
        })
        this.area = this.currentAreas[0].area_name;
        this.area_id = this.currentAreas[0].area_id;
        let res = {
          province:{
            id:this.province_id,
            name:this.province_name
          },
          city:{
            id:this.city_id,
            name:this.city_name
          },
          area:{
            id:this.area_id,
            name:this.area_name
          }
        }
        this.$emit('getAds',res)
      },
      /**
       *
       */
      switchArea(){
        let res = {
          province:{
            id:this.province_id,
            name:this.province_name
          },
          city:{
            id:this.city_id,
            name:this.city_name
          },
          area:{
            id:this.area_id,
            name:this.area_name
          }
        }
        this.$emit('getAds',res)
      }
    },
    created(){
			this.getRegion();
    },
    mounted(){

    },
    watch:{
//    defaultData(){
//      this.initData();
//    }
    }
  }
</script>

<style>
  .address-container{display: inline-block}
  .address-container .el-select{width: 145px;}
</style>
