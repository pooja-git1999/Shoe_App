import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React,{useEffect ,useState}from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import ordertyl from './orderStyle';
import * as AuthAction from '../../Store/Action/Auth'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import shoestyl from '../Shoe_list/ShoeStyle';
const Allorder=async()=>{
  const ID = await AsyncStorage.getItem('detail');

}

const OrderHistoy = props => {
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const items = useSelector(state => state?.Auth?.additem);

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  useEffect(() => {
    handleOrderHistory();
  }, [isFocused]);

  const handleOrderHistory = async () => {
    const CustomerId = await AsyncStorage.getItem('detail');
    const res = await dispatch(AuthAction.orderHistoryCard(CustomerId));
    setOrderHistoryData(res.rData.rData)
    }

  const gotoHome=()=>{
    props.navigation.navigate('Home')
}

const TotalPrice = () => {
  return (orderHistoryData || []).reduce((total, item) => {
    if (item.Status === '2') {
      return total + parseFloat(item.Price);
    }
    return total;
  }, 0);
};
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
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
            Order History
          </Text>
        </View>  
        <FlatList
          data={orderHistoryData}
          renderItem={({item, index}) => {
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
                        // removeItem(item.CartID);
                      }}>
                      {/* <LinearGradient
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
                      </LinearGradient> */}
                    </TouchableOpacity>
                  </View>
                </View>
            );
          }}
        />
           <View
          style={{
            display: 'flex',
            alignItems: 'center',
          }}>
       <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#9391F3',
              borderBottomColor: '#9391F3',
              borderBottomWidth: 2,
            }}>
                  Total Price: {TotalPrice()}₹
            </Text>
        </View>
          <TouchableOpacity style={{display:'flex',alignItems:'center',height:30,width:120,alignSelf:"center",
      justifyContent:'center',backgroundColor:'#9391F3',marginTop:20,borderRadius:5,marginBottom:20}} onPress={gotoHome}>
      <Text style={{       
        fontWeight:'700',
        color:'#fff'}} >« Go To Home</Text>
      </TouchableOpacity>
      </View> 
    </SafeAreaView>
  );
};

export default OrderHistoy;
