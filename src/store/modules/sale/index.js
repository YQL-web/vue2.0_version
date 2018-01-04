const state = {
  order_status:[
    {
      value:'',
      label:'全部'
    },
    {
      value:'0',
      label:'草稿'
    },
    {
      value:'1',
      label:'客户待确认'
    },
    {
      value:'2',
      label:'完成'
    },
    {
      value:'3',
      label:'供应商待确认'
    },
    {
      value:'4',
      label:'配货'
    },
    {
      value:'5',
      label:'配送'
    },
    {
      value:'6',
      label:'客户取消'
    },
    {
      value:'7',
      label:'供应商取消'
    },
  ],
  order_type:[
    {
      value:'',
      label:'全部'
    },
    {
      value:'1',
      label:'在线订单'
    },
    {
      value:'2',
      label:'代下单'
    }
  ]
}

const getters = {

}

const action = {

}

const mutations = {

}


export default {
  sale: {
    namespaced: true,
    state,
    getters,
    action,
    mutations
  }
}
