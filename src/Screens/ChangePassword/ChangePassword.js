import React, { useState } from 'react';
import { View, StyleSheet,TextInput,Button,Text } from 'react-native';
// import { TextInput, Button } from 'react-native-paper';

// const ChangePassword = () => {
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');

//   const handlePasswordChange = () => {
//     // Implement your password change logic here
//     console.log('Changing password...');
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         value={mobileNumber}
//         onChangeText={(text) => setMobileNumber(text)}
//         mode="outlined"
//         style={styles.input}
//       />

//       <TextInput
      
//         value={oldPassword}
//         onChangeText={(text) => setOldPassword(text)}
//         secureTextEntry
//         mode="outlined"
//         style={styles.input}
//       />

//       <TextInput
       
//         value={newPassword}
//         onChangeText={(text) => setNewPassword(text)}
//         secureTextEntry
//         mode="outlined"
//         style={styles.input}
//       />

      
//     </View>
//   );
// };
import AsyncStorage from '@react-native-async-storage/async-storage';
import Btn from '../../Component/Btn';
const ChangePassword = (props) => {
  const [Mobile, setMobile] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const EditPassword = async () => {
    const CustomerId = await AsyncStorage.getItem('detail');
    const Token =await AsyncStorage.getItem('auth_token');
    const Data = {
      eventID: '1002',
      addInfo: {
        CustomerId: +CustomerId,
  Password:oldPassword,
  New_Password:newPassword,
        Mobile: Mobile,
        guid:"4C4C4544-004A-5910-8034-C2C04F4E4D33",
      },     
    };
    console.log(Data)
    try {
      const url = 'http://192.168.33.147:5241/editprofile';
      let getresult = await fetch(url, {
        method: 'POST',
        headers: {'Authorization': `Bearer ${Token}`,
      'guid':"4C4C4544-004A-5910-8034-C2C04F4E4D33",
      'Content-Type': 'application/json'},
      body: JSON.stringify(Data),
      });
      const result = await getresult.json();
      if(result.rData.rCode !== 0) throw new Error(result.rData.rMessage)
 
    } catch (error) {
      console.log(error);
    }
    props.navigation.navigate("Home");
  };
  return (
    <View style={{backgroundColor:'#fff',height:'100%'}}>
      <View style={{marginBottom:60}}>
      <Text style={editstyle.text}>Change <Text style={{color:'#000'}}>Password</Text></Text>
        
      </View>
           <Text style={{color:'black',marginLeft:20,fontWeight:'700'}}>Mobile:</Text>
           <TextInput
            placeholder="Enter Your Mobile"
            keyboardType={'numeric'}
            value={Mobile}
            onChangeText={txt => setMobile(txt)}
            style={editstyle.input}
          /> 
           <Text style={{color:'black',marginLeft:20,fontWeight:'700'}}>Old Password:</Text>
           <TextInput
            placeholder="Enter Your Old Password"
            keyboardType={'numeric'}
            value={oldPassword}
            onChangeText={txt => setOldPassword(txt)}
            style={editstyle.input} /> 
 <Text style={{color:'black',marginLeft:20,fontWeight:'700'}}>New Password:</Text>
          <TextInput
            placeholder="Enter Your New Password"
            keyboardType={'numeric'}
            value={newPassword}
            onChangeText={txt => setNewPassword(txt)}
            style={editstyle.input}
          /> 
            <Btn btn_name={'Edit Data'} txtColor={'white'}  bgColor={'#9391f3'}
          onPress={EditPassword}
        />
    </View>
  )
}
const editstyle = StyleSheet.create({
  input:{
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    height: 40,
    width: '90%',
    marginHorizontal: 20,
    paddingLeft: 25,
    borderBottomColor:"#7673fa",
    borderBottomWidth:2
  },
  text: {
    color: '#7673fa',
    fontSize: 40,
    marginTop: '15%',
    fontWeight: '600',
    marginHorizontal: 30,
  },
})
export default ChangePassword
