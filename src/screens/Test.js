import React from 'react';
import { View, Text} from 'react-native';

function Test ({navigation}) {
    return (
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}>
        <Text
          onPress={() => navigation.navigate('Home')}
          style={{textAlign: 'center', marginBottom: 30, fontSize: 30}}>
          Go To Home
        </Text>
        <Text 
          onPress={() => navigation.navigate('TransactionDetail')}  
          style={{textAlign: 'center', marginBottom: 30, fontSize: 30}}>
          Go To Transaction Detail
        </Text>
         <Text 
          onPress={() => navigation.navigate('TransactionHistory')}  
          style={{textAlign: 'center', marginBottom: 30, fontSize: 30}}>
          Go To Transaction History
          </Text>
        <Text
          onPress={() => navigation.navigate('Login')}
          style={{textAlign: 'center', marginBottom: 30, fontSize: 30}}>
          Go To Login
        </Text>
        <Text
          onPress={() => navigation.navigate('TopUp')}
          style={{textAlign: 'center', marginBottom: 30, fontSize: 30}}>
          Go To TopUp
        </Text>
        <Text
          onPress={() => navigation.navigate('Profile')}
          style={{textAlign: 'center', marginBottom: 30, fontSize: 30}}>
          Go To Profile
        </Text>
      </View>
    );
}
export default Test