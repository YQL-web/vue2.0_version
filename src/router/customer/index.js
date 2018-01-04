/**
 * Created by qiushaoyu on 2017/12/7.
 */
const mainPage = r => require.ensure([], () => r(require('../../views/mainPage.vue')), 'mainPage');
const customerList = r => require.ensure([], () => r(require('../../views/customer/customerList.vue')), 'customerList');
const customerClass = r => require.ensure([], () => r(require('../../views/customer/customerClass.vue')), 'customerClass');
const customerDetails = r => require.ensure([], () => r(require('../../views/customer/customerDetails.vue')), 'customerDetails');



export default {
  path: '/customer',
  name: 'customer',
  redirect: '/customer/customerList',
  component: mainPage,
  children: [
    {path: "customerList", name: '客户列表', component: customerList,
      children:[
        {path:'customerDetails',name:'客户销量',component: customerDetails}
      ]
    },
    {path: "customerClass", name: '客户分类', component: customerClass}
  ]
  //{
  //  path: "customerViewTo",
  //  name: '客户页面二级入口',
  //  component: customerViewTo,
  //  children:[
  //    {path: "customerList", name: '客户列表', component: customerList},
  //    {path: "customerDetails", name: '客户列表', component: customerDetails},
  //    {path: "customerClass", name: '客户分类', component: customerClass}
  //  ]
  //}
}
