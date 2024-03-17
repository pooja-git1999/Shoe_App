import {
  ADD_ITEM,
  ADD_TO_WISHLIST,
  SHOW_WISHLIST,
  REMOVE_ITEM,
  REMOVE_FAV_ITEM,
  PROFIEDATA,
  ADD_TO_ORDER_HISTORY,
  ADDTOCARTITEMS,
  ADDITEMSHOW,
  ORDERHISTORY
} from '../Action/Auth';

const initialState = {
  additem: [],
  addtowishlist: [],
  wishlistshow: [],
  removeitem: [],
  removefavitem: [],
  profiledata: null,
  orderHistory: [],
  addtocartitems: [],
  additemshow: [],
  orderhistory: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        additem: [...state.additem, action.data],
        removecart: [...state.additem, action.data],
      };

    case ADD_TO_WISHLIST:
      return {
        ...state,
        addtowishlist: [...state.addtowishlist, action.data],
      };

    case SHOW_WISHLIST:
      return {
        ...state,
        wishlistshow: action.data,
      };

    case ADD_TO_ORDER_HISTORY: {
      return {
        ...state,
        orderHistory: [...state.orderHistory, action.data],
      };
    }

    case REMOVE_ITEM: {
      const indexToRemove = action.data;
      const removedItem = state.additem.find(
        (item, index) => index === indexToRemove,
      );
      return {
        ...state,
        additem: state.additem.filter((item, index) => index !== indexToRemove),
        removeitem: [...state.removeitem, removedItem],
      };
    }

    case REMOVE_FAV_ITEM: {
      const indexToRemove = action.data;
      console.log(state.addtowishlist, '-------------------------')
      const removedItem = state.addtowishlist.find(
        (item, index) => index === indexToRemove,
      );

      return {
        ...state,
        addtowishlist: state.addtowishlist.filter(
          (item, index) => index !== indexToRemove),
        removefavitem: [...state.removefavitem, removedItem],
      };
    }
    case PROFIEDATA:
      return {
        ...state,
        profiledata: action.data,
      };
    case ADDTOCARTITEMS:
      return {
        ...state,
        addtocartitems: action.data,
      };
    case ADDITEMSHOW:
      return {
        ...state,
        additemshow: action.data,
      };
      case ORDERHISTORY:
        return {
          ...state,
          orderhistory: action.data,
        };
      // orderhistory


    default:
      return state;
  }
};
