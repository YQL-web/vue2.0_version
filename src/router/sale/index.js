/**
 * Created by qiushaoyu on 2017/12/7.
 */
const mainPage = r => require.ensure([], () => r(require('../../views/mainPage.vue')), 'mainPage');
const saleOrderManage = r => require.ensure([], () => r(require('../../views/sale/saleOrderManage.vue')), 'saleOrderManage');
const saleOrderDetails = r => require.ensure([], () => r(require('../../views/sale/saleOrderDetails.vue')), 'saleOrderDetails');
const saleOrderEdit = r => require.ensure([], () => r(require('../../views/sale/saleOrderEdit.vue')), 'saleOrderEdit');
const saleOrderSure = r => require.ensure([], () => r(require('../../views/sale/saleOrderSure.vue')), 'saleOrderSure');

export default {
  path: '/sale',
  name: 'sale',
  redirect: '/sale/saleOrderManage',
  component: mainPage,
  children: [
    {path: "saleOrderManage", name: '销售订单', component: saleOrderManage},
    {path: "saleOrderDetails", name: '订单详情', component: saleOrderDetails},
    {path: "saleOrderEdit", name: '订单编辑', component: saleOrderEdit},
    {path: "saleOrderSure", name: '确认订单', component: saleOrderSure}
  ]
}
