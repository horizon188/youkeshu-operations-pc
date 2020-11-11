// import LoginMod from 'pages/login/loginMod';
import AppStore from 'widget/App/AppStore';
// 地图组件
import MapDemoMod from 'pages/Demo/Map/MapDemoMod';
// 用户列表
import UserListMod from 'pages/Demo/User/UserList/UserListMod';
// 用户编辑
import UserEditMod from 'pages/Demo/User/UserEdit/UserEditMod';

/* ----------------------------商品管理start----------------------------------------- */
// 新增常规促销规则
import AddNormalRuleMod from 'pages/PromotionRule/AddNormalRule/AddNormalRuleMod';
// 规格类型列表
import SpeTypeMod from 'pages/GoodsMgt/AttributeMgt/SpeType/SpeTypeMod';
// 属性列表
import AttributeListMod from 'pages/GoodsMgt/AttributeMgt/SpeType/AttributeList/AttributeListMod';
// 计量单位管理
import MeaUnitMgtMod from 'pages/GoodsMgt/MeaUnitMgt/MeaUnitMgtMod';
// 品牌管理
import BrandMgtMod from 'pages/GoodsMgt/BrandMgt/BrandMgtMod';
// 装箱规则管理
import PackRuleMgtMod from 'pages/GoodsMgt/PackRuleMgt/PackRuleMgtMod';
// 新增商品
import AddGoodsMod from 'pages/GoodsMgt/GoodsList/AddGoods/AddGoodsMod';
// 商品详情
import GoodsDetailMod from 'pages/GoodsMgt/GoodsList/GoodsDetail/GoodsDetailMod';
// 新增销售商品政策
import AddPolicyMod from 'pages/GoodsMgt/GoodsPolMgt/addPolicy/addPolicyMod';
// 商品销售政策详情
import PolicyDetailMod from 'pages/GoodsMgt/GoodsPolMgt/PolicyDetail/PolicyDetailMod';
// 新增编辑复制合同管理
import AddSalePolicyMod from 'pages/ContractMgt/addContract/addContMod';
// 商品政策采购详情
import SalePolicyDetailMod from 'pages/GoodsMgt/GoodsPurPolMgt/PolicyDetail/PolicyDetailMod';
// 商品政策详情
import CategoryMgtMod from 'pages/GoodsMgt/CategoryMgt/CategoryMgtMod';
// DIY商品标签列表
import DiyListMod from 'pages/GoodsMgt/DiyGoodsLabList/DiyListMod';

/* ----------------------------商品管理end----------------------------------------- */

/* ----------------------------收款台管理start----------------------------------------- */
//收款台列表
import PosListMod from 'pages/Pos/PosList/PosListMod';
//收款台监测
import MonitoringMod from 'pages/Pos/Monitoring/MonitoringMod';
//收款台销售明细
import SalesDetailMod from 'pages/Pos/SalesDetail/SalesDetailMod';
//收款台销售统计
import SalesStatisticsMod from 'pages/Pos/SalesStatistics/SalesStatisticsMod';
//收款台收银统计
import CashierStatisticsMod from 'pages/Pos/CashierStatistics/CashierStatisticsMod';
/* ----------------------------收款台管理end----------------------------------------- */

/* ----------------------------店铺管理start----------------------------------------- */

// 店铺收款台列表
import ShopPosListMod from 'pages/shopManagement/PosList/PosListMod';

/* ----------------------------店铺管理end----------------------------------------- */

/* ----------------------------仓库管理start----------------------------------------- */
//仓库列表
import StoresListMod from 'pages/StoresMgt/StoresList/StoresListMod';
//库存
import StoreStockListMod from 'pages/StoresMgt/StoreStockList/StoreStockListMod';
/* ----------------------------仓库管理end----------------------------------------- */

/* ----------------------------商家管理start----------------------------------------- */
//商家列表
import MerchantListMod from 'pages/MerchantMgt/MerchantList/MerchantListMod';
//新增商家
import AddMerchantMod from 'pages/MerchantMgt/AddMerchant/AddMerchantMod';
//编辑商家
import EditMerchantMod from 'pages/MerchantMgt/EditMerchant/EditMerchantMod';
//商家查看
import MerchantCheckMod from 'pages/MerchantMgt/MerchantCheck/MerchantCheckMod';
//商家组织管理
import MerchantOrganMgtMod from 'pages/MerchantMgt/MerchantOrganMgt/MerchantOrganMgtMod';
// 商家返利管理
import MerRebateMgtMod from 'pages/MerchantMgt/MerRebateMgt/MerRebateMgtMod';
/* ----------------------------商家管理end----------------------------------------- */

/* ----------------------------区域管理start----------------------------------------- */
// 栅格管理
import GridMgtMod from 'pages/RegionMgt/GridMgt/GridMgtMod';
// 小区管理
import ResidentMgtMod from 'pages/RegionMgt/ResidentMgt/ResidentMgtMod';
/* ----------------------------区域管理end----------------------------------------- */

