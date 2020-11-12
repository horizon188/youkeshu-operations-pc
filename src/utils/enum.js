

// 配送方式
export const deliveryTypeEnum = {
  delivery: '配送员配送',
  take_for_sale: '门店自提',
}

//配送方
export const deliveryProviderEnum = {
  quick_delivery: '天友及时达',
  dada_logistics: '达达物流配送',
  meituan_delivery: '美团配送',
  formArr: () => {
    return [
      { value: 'quick_delivery', label: '天友及时达' },
      { value: 'dada_logistics', label: '达达物流配送' },
      { value: 'meituan_delivery', label: '美团配送' },
    ]
  }
}

// 下单方式
export const placeWayEnum = {
  seller_place:'商家代下单',
  deliverer_place: '配送员代下单',
  self_place: '自主下单',
  formArr: () => {
    return [
      {value:'seller_place',label:'商家代下单'},
      {value:'deliverer_place',label:'配送员代下单'},
      {value:'self_place',label:'自主下单'},
    ]
  }
}
// 订单状态
export const orderStatusEnum = {
  init: '待付款',
  platform_check: '待平台审核',
  merchant_check:'待商家审核',
  wait_deliver: '待发货',
  wait_receive: '待收货',
  complete: '完成',
  cancel: '取消',
}

// 订单类型
export const orderTypeEnum = {
  period: '周期购订单',
  quick: '及时购订单',
  b2c: 'B2C订单',
  formArr: () => {
    return [
      {value:'period',label:'周期购订单'},
      {value:'quick',label:'及时购订单'},
      {value:'b2c',label:'B2C订单'},
    ]
  }
}

// 订单来源
export const orderSourceEnum = {
  tmall: '天猫',
  jd: '京东到家',
  pos: '售卖机',
  cloud_store: '云商',
  mei_tuan: '美团',
  e_le_mo: '饿了么',
  formArr: () => {
    return [
      {value:'tmall',label:'天猫'},
      {value:'jd',label:'京东到家'},
      {value:'pos',label:'售卖机'},
      {value:'cloud_store',label:'云商'},
      {value:'mei_tuan',label:'美团'},
      {value:'e_le_mo',label:'饿了么'}
    ]
  }
}

// 支付方式
export const spcPayTypeEnum = {
  101: '微信公众号支付',
  100: '微信扫码支付',
  102: '微信APP支付',
  103: '微信付款码支付',
  104: '微信H5支付',
  105: '微信小程序支付',
  500: '支付宝APP支付',
  502: '支付宝扫码支付',
  200: '银行卡支付',
  formArr: () => {
    return [
      {value:'101',label:'微信公众号支付'},
      {value:'100',label:'微信扫码支付'},
      {value:'102',label:'微信APP支付'},
      {value:'103',label:'微信付款码支付'},
      {value:'104',label:'微信H5支付'},
      {value:'105',label:'微信小程序支付'},
      {value:'500',label:'支付宝APP支付'},
      {value:'502',label:'支付宝扫码支付'},
      {value:'200',label:'银行卡支付'},
    ]
  }
}


export default {
  deliveryTypeEnum, 
  placeWayEnum,
  orderStatusEnum,
  orderTypeEnum,
  orderSourceEnum,
  spcPayTypeEnum,
  deliveryProviderEnum
}
