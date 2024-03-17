import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
  } from 'react-native';
  import React, { useState } from 'react';
  import {useNavigation} from '@react-navigation/native';
  import {useDispatch, useSelector} from 'react-redux';
  import { removeIemFromCart } from '../Shoe_list/action/Actions';
  import LinearGradient from 'react-native-linear-gradient';
  import * as AuthAction from '../../Store/Action/Auth'
  // import {removeItemFromCart} from './action/Actions';
  import shoestyl from '../Shoe_list/ShoeStyle';
  import Btn from '../../Component/Btn';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const CartShow = (props) => {
    const [image,setimage] = useState()
    const navigation = useNavigation();
    const items = useSelector( state => state?.Auth?.additem);
  
    const dispatch = useDispatch();
  
    // const removeItem = index => {
    //   dispatch(removeIemFromCart(index));
    //   console.log(items) 
    // };
  
    const removeItem =async(index) => {
      console.log(index ,'index')
      await dispatch(AuthAction.removeItems(index));
    };
    const placeorder=async()=>{
        const Token = await AsyncStorage.getItem('auth_token');
        const CustomerId = await AsyncStorage.getItem('details');
      if (calculateTotalPrice() === 0) {
        Alert.alert('Empty Cart', 'Your cart is empty. Add items before placing an order.');
      } else {
         
           
        const data = {
            eventID: '1001',
            addInfo: {
                CustomerId:+CustomerId,
                PImage: image, 
                Product: name, 
                Quantity : quantity,
                Price:   (price), 
                Total :total,
                guid: "4C4C4544-004A-5910-8034-C2C04F4E4D33",
               
            },
          };
          try {
            const url = 'http://192.168.33.147:5241/CartItems';
            let getresult = await fetch(url, {
              method: 'POST',
              headers: {     'Authorization': `Bearer ${Token}`,
              'guid': "4C4C4544-004A-5910-8034-C2C04F4E4D33",
              'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });
            const result = await getresult.json();
            console.log(result, 'kkk');
            if (result) {
                props.navigation.navigate('PlaceOrder');
            }
          } catch (error) {
            console.log(error);
          }
        
      }
    }
  
  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };
   
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1,backgroundColor:'#fff'}}>
          <View
            style={{
              width: '100%',
              height:70,      
           backgroundColor:"#9391F3",
           borderBottomLeftRadius:40,
           borderBottomRightRadius:40,
           justifyContent:'center',
           alignSelf:'center',
           alignItems:'center'
            }}>
                   <Text style={{ fontSize: 30, fontWeight: '700',color:'#fff',textAlign:'center',}}>My Cart</Text>
             </View>
          {/* Display total price */}
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',height:60,alignItems:'center'}}>
          <TouchableOpacity
              style={{
                paddingLeft: 20,
                marginLeft: 15,
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={{fontWeight: '700',color:'#9391F3',fontSize: 35,marginBottom:5}}>←</Text>
            </TouchableOpacity>
         
            <Text style={{ fontSize: 20, fontWeight: '700',color:'#9391F3' , marginRight: 15,borderBottomColor:'#9391F3',
          borderBottomWidth:2}}>
          {/* // comment */}
            Total Price: {calculateTotalPrice()}₹
            </Text>
         
  </View>
  
    
          <FlatList
            data={items}
            renderItem={({item, index}) => {
              return (
                <View
                style={{ 
                  //  alignItems:'center',
                borderColor:'#bbb',
                padding:10,
                elevation:4,
                width:300,
                height:175,
                alignSelf:'center',
                marginVertical:5,
                backgroundColor:'#fff',
                borderRadius:10}}>
  <View style={{display:'flex', flexDirection:'row',justifyContent:'space-between',alignItems: 'center',}}>
                 <Image
                  source={item.image}
                  style={{height:100,width:150}}
                />
                <View>
                <Text style={shoestyl.txt}>{item.name}</Text>
                <Text style={shoestyl.txt}>Price - {item.price}₹</Text>
                </View>
    </View>
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                <TouchableOpacity style={{width:'60%',alignSelf:'center',marginVertical:12}}  onPress={() => {
                    removeItem(index);
                    }}>
                <LinearGradient colors={['#9391F3', '#FB6376']} style={shoestyl.gradient}>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Remove Item</Text>
                </LinearGradient>
           </TouchableOpacity>
         </View>
           </View>
            );
          }}
        />
         <Btn btn_name={'PLACE ORDER'} txtColor={'white'}  bgColor={'#9391f3'}
           onPress={placeorder} />
        </View>
       
      </SafeAreaView>
    );
  };
  
  export default CartShow;
  