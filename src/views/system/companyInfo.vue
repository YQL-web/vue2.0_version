<template>
	<div class="companyInfo">
		<crumbs :crumbs="crumbList"></crumbs>
		<div class="content-body">
			<div class="content-border">
				<div class="content-title">
					<span class="tip">公司信息</span>
				</div>
				<div class="trade-table" v-loading="loading">
					<div class="up-img">
						<el-upload class="avatar-uploader" :show-file-list="false" action="">
							<i class="el-icon-plus avatar-uploader-icon"></i>
							<div class="up-text">点击上传</div>
						</el-upload>
						<span>超市logo</span>
					</div>
					<el-form :model="form" :rules="rules" ref="form" label-width="90px">
						<el-row>
							<el-col :span="w12">
								<el-form-item label="基本信息" class="large">
								</el-form-item>
							</el-col>
						</el-row>
						<el-row v-if="supplier_id!=0">
							<el-col :span="w12">
								<el-form-item label="编号:">
									{{supplier_id}}
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="w12">
								<el-form-item label="公司名称:" prop="supplier_name">
									<el-input v-model="form.supplier_name"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="所在地区:" prop="province_id">
									<AdsSelect @getAds="addGetAds" class="select-content"></AdsSelect>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="w12">
								<el-form-item label="详细地址:" prop="address">
									<el-input v-model="form.address"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="w12">
								<el-form-item label="经营信息" class="large">
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="w8">
								<el-form-item label="负责人:">
									<el-input v-model="form.manager_name"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="w8">
								<el-form-item label="手机号:">
									<el-input v-model="form.manager_phone"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="w8">
								<el-form-item label="座机号:">
									<el-input v-model="form.manager_tel"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="w12">
								<el-form-item label="经营范围:">
									<el-input v-model="form.management_scope"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="w12">
								<el-form-item label="店铺公告:" prop="supplier_notice">
									<el-input v-model="form.supplier_notice" type="textarea" placeholder="500字以内"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="w12">
								<el-form-item label="支付方式" class="large">
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="w8">
								<el-form-item label="开户行:" prop="bank_name">
									<el-input v-model="bank_name"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="2">
								<i class="el-icon-circle-plus add-bank" v-show="!twoBank" @click="addBank"></i>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="w8">
								<el-form-item label="开户人:" prop="account_holder">
									<el-input v-model="account_holder"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="w8" prop="bank_account">
								<el-form-item label="卡号:">
									<el-input v-model="bank_account"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<template v-if="twoBank">
							<el-row>
								<el-col :span="w8">
									<el-form-item label="开户行:" prop="bank_namea">
										<el-input v-model="bank_namea"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="2">
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="w8">
									<el-form-item label="开户人:" prop="account_holdera">
										<el-input v-model="account_holdera"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="w8" prop="bank_accounta">
									<el-form-item label="卡号:">
										<el-input v-model="bank_accounta"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</template>
						<el-row>
							<el-col :span="w8">
								<el-form-item label="微信号:">
									<el-input v-model="form.weixin"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="w8">
								<el-form-item label="支付宝号:">
									<el-input v-model="form.alipay"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
					<el-button size="small" class="save" @click="save">保存</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
				loading: false,
				twoBank: false,
				supplier_id: 0,
				crumbList: [{
						crumb: '设置',
						path: ''
					},
					{
						crumb: '公司信息',
						path: ''
					}
				],
				w12: 12,
				w8: 8,
				bank_name: "",
				account_holder: "",
				bank_account: "",
				bank_namea: "",
				account_holdera: "",
				bank_accounta: "",
				form: {
					"city_id": "", //类型：Number  必有字段  备注：城市id
					"address": "", //类型：String  必有字段  备注：地址
					"manager_tel": "", //类型：String  可有字段  备注：座机号
					"weixin": "", //类型：String  可有字段  备注：微信号
					"bank_cards": "",
					"manager_name": "", //类型：String  可有字段  备注：负责人
					"area_id": "", //类型：Number  必有字段  备注：区域id
					"alipay": "", //类型：String  可有字段  备注：支付宝账号
					"province_id": "", //类型：Number  必有字段  备注：省id
					"management_scope": "", //类型：String  可有字段  备注：经营范围
					"manager_phone": "", //类型：String  可有字段  备注：负责人手机号
					"supplier_notice": "", //类型：String  必有字段  备注：店铺公告
					"supplier_logo": "", //类型：String  可有字段  备注：logo保存路径
					"supplier_name": ""
				},
				rules: {
					supplier_name: [{
						required: true,
						message: '请输入公司名称',
						trigger: 'blur'
					}],
					province_id: [{
						required: true,
						message: '请选择地区',
						trigger: 'change'
					}],
					address: [{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur'
					}],
					supplier_notice: [{
						required: false,
						max: 500,
						message: '店铺公告内容在500字以内',
						trigger: 'blur'
					}]
				}
			}
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				let msg = vm.tools.zmGetUser();
				vm.supplier_id = msg.supplier_id;
				if(msg.supplier_id != 0) {
					vm.loading=true;
					vm.$http.zmGet(vm.server.getCompanyMsg, {}).then(res => {
						vm.loading=false;
						if(res.code == 200) {
							console.log(res);
							vm.form = res.data;
						} else {
							this.$message({
								type: 'error',
								message: res.data
							});
						}
					}).catch(error => {
						Promise.reject(error)
					})
				}
			});
		},
		methods: {
			addGetAds(res) {
				this.form.province_id = res.province.id;
				this.form.city_id = res.city.id;
				this.form.area_id = res.area.id;
			},
			addBank() {
				this.twoBank = true;
			},
			getCompanyMsg() {
				this.$http.zmGet(this.server.getCompanyMsg, {}).then(res => {
					if(res.code == 200) {
						console.log(res)
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
			save() {
				this.$refs['form'].validate(valid => {
					if(!valid) {
						return false;
					}
					let data = this.form;
					if(!this.bank_name && !this.bank_namea) { ///当没有银行卡的时候
						data.bank_cards = ""
					} else { ///当有银行卡的时候

					}
					this.loading=true;
					if(this.supplier_id == 0) { ///创建
						this.$http.zmPost(this.server.createCompany, data).then(res => {
							this.loading=false;
							if(res.code == 200) {
								console.log(res)
							} else {
								this.$message({
									type: 'error',
									message: res.data
								});
							}
						}).catch(error => {
							Promise.reject(error)
						})
					} else { ///编辑
						this.$http.zmPost(this.server.editCompany, data).then(res => {
							this.loading=false;
							if(res.code == 200) {
								console.log(res)
							} else {
								this.$message({
									type: 'error',
									message: res.data
								});
							}
						}).catch(error => {
							Promise.reject(error)
						})
					}
				})
			}
		},
		mounted() {

		}
	}
</script>

<style lang="scss">
	.add-bank {
		margin-left: 10px;
		font-size: 24px;
		line-height: 40px;
		cursor: pointer;
	}
	
	.trade-table {
		position: relative;
	}
	
	.crumbs {
		z-index: 10;
	}
	
	.large label {
		font-size: 15px;
		font-weight: bold;
	}
	
	.save {
		display: block;
		margin: 0 auto;
		padding-left: 30px;
		padding-right: 30px;
	}
	
	.up-img {
		position: absolute;
		right: 20%;
		top: 120px;
		z-index: 10;
		width: 170px;
		height: 200px;
	}
	
	.up-img span {
		position: absolute;
		bottom: 0;
		height: 30px;
		width: 100%;
		text-align: center;
		line-height: 30px;
		font-size: 14px;
		color: #999;
	}
	
	.avatar-uploader .el-upload {
		position: absolute;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 170px;
		height: 170px;
		line-height: 160px;
		text-align: center;
		background: #F9FAFC;
	}
	
	.avatar {
		width: 170px;
		height: 170px;
		display: block;
	}
	
	.up-text {
		position: absolute;
		width: 100%;
		text-align: center;
		top: 100px;
		left: 0;
		color: #999;
		z-index: 100;
	}
</style>