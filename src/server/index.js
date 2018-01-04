/**
 * Created by qiushaoyu on 2017/12/6.
 */
import ly_server from './ly_server'
import code_tip from './codeTip'
export default {
  ...ly_server,
  ...code_tip,
  home: {
    'log': '首页',
    'api': "supplier/order/order/index"
  },
  goodsList: {
    'log': '商品列表',
    'api': "supplier/goods/goods/list"
  },
  goodsSave: {
    'log': '商品保存',
    'api': 'supplier/goods/goods/save'
  },
  goodsSearch: {
    'log': '商品搜索',
    'api': 'supplier/goods/goods/search'
  },
  goodsDel: {
    'log': '商品单个删除',
    'api': 'supplier/goods/goods/delete'
  },
  goodsDelAll: {
    'log': '商品批量删除',
    'api': 'supplier/goods/goods/batch-delete'
  },
  goodsExport: {
    'log': '商品导出',
    'api': 'supplier/goods/goods/export'
  },
  goodsImport:{
    'log': '商品导入',
    'api': 'supplier/goods/goods/import'
  },
  goodsClass: {
    'log': '商品分类列表',
    'api': 'supplier/goods/goods/category-list'
  },
  goodsDetail: {
    'log': '商品详情',
    'api': 'supplier/goods/goods/detail'
  },
  unitList: {
    'log': '单位列表',
    'api': 'supplier/goods/goods/unit-list'
  },
  customerList: {
    'log': '客户分类列表',
    'api': 'supplier/custom/custom/category'
  },
  custLists: {
    'log': '客户列表',
    'api': 'supplier/custom/custom/list'
  },
  createCust: {
    'log': '创建客户',
    'api': 'supplier/custom/custom/create'
  },
  createCompany: {
    'log': '创建供应商',
    'api': 'supplier/supplier/supplier/create'
  },
  editCompany: {
    'log': '编辑供应商',
    'api': 'supplier/supplier/supplier/modify'
  },
  getCompanyMsg: {
    'log': '获取供应商信息',
    'api': 'supplier/supplier/supplier/detail'
  },
  getSmsCode: {
    'log': '获取短信验证码',
    'api': 'supplier/public/public/sms-code'
  },
  register: {
    'log': '注册',
    'api': 'supplier/public/public/register'
  },
  login: {
    'log': '登录',
    'api': 'supplier/public/public/login'
  },
  logout: {
    'log': '退出',
    'api': 'supplier/public/public/logout'
  },
  getImgCode: {
    'log': '获取图片验证码',
    'api': 'supplier/public/public/captcha-img'
  },
  resetPasswd: {
    'log': '更新登录密码',
    'api': 'supplier/public/public/reset-passwd'
  },
  brandList: {
    'log': '品牌列表',
    'api': 'supplier/goods/goods/brand-list'
  },
  brandDelete: {
    'log': '品牌删除',
    'api': 'supplier/goods/goods/brand-delete'
  },
  brandCreate: {
    'log': '品牌添加',
    'api': 'supplier/goods/goods/brand-create'
  },
  brandModify: {
    'log': '品牌编辑',
    'api': 'supplier/goods/goods/brand-modify'
  },
  brandDetail: {
    'log': '品牌详情',
    'api': ' supplier/goods/goods/brand-detail'
  },
  orderList: {
    'log': '订单列表',
    'api': 'supplier/order/order/list'
  },
  orderGoodsList: {
    'log': '订单商品列表',
    'api': 'supplier/order/order/goods-list'
  },
  orderstatusUpdate: {
    'log': '订单状态修改',
    'api': 'supplier/order/order/update-status'
  },
  orderDelete: {
    'log': '删除订单',
    'api': 'supplier/order/order/delete-goods'
  },
  orderDetails: {
    'log': '订单详情',
    'api': 'supplier/order/order/detail'
  },
  orderGoodsLast: {
    'log': '获取商品最近一次售价信息',
    'api': 'supplier/order/order/last-order-goods'
  },
  orderSave: {
    'log': '保存订单',
    'api': 'supplier/order/order/save'
  },
  upload: {
    'log': '文件上传',
    'api': 'supplier/supplier/supplier/upload'
  }
}
