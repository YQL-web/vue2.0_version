<template>
	<div>
		<div class="customerList" v-show="!flag">
			<crumbs :crumbs="crumbList"></crumbs>
			<div class="content-body">
				<div class="content-border">
					<div class="content-title">
						<span class="tip">客户管理</span>
						<div class="right-but">
							<el-button class="trade-btn tip-btn" type="primary" @click="dialogFormVisible=true">新增客户</el-button>
						</div>
					</div>
					<div class="trade-table">
						<div class="condition-search">
							<div class="search-item">
								<Search></Search>
							</div>
							<div class="search-item">
								<span class="title">地区：</span>
								<AdsSelect @getAds="getAds" class="select-content"></AdsSelect>
							</div>
							<div class="search-item">
								<span class="title">客户分类：</span>
								<el-select v-model="searchData.customerType" size="small">
									<el-option v-for="item in customerTypes" :key="item.category_id" :label="item.name" :value="item.name">
									</el-option>
								</el-select>
							</div>
							<div class="search-item">
								<p class="clear-condition">清空筛选条件</p>
							</div>
						</div>
						<div class="margin-tab">
							<el-table ref="table" :data="tableData" border tooltip-effect="dark" style="width: 100%">
								<el-table-column type="index" label="序号">
								</el-table-column>
								<el-table-column prop="shop_name" label="客户名称">
								</el-table-column>
								<el-table-column prop="shop_contact" label="超市联系人">
								</el-table-column>
								<el-table-column prop="shop_phone" label="联系电话">
								</el-table-column>
								<el-table-column label="地区">
								</el-table-column>
								<el-table-column prop="address" label="详细地址">
								</el-table-column>
								<el-table-column label="客户分类">
								</el-table-column>
								<el-table-column prop="sales" label="销售额">
								</el-table-column>
								<el-table-column fixed="right" prop="address" label="操作">
									<template slot-scope="scope">
										<el-button type="text" @click="inDetail" class="theme-color">销量</el-button>
										<span class="del-btn">
                  <el-button type="text">编辑</el-button>
                </span>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<Page :pageData="pageData"></Page>
					</div>
				</div>
			</div>
			<el-dialog title="新增客户" :visible.sync="dialogFormVisible" ref="dialog" width="666px">
				<el-form :model="form" ref="form" :rules="rules" label-width="120px" class="form-css">
					<el-form-item label="客户名称:" prop="shop_name">
						<el-input v-model="form.shop_name" class="edit_input normal" @blur="form.shop_name=form.shop_name.replace(/\s+/g,'')"></el-input>
					</el-form-item>
					<el-form-item label="联系人:" prop="shop_contact">
						<el-input v-model="form.shop_contact" class="edit_input normal" @blur="form.shop_contact=form.shop_contact.replace(/\s+/g,'')"></el-input>
					</el-form-item>
					<el-form-item label="联系方式:" prop="shop_phone">
						<el-input v-model="form.shop_phone" class="edit_input normal"></el-input>
					</el-form-item>
					<el-form-item label="超市唯一编码:">
						<el-input v-model="form.shop_id" class="edit_input normal"></el-input>
					</el-form-item>
					<el-form-item label="客户分类:" prop="category_id">
						<el-select v-model="form.category_id" size="small">
							<el-option v-for="item in addsCustomerTypes" :key="item.category_id" :label="item.name" :value="item.category_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="地区:" prop="province_id">
						<AdsSelect @getAds="addGetAds" class="select-content"></AdsSelect>
					</el-form-item>
					<el-form-item label="详细地址:" prop="address">
						<el-input v-model="form.address" class="edit_input normal"></el-input>
					</el-form-item>
					<el-form-item>
						<div class="btns">
							<el-button class="continueAdd">继续添加</el-button>
							<el-button class="save sure-btn" @click="save">保存</el-button>
						</div>
					</el-form-item>
				</el-form>
			</el-dialog>
		</div>
		<router-view v-show="flag"></router-view>
	</div>
</template>

