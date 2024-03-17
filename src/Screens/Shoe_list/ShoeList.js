import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import shoestyl from './ShoeStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthAction from '../../Store/Action/Auth';
import { useIsFocused } from '@react-navigation/native';
const item = [
  {
    id: 0,
    image: require('../../assets/shoeStore/shoes2.jpg'),
    name: 'Nike maxPro270',
    price: 5000,
  },
  {
    id: 1,
    image: require('../../assets/shoeStore/shoes4.jpg'),
    name: 'Nike max500',
    price: 6000,
  },
  {
    id: 2,
    image: require('../../assets/shoeStore/shoes9.jpg'),
    name: 'Nike x',
    price: 2700,
  },
  {
    id: 3,
    image: require('../../assets/shoeStore/shoes6.jpg'),
    name: 'Nike a270',
    price: 3000,
  },
  {
    id: 4,
    image: require('../../assets/shoe3.jpg'),
    name: 'Nike airmax270',
    price: 1200,
  },
  {
    id: 5,
    image: require('../../assets/shoeStore/shoes10.jpg'),
    name: 'Nike airmax270',
    price: 2700,
  },
];

const Products = props => {
  const items = useSelector(state => state?.Auth?.addtocartitems);
  const [rerender, setRerender] = useState(false);
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    handleCount();
  }, [rerender, isFocused]);

  const handleCount = async () => {
    const CustomerId = await AsyncStorage.getItem('detail');
    const res = await dispatch(AuthAction.addItemShow(CustomerId));
    const filteredData = res.rData.rData?.filter(item => item.Status === '0');
    const newCount = filteredData?.length;
    // console.log(newCount, 'New count');
    if (newCount !== count) {
      setCount(newCount);
      setRerender(prev => !prev);
    }
  };
  //add to cart ----------------------------
  const handleAddToCart = async item => {
    const CustomerId = await AsyncStorage.getItem('detail');
    await dispatch(
      AuthAction.addToCartItems(
        CustomerId,
        item.image,
        item.name,
        item.price,
        item.price,
      ),
    );
    setRerender(prev => !prev);
  };
  //add to wishlist----------------------------
  const handleAddtofav = async item => {
    const CustomerId = await AsyncStorage.getItem('detail');
    await dispatch(
      AuthAction.addToFav(
        CustomerId,
        item.image,
        item.name,
        item.price,
      ),
    );

  };

  //api call
  const ShowData = async () => {
    const Token = await AsyncStorage.getItem('auth_token');
    const CustomerId = await AsyncStorage.getItem('detail');
    const Data = {
      eventID: '1001',
      addInfo: {
        CustomerId: +CustomerId,
        guid: '4C4C4544-004A-5910-8034-C2C04F4E4D33',
      },
    };
    try {
      const url = 'http://192.168.33.147:5241/BrandPage';
      let getresult = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Token}`,
          guid: '4C4C4544-004A-5910-8034-C2C04F4E4D33',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Data),
      });
      const result = await getresult.json();
      setPosts(result.rData.rData);

      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ShowData();
  }, []);
  const back = () => {
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: '100%',
            height: 70,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: 20,
          }}>
          <Text
            onPress={back}
            style={{
              color: '#000',
              marginLeft: 8,
              fontSize: 18,
              fontWeight: '600',
            }}>
            « Go Back
          </Text>
          <View>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: 35,
                marginTop: 10,
                backgroundColor: '#9391F3',
                width: 80,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.navigate('Cart');
              }}>
              <Icon
                name="shopping-cart"
                color="white"
                size={25}
                style={{ marginRight: 15 }}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontWeight: '800',
                  color: 'white',
                }}>
                {count}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={posts}
          renderItem={({ item }) => {
            // const isFavorite = items.some(fav => fav.id === item.id)
            return (
              <View style={shoestyl.container}>
                <TouchableOpacity
                  style={{ position: 'absolute', left: '85%', top: 5 }}
                  onPress={() => handleAddtofav(item)}
                >
                  <Icon name="heart" size={30} color={'#bbb'} />
                </TouchableOpacity>
                <Image source={{ uri: item.image }} style={shoestyl.img} />
                <Text style={shoestyl.txt}>{item.name}</Text>
                <Text style={shoestyl.txt}>Price - {item.price}₹</Text>

                <TouchableOpacity
                  style={shoestyl.button}
                  onPress={() => {
                    handleAddToCart(item);
                  }}>
                  <LinearGradient
                    colors={['#9391F3', '#FB6376']}
                    style={shoestyl.gradient}>
                    <Text
                      style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                      Add To Cart
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Products;
