/**
 * Created by qiushaoyu on 2017/12/7.
 */
const mainPage = r => require.ensure([], () => r(require('../../views/mainPage.vue')), 'mainPage');
const distributionSet = r => require.ensure([], () => r(require('../../views/system/distributionSet.vue')), 'distributionSet');
const companyInfo = r => require.ensure([], () => r(require('../../views/system/companyInfo.vue')), 'companyInfo');
const printModel = r => require.ensure([], () => r(require('../../views/system/printModel.vue')), 'printModel');


export default {
  path: '/system',
  name: 'system',
  redirect: '/system/companyInfo',
  component: mainPage,
  children: [
    {path: "companyInfo", name: '公司信息', component: companyInfo,},
    {path: "printModel", name: '打印模板', component: printModel,},
    {path: "distributionSet", name: '配送规则', component: distributionSet,},
  ]
}
