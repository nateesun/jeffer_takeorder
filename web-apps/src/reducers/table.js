import produce from "immer"
import { 
  CHECK_LOGOUT, 
  CHECK_LOGOUT_SUCCESS, 
  CHECK_LOGIN_SUCCESS, 
  SEARCH_TABLE_FILE, 
  SEARCH_TABLE_FILE_SUCCESS, 
  SEARCH_TABLE_FILE_FAIL,
  UPDATE_ORDER_ITEM,
  UPDATE_ORDER_ITEM_SUCCESS,
  UPDATE_ORDER_ITEM_FAIL,
  LOAD_SUB_MENU_INDEX,
  LOAD_SUB_MENU_INDEX_SUCCESS,
  LOAD_SUB_MENU_INDEX_FAIL,
  LOAD_SUB_MENU_LIST,
  LOAD_SUB_MENU_LIST_SUCCESS,
  LOAD_SUB_MENU_LIST_FAIL,
  ADD_NEW_ORDER_ITEM,
  ADD_NEW_ORDER_ITEM_SUCCESS,
  ADD_NEW_ORDER_ITEM_FAIL,
  REMOVE_ORDER_INDEX,
  REMOVE_ORDER_INDEX_SUCCESS,
  REMOVE_ORDER_INDEX_FAIL,
  SEND_ORDER_TO_POS,
  SEND_ORDER_TO_POS_SUCCESS,
  SEND_ORDER_TO_POS_FAIL,
  LOAD_EXPANSION_PRODUCT,
  LOAD_EXPANSION_PRODUCT_SUCCESS,
  LOAD_EXPANSION_PRODUCT_FAIL,
  LOAD_LIST_ORDER_DETAIL,
  LOAD_LIST_ORDER_DETAIL_SUCCESS,
  LOAD_LIST_ORDER_DETAIL_FAIL,
  LOAD_TABLE_FILE,
  LOAD_TABLE_FILE_SUCCESS,
  LOAD_TABLE_FILE_FAIL,
  SELECT_TABLE_ACTIVE,
  CLEAR_TABLE,
  CURRENT_ORDER,
  ADD_ORDER,
  CLEAR_ORDER,
  NEW_ORDER,
  LOAD_CHECK_ORDER_LIST,
  LOAD_CHECK_ORDER_LIST_SUCCESS,
  LOAD_CHECK_ORDER_LIST_FAIL,
  SET_ETD_TYPE,
  SELECT_TABLE_ACTIVE_SUCCESS,
  SELECT_TABLE_ACTIVE_FAIL
} from '../actions/constants'