/* ----------------------------订单管理start----------------------------------------- */
//订单列表
import OrderListMod from 'pages/OrderMgt/OrderList/OrderListMod';
//周期购订单详情
import CycPurOrderDetailMod from 'pages/OrderMgt/CycPurOrderDetail/CycPurOrderDetailMod';
// 申请售后
import ApplyCusSerMod from 'pages/OrderMgt/ApplyCusSer/ApplyCusSerMod';
// 售后单详情
import AfterMarketDetailMod from 'pages/OrderMgt/CusSerOrderList/AfterMarketDetail/AfterMarketDetailMod';
/* ----------------------------订单管理end----------------------------------------- */

/* ----------------------------权限管理start----------------------------------------- */
// 新增角色
import AddRoleMod from 'pages/AuthorityMgt/RoleMgt/AddRole/AddRoleMod';
// 用户管理
import UserMgtMod from 'pages/AuthorityMgt/UserMgt/UserMgtMod';
/* ----------------------------权限管理end----------------------------------------- */

/* ----------------------------内容管理start----------------------------------------- */
// 新增文案
import AddWordMod from 'pages/ContentMgt/WordMgt/AddWord/AddWordMod';
// 商城规则文案
import MerRuleWordMod from 'pages/ContentMgt/MerRuleWord/MerRuleWordMod';
// 商城公告管理
import MerNoticeMgtMod from 'pages/ContentMgt/MerNoticeMgt/MerNoticeMgtMod';
/* ----------------------------内容管理end----------------------------------------- */

/* ----------------------------系统设置start----------------------------------------- */
// 系统设置
import FrontBasicSetMod from 'pages/SystermMgt/FrontBasicSet/FrontBasicSetMod';
/* ----------------------------系统设置end----------------------------------------- */

/* ----------------------------促销管理start----------------------------------------- */
// 新增阶梯拼团
import AddLadCollageMod from 'pages/PromotionMgmt/LadderCollage/AddLadCollage/AddLadCollageMod';
//新增拼团
import AddGroManMod from 'pages/PromotionMgmt/GroupManagement/AddGroupManagement/AddGroManMod';
// 查看拼团信息
import GroupGoodsDetailMod from 'pages/PromotionMgmt/GroupManagement/GroupGoodsDetail/GroupGoodsDetailMod';
/* ----------------------------促销管理end----------------------------------------- */

// // 示例状态机
// import TimeZoneMod from 'pages/TimeZone/TimeZoneMod';
// import AddTemplateMod from 'pages/TemplateControl/AddTemplate/AddTemplateMod';
import AttrGroupControlMod from 'pages/AttrControl/AttrGroupControl/AttrGroupControlMod';

// 供应商列表
import SupplierListMod from 'pages/SupplierMgt/SupplierList/SupplierListMod';
// 新增商家
import AddSupplierMod from 'pages/SupplierMgt/AddSupplier/AddSupplierMod';
// 临期促销
import ImpendingMod from 'pages/PromotionMgmt/Impending/ImpendingMod';


// 秒杀
import AddSeckillMod from 'pages/PromotionMgmt/SeckillMgt/AddLadCollage/AddSeckillMod';
// 结算日管理
import BalanceDateMod from 'pages/Rebate/BalanceDate/BalanceDateMod';
// 返利项目管理
import RebateProjectMod from 'pages/Rebate/RebateProject/RebateProjectMod';
// 新增编辑返利项目
import UpdateRebateProjectMod from 'pages/Rebate/RebateProject/UpdateRebateProject/UpdateRebateProjectMod';
// 外部对账 废弃
// import ReconciliationListMod from 'pages/Reconciliation/ReconciliationList/ReconciliationListMod';
// 订单费用明细 废弃
// import OrderCostMod from 'pages/Reconciliation/OrderCost/OrderCostMod';
// 订单收款核算
import OrderColAccountMod from 'pages/Reconciliation/OrderColAccount/OrderColAccountMod';
// 门店对账差异统计 废弃
// import DifferStaMod from 'pages/Reconciliation/DifferSta/DifferStaMod';
// 信用额度
import CreditMod from 'pages/Account/Credit/CreditMod';
// 销售订单
import SalesMod from 'pages/Account/Sales/SalesMod';
// 提现单管理
import WithdrawMod from 'pages/Account/Withdraw/WithdrawMod';
// 预存款变动明细
import DepositMod from 'pages/Account/Deposit/DepositMod';
// 提现单审核
import CheckMod from 'pages/Account/Withdraw/Check/CheckMod';
// 返利考核指标
import AppraiseMod from 'pages/Rebate/Appraise/AppraiseMod';
// 商家返利
import MerchantMod from 'pages/Rebate/Merchant/MerchantMod';
// 查看考核指标
import ViewMod from 'pages/Rebate/Appraise/View/ViewMod';
// 添加考核指标
import AppraiseAddMod from 'pages/Rebate/Appraise/AppraiseAdd/AppraiseAddMod';
// 编辑考核指标
import AppraiseEditMod from 'pages/Rebate/Appraise/AppraiseEdit/AppraiseEditMod';
// 对账单差异明细 废弃
// import ItemDiffMod from 'pages/Reconciliation/DifferSta/ItemDiff/ItemDiffMod';
// 查看商家返利
import ModifyMerchantMod from 'pages/Rebate/Merchant/ModifyMerchant/ModifyMerchantMod';
// 审核商家返利
import CheckMerchantMod from 'pages/Rebate/Merchant/CheckMerchant/CheckMerchantMod';
// 第三方店铺管理
import ThirdStoreManMod from 'pages/ThirdPartyMan/ThirdStoreMan/ThirdStoreManMod';
// 第三方商品管理
import ThirdComManMod from 'pages/ThirdPartyMan/ThirdComMan/ThirdComManMod';
// 第三方店铺商品管理
import ThirdStoreMerchManMod from 'pages/ThirdPartyMan/ThirdStoreMerchMan/ThirdStoreMerchManMod';
// 到家商品标签分组
import ThirdHomeGoodsGroMod from 'pages/ThirdPartyMan/ThirdHomeGoodsGro/ThirdHomeGoodsGroMod';
// 评价管理
import EstimateMod from 'pages/Estimate/Estimate/EstimateMod';
// 商品评价
import ProductMod from 'pages/Estimate/Product/ProductMod';
// 店铺评价
import ShopMod from 'pages/Estimate/Shop/ShopMod';
// 商品评价列表
import ProEstListMod from 'pages/Estimate/ProEstList/ProEstListMod';
// 店铺评价列表
import ShopEstListMod from 'pages/Estimate/ShopEstList/ShopEstListMod';
// 商品评价详情
import EstDetailMod from 'pages/Estimate/EstDetail/EstDetailMod';
// 评价审核列表
import EstCheckMod from 'pages/Estimate/EstCheck/EstCheckMod';

