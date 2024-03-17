import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { removeIemFromCart } from '../Shoe_list/action/Actions';
import LinearGradient from 'react-native-linear-gradient';
import * as AuthAction from '../../Store/Action/Auth';
import shoestyl from '../Shoe_list/ShoeStyle';
import Btn from '../../Component/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = props => {
  const [dataItem, setDataItems] = useState('');
  const [rerender, setRerender] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const removeItem = async cardId => {
    await dispatch(AuthAction.removeItems(cardId));
    setRerender(prv => !prv);
  };

  useEffect(() => {
    handleAddItemShow();
  }, [rerender]);
  const handleAddItemShow = async () => {
    const CustomerId = await AsyncStorage.getItem('detail');
    const res = await dispatch(AuthAction.addItemShow(CustomerId));
    setDataItems(res.rData.rData);
  };
  //show wishlist----------------------

  const placeOrder = async () => {
    if (calculateTotalPrice() === 0) {
      Alert.alert(
        'Empty Cart',
        'Your cart is empty. Add items before placing an order.',
      );
    } else {
      const CustomerId = await AsyncStorage.getItem('detail');
      const res = await dispatch(AuthAction.placeOrderItem(CustomerId));
      props.navigation.navigate('PlaceOrder');
    }
  };

  const calculateTotalPrice = () => {
    return (dataItem || []).reduce((total, item) => {
      if (item.Status === '0') {
        return total + parseFloat(item.Price);
      }
      return total;
    }, 0);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View
          style={{
            width: '100%',
            height: 70,
            backgroundColor: '#9391F3',
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '700',
              color: '#fff',
              textAlign: 'center',
            }}>
            My Cart
          </Text>
        </View>
        {/* Display total price */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 60,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              paddingLeft: 20,
              marginLeft: 15,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text
              style={{
                fontWeight: '700',
                color: '#9391F3',
                fontSize: 35,
                marginBottom: 5,
              }}>
              ←
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#9391F3',
              marginRight: 15,
              borderBottomColor: '#9391F3',
              borderBottomWidth: 2,
            }}>
            {/* // comment */}
            Total Price: {calculateTotalPrice()}₹
          </Text>
        </View>

        <FlatList
          data={dataItem}
          renderItem={({ item, index }) => {
            if (item.Status == '0') {
              return (
                <View
                  style={{
                    borderColor: '#bbb',
                    padding: 10,
                    elevation: 4,
                    width: 300,
                    height: 175,
                    alignSelf: 'center',
                    marginVertical: 5,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{ uri: item.PImage }}
                      style={{ height: 100, width: 150 }}
                    />
                    <View>
                      <Text style={shoestyl.txt}>{item.Product}</Text>
                      <Text style={shoestyl.txt}>Price - {item.Price}₹</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: '60%',
                        alignSelf: 'center',
                        marginVertical: 12,
                      }}
                      onPress={() => {
                        removeItem(item.CartID);
                      }}>
                      <LinearGradient
                        colors={['#9391F3', '#FB6376']}
                        style={shoestyl.gradient}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: '600',
                          }}>
                          Remove Item
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            } else {
              // If the status is not zero, return null (don't render anything)
              return null;
            }
          }}
        />
        <Btn
          btn_name={'PLACE ORDER'}
          txtColor={'white'}
          bgColor={'#9391f3'}
          onPress={placeOrder}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;
