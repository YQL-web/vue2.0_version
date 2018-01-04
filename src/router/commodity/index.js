/**
 * Created by qiushaoyu on 2017/12/7.
 */
const mainPage = r => require.ensure([], () => r(require('../../views/mainPage.vue')), 'mainPage');
const commodityList = r => require.ensure([], () => r(require('../../views/commodity/commodityList.vue')), 'commodityList');
const brandList = r => require.ensure([], () => r(require('../../views/commodity/brandList.vue')), 'brandList');


export default {
  path: '/commodity',
  name: 'commodity',
  redirect: '/commodity/commodityList',
  component: mainPage,
  children: [
    {path: "commodityList", name: '商品资料', component: commodityList,},
    {path: "brandList", name: '品牌列表', component: brandList,},
  ]
}
