import AsyncStorage from '@react-native-async-storage/async-storage';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const SHOW_WISHLIST = 'SHOW_WISHLIST';
export const REMOVE_FAV_ITEM = 'REMOVE_FAV_ITEM';
export const PROFIEDATA = 'PROFIEDATA';
// export const CLEAR_CART = 'CLEAR_CART';
export const ADD_TO_ORDER_HISTORY = 'ADD_TO_ORDER_HISTORY';
export const ADDTOCARTITEMS = 'ADDTOCARTITEMS';
export const ADDITEMSHOW = 'ADDITEMSHOW';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const PLACEORDERITEM = 'PLACEORDERITEM';
export const ORDERHISTORY= 'ORDERHISTORY';

// removeFavItems
// addToCartItems
// addItemShow
// placeOrderItem

//add to fav
export const addToFav = (Id, image, name, price) => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('auth_token');

      const response = await fetch('http://192.168.33.147:5241/LikedProducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          guid: '4C4C4544-004A-5910-8034-C2C04F4E4D33',
        },
        body: JSON.stringify({
          eventID: '1001',
          addInfo: {
            CustomerId: +Id,
            PImage: image,
            Product: name,
            Price: price,
          },
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        // console.log(resData, 'resData add to cart items ');
        dispatch({type: ADD_TO_WISHLIST, data: resData});
        return resData;
      }
    } catch (error) {
      console.error(error);
    }
  };
};
// show fav
export const show_wishlist = Id => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await fetch('http://192.168.33.147:5241/LikedProducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          guid: '4C4C4544-004A-5910-8034-C2C04F4E4D33',
        },
        body: JSON.stringify({
          eventID: '1002',
          addInfo: {
            CustomerId: +Id,
          },
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        // console.log(resData ,'resData add to cart show ')
        dispatch({type: SHOW_WISHLIST, data: resData});
        return resData;
      }
    } catch (error) {
      console.error(error);
    }
  };
};
export const removeFavItems = Id => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await fetch('http://192.168.33.147:5241/FavourDel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          guid: '4C4C4544-004A-5910-8034-C2C04F4E4D33',
        },
        body: JSON.stringify({
          eventID: '1001',
          addInfo: {
            FavId: +Id,
          },
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        // console.log(resData ,'remove item  ')
        dispatch({type: REMOVE_FAV_ITEM, data: resData});
        return resData;
      }
    } catch (error) {
      console.error(error);
    }
  };
};
export const clearCart = () => {
  return async dispatch => {
    dispatch({type: CLEAR_CART, data: []});
  };
};
export const addToOrderHistory = data => {
  return async dispatch => {
    dispatch({type: ADD_TO_ORDER_HISTORY, data: data});
  };
};
export const profile = Id => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('auth_token');

      const response = await fetch('http://192.168.33.147:5241/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          guid: '4C4C4544-004A-5910-8034-C2C04F4E4D33',
        },
        body: JSON.stringify({
          eventID: '1001',
          addInfo: {
            CustomerId: +Id,
          },
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        dispatch({type: PROFIEDATA, data: resData});
        return resData;
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const addToCartItems = (Id, image, name, price) => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('auth_token');

      const response = await fetch('http://192.168.33.147:5241/CartItems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          guid: '4C4C4544-004A-5910-8034-C2C04F4E4D33',
        },
        body: JSON.stringify({
          eventID: '1001',
          addInfo: {
            CustomerId: +Id,
            PImage: image,
            Product: name,
            Price: price,
            Total: price,
          },
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        console.log(resData, 'resData add to cart items ');
        dispatch({type: ADDTOCARTITEMS, data: resData});
        return resData;
      }
    } catch (error) {
      console.error(error);
    }
  };
};

// ADDITEMSHOW

export const addItemShow = Id => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await fetch('http://192.168.33.147:5241/CartShow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          guid: '4C4C4544-004A-5910-8034-C2C04F4E4D33',
        },
        body: JSON.stringify({
          eventID: '1001',
          addInfo: {
            CustomerId: +Id,
          },
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        // console.log(resData ,'resData add to cart show ')
        dispatch({type: ADDITEMSHOW, data: resData});
        return resData;
      }
    } catch (error) {
      console.error(error);
    }
  };
};
// REMOVE_ITEM

export const removeItems = Id => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await fetch('http://192.168.33.147:5241/DeleteItems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          guid: '4C4C4544-004A-5910-8034-C2C04F4E4D33',
        },
        body: JSON.stringify({
          eventID: '1001',
          addInfo: {
            CartID: +Id,
          },
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        // console.log(resData ,'remove item  ')
        dispatch({type: REMOVE_ITEM, data: resData});
        return resData;
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const placeOrderItem = Id => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await fetch('http://192.168.33.147:5241/DeleteItems',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          guid: '4C4C4544-004A-5910-8034-C2C04F4E4D33',
        },
        body: JSON.stringify({
          eventID: '1002',
          addInfo: {
            CustomerId: +Id,
          },
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        // console.log(resData ,'remove item  ')
        dispatch({type: PLACEORDERITEM, data: resData});
        return resData;
      }
    } catch (error) {
      console.error(error);
    }
  };
};


// ORDERHISTORY

export const orderHistoryCard= Id => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await fetch('http://192.168.33.147:5241/orderRecords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          guid: '4C4C4544-004A-5910-8034-C2C04F4E4D33',
        },
        body: JSON.stringify({
          eventID: '1001',
          addInfo: {
            CustomerId: +Id,
          },
        }),
      });

      if (response.ok) {
        const resData = await response.json();
        // console.log(resData ,'remove item  ')
        dispatch({type: ORDERHISTORY, data: resData});
        return resData;
      }
    } catch (error) {
      console.error(error);
    }
  };
};