// 佚名
// 对账单差异
import ItemDiffMod from 'pages/Reconciliation/ItemDiff/ItemDiffMod';
// 待对账单交易统计  
import WaitRecStaticsMod from 'pages/Reconciliation/ImportList/ImportListMod'
// 对账渠道设置
import ChannelSetMod from 'pages/Reconciliation/ItemDiff/ItemDiffMod';
// 对账单导入
import ImportListMod from 'pages/Reconciliation/ImportList/ImportListMod'
//---MOD_IMPORT---
// 上面这个标记不能去掉

export {
  // LoginMod,
  AppStore,
  MapDemoMod,
  UserListMod,
  UserEditMod,
  AddNormalRuleMod,
  SpeTypeMod,
  AttributeListMod,
  MeaUnitMgtMod,
  BrandMgtMod,
  PackRuleMgtMod,
  StoresListMod,
  StoreStockListMod,
  AddGoodsMod,
  MerchantListMod,
  AddMerchantMod,
  EditMerchantMod,
  MerchantCheckMod,
  MerchantOrganMgtMod,
  GoodsDetailMod,
  AddPolicyMod,
  PolicyDetailMod,
  GridMgtMod,
  ResidentMgtMod,
  OrderListMod,
  CycPurOrderDetailMod,
  AddRoleMod,
  UserMgtMod,
  CategoryMgtMod,
  AddWordMod,
  MerRuleWordMod,
  MerNoticeMgtMod,
  FrontBasicSetMod,
  ApplyCusSerMod,
  MerRebateMgtMod,
  PosListMod,
  MonitoringMod,
  SalesDetailMod,
  SalesStatisticsMod,
  CashierStatisticsMod,
  ShopPosListMod,
  AfterMarketDetailMod,
  AddSalePolicyMod,
  SalePolicyDetailMod,
  AttrGroupControlMod,
  SupplierListMod,
  AddSupplierMod,
  DiyListMod,
  AddLadCollageMod,
  AddGroManMod,
  GroupGoodsDetailMod,
  ImpendingMod,
  AddSeckillMod,
  BalanceDateMod,
  RebateProjectMod,
  UpdateRebateProjectMod,
  // ReconciliationListMod,
  // OrderCostMod,
  OrderColAccountMod,
  // DifferStaMod,
  CreditMod,
  SalesMod,
  WithdrawMod,
  DepositMod,
  CheckMod,
  AppraiseMod,
  MerchantMod,
  ViewMod,
  AppraiseAddMod,
  AppraiseEditMod,
  // ItemDiffMod,
  ModifyMerchantMod,
  CheckMerchantMod,
  ThirdStoreManMod,
  ThirdComManMod,
  ThirdStoreMerchManMod,
  ThirdHomeGoodsGroMod,
  EstimateMod,
  ProductMod,
  ShopMod,
  ProEstListMod,
  ShopEstListMod,
  EstDetailMod,
  EstCheckMod,
  ItemDiffMod,
  ChannelSetMod,
  ImportListMod,
  WaitRecStaticsMod
  //---MOD_EXPORT---
  // 上面这个标记不能去掉
}