const initialState = {
  empCode: "",
  tableNo: "",
  custCount: 0,
  etd: 'E',
  macno: "",
  NetTotal: 0,
  order: {
    orderNo: "",
    items: [],
    sendToPOS: '',
    removeItem: '',
    addNewItem: '',
    updateItem: '',
    totalAmount: 0,
  },
  orderDetail: {
    code: '',
    tableNo: '',
    orderNo: '',
    menuCode: '',
    menuName: '',
    price: 0,
    qty: 1,
    totalAmount: 0,
    uid: '',
    specialText: [],
    subMenuCode: [],
  },
  orderSubMenu: {
    uid: '',
    subMenuList: [],
    orderSubMenuList: [],
    productCode: '',
    productGroup: '',
  },
  product: {
    orderNo: '',
    menuCode: '',
    expansionItem: [],
  },
  balanceList: [],
  billNo: "",
  tableFileList: [],
}
const tableReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_ORDER_ITEM:
        draft.orderDetail.orderNo = action.payload.orderNo
        draft.orderDetail.code = action.payload.code
        draft.orderDetail.price = action.payload.price
        draft.orderDetail.uid = action.payload.uid
        draft.specialText = action.payload.specialText
        draft.subMenuCode = action.payload.subMenuCode
        break;
      case UPDATE_ORDER_ITEM_SUCCESS:
        draft.order.updateItem = action.payload.msg
        break;
      case UPDATE_ORDER_ITEM_FAIL:
        break;
      case LOAD_SUB_MENU_INDEX:
        draft.orderSubMenu.uid = action.payload.uid
        break;
      case LOAD_SUB_MENU_INDEX_SUCCESS:
        draft.orderSubMenu.subMenuList = action.payload
        break;
      case LOAD_SUB_MENU_INDEX_FAIL:
        break;
      case LOAD_SUB_MENU_LIST:
        draft.orderSubMenu.productCode = action.payload.code
        break;
      case LOAD_SUB_MENU_LIST_SUCCESS:
        draft.orderSubMenu.subMenuList = action.payload
        break;
      case LOAD_SUB_MENU_LIST_FAIL:
        break;
      case LOAD_CHECK_ORDER_LIST:
        break;
      case LOAD_CHECK_ORDER_LIST_SUCCESS:
        draft.balanceList = action.payload
        break;
      case LOAD_CHECK_ORDER_LIST_FAIL:
        break;
      case ADD_NEW_ORDER_ITEM:
        draft.orderDetail.tableNo = action.payload.tableNo
        draft.orderDetail.orderNo = action.payload.orderNo
        draft.orderDetail.menuCode = action.payload.menuCode
        draft.orderDetail.menuName = action.payload.menuName
        draft.orderDetail.price = action.payload.price
        draft.orderDetail.qty = action.payload.qty
        draft.orderDetail.totalAmount = action.payload.totalAmount
        break
      case ADD_NEW_ORDER_ITEM_SUCCESS:
        draft.order.addNewItem = action.payload.msg
        break
      case ADD_NEW_ORDER_ITEM_FAIL:
        break
      case REMOVE_ORDER_INDEX:
        draft.order.uid = action.payload.uid
        draft.order.orderNo = action.payload.order_no
        break
      case REMOVE_ORDER_INDEX_SUCCESS:
        draft.order.removeItem = action.payload.msg
        break
      case REMOVE_ORDER_INDEX_FAIL:
        break
      case SEND_ORDER_TO_POS:
        draft.order.orderNo = action.payload.orderNo
        break
      case SEND_ORDER_TO_POS_SUCCESS:
        draft.order.sendToPOS = action.payload.msg
        draft.tableNo = ''
        draft.order = {
          orderNo: '',
          items: []
        }
        break
      case SEND_ORDER_TO_POS_FAIL:
        break
      case LOAD_EXPANSION_PRODUCT:
        draft.product.orderNo = action.payload.orderNo
        draft.product.menuCode = action.payload.menuCode
        break
      case LOAD_EXPANSION_PRODUCT_SUCCESS:
        draft.product.expansionItem = action.payload
        break
      case LOAD_EXPANSION_PRODUCT_FAIL:
        break
      case LOAD_LIST_ORDER_DETAIL:
        draft.order.orderNo = action.payload.orderNo
        break
      case LOAD_LIST_ORDER_DETAIL_SUCCESS:
        draft.order.items = action.payload.item
        draft.order.totalAmount = action.payload.total
        break
      case LOAD_LIST_ORDER_DETAIL_FAIL:
        break
      case LOAD_TABLE_FILE:
        break
      case LOAD_TABLE_FILE_SUCCESS:
        draft.tableFileList = action.payload
        break
      case LOAD_TABLE_FILE_FAIL:
        break
      case SEARCH_TABLE_FILE:
        break
      case SEARCH_TABLE_FILE_SUCCESS:
        draft.tableFileList = action.payload
        break
      case SEARCH_TABLE_FILE_FAIL:
        break
      case SELECT_TABLE_ACTIVE:
        draft.tableNo = action.payload
        break
      case SELECT_TABLE_ACTIVE_SUCCESS:
        draft.tableNo = action.payload[0].Tcode
        draft.NetTotal = action.payload[0].NetTotal
        break
      case SELECT_TABLE_ACTIVE_FAIL:
        break
      case CLEAR_TABLE:
        draft.tableNo = ""
        break
      case CURRENT_ORDER:
        draft.order = action.payload
        break
      case ADD_ORDER:
        draft.order.items = state.order.items.concat(action.payload)
        break
      case CLEAR_ORDER:
        draft.order = {
          orderNo: "",
          items: []
        }
        break
      case NEW_ORDER:
        draft.empCode = action.payload.emp_code
        draft.tableNo = action.payload.table_no
        draft.order = {
          orderNo: action.payload.order_no,
          items: []
        }
        break
      case CHECK_LOGOUT:
        break
      case CHECK_LOGOUT_SUCCESS:
        // draft.empCode = ''
        draft.tableNo = ''
        draft.order = {
          orderNo: '',
          items: []
        }
        break
      case CHECK_LOGIN_SUCCESS:
        draft.macno = action.payload.macno
        break
      case SET_ETD_TYPE:
        draft.etd = action.payload.etd
        break
      default:
        break
    }
  })

export default tableReducer