<script type=text/ecmascript-6>
	//	[^\u4e00-\u9fa5a-zA-Z]
	export default {
		data() {
			const checkPhone = (rule, value, callback) => {
				let reg = /[^\u4e00-\u9fa5a-zA-Z]/;
				if(!reg.test(value)) {
					return callback(new Error('联系方式不能含有字母和汉字'));
				}
				callback();
			};
			return {
				crumbList: [{
						crumb: '客户管理',
						path: ''
					},
					{
						crumb: '客户管理',
						path: ''
					}
				],
				searchData: {
					keywords: '',
					province_id: '',
					city_id: '',
					area_id: '',
					page: ''
				},
				customerTypes: [],
				addsCustomerTypes: [],
				tableData: [],
				currentPage: 1,
				dialogFormVisible: false,
				form: {
					shop_name: '',
					shop_contact: '',
					shop_phone: '',
					shop_id: '',
					category_id: '',
					address: '',
					province_id: '',
					city_id: '',
					area_id: ''
				},
				flag: false,
				pageData: {
					total: 200,
					size: 100,
					currentPage: 1,
					describe: '个客户'
				},
				rules: {
					shop_name: [{
							required: true,
							message: '请输入客户名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 100,
							message: '长度在100个字符以内',
							trigger: 'blur'
						}
					],
					shop_contact: [{
							required: true,
							message: '请输入联系人名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 10,
							message: '长度在10个字符以内',
							trigger: 'blur'
						}
					],
					shop_phone: [{
							required: true,
							message: '请填写联系方式',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '长度在20个字符以内',
							trigger: 'blur'
						}
					],
					address: [{
							required: true,
							message: '请填写详细地址',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 100,
							message: '长度在100个字符以内',
							trigger: 'blur'
						}
					],
					category_id: [{
						required: true,
						message: '请选择客户类型',
						trigger: 'change'
					}],
					province_id: [{
						required: true,
						message: '请选择地区',
						trigger: 'change'
					}]
				}
			}
		},
		methods: {
			/**
			 * 获取地点信息
			 */
			getAds(res) {
				this.searchData.province_id = res.province.id;
				this.searchData.city_id = res.city.id;
				this.searchData.area_id = res.area.id;
			},
			addGetAds(res) {
				this.form.province_id = res.province.id;
				this.form.city_id = res.city.id;
				this.form.area_id = res.area.id;
			},
			handleSizeChange() {

			},
			handleCurrentChange() {

			},
			/**
			 * 进入详情页面
			 */
			inDetail() {
				this.flag = true;
				this.$router.push({
					path: '/customer/customerList/customerDetails',
					query: {
						id: 1
					}
				});
			},
			///获取客户列表
			custLists() {
				this.$http.zmGet(this.server.custLists, {}).then(res => {
					if(res.code == 200) {
						this.tableData = res.data.list;
					} else {
						this.$message({
							type: 'error',
							message: res.data
						});
					}
				}).catch(error => {
					Promise.reject(error)
				})
			},
			///获取客户分类列表
			custTypes() {
				//				this.server.customerList
				this.$http.zmGet(this.server.customerList, {}).then(res => {
					if(res.code == 200) {
						this.addsCustomerTypes = res.data.list;
						this.customerTypes = [{ ///条件查询中的客户分类，需要加上不限
							category_id: "",
							name: "不限"
						}, ...res.data.list];
					} else {
						this.$message({
							type: 'error',
							message: res.data
						});
					}
				}).catch(error => {
					Promise.reject(error)
				})
			}, ///保存
			save() {
				this.$refs['form'].validate(valid => {
					if(!valid) {
						return false;
					}
					let data=this.form;
					this.$http.zmPost(this.server.createCust, data).then(res => {
						if(res.code == 200) {
							console.log(res)
							this.$message({
								type: 'error',
								message: '添加客户成功'
							});
						} else {
							this.$message({
								type: 'error',
								message: res.data
							});
						}
					}).catch(error => {
						Promise.reject(error)
					})
					//					createCust
				});
			}
		},
		mounted() {
			this.custTypes();
			this.custLists();
		},
		beforeRouteUpdate(to, from, next) {
			if(to.path.indexOf('customerDetails') < 0) {
				this.flag = false;
				next();
			} else {
				if(to.query.id) {
					next();
				} else {
					next({
						path: '/customer'
					})
				}
			}

		}
	}
</script>

<style scoped lang="scss">
	.search-item .el-select {
		width: 150px;
	}
	
	.des {
		position: absolute;
		left: -115px;
		width: 100px;
		text-align: right;
		margin: 0
	}
	
	.required {
		margin: 0 2px
	}
	
	.form-css {
		padding-right: 20px;
		margin: 0 auto
	}
	
	.btns {
		padding: 0 90px;
	}
	
	.btns button {
		width: 120px;
	}
</style>