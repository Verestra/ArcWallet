import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import { Content} from 'native-base'
import { useNavigation } from '@react-navigation/native';

function Test({setIsLoggedIn}) {
  const navigation = useNavigation(); 
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
      <Content>
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
            onPress={() => navigation.navigate('SearchReceiver')}
            style={{textAlign: 'center', marginBottom: 30, fontSize: 30}}>
            Go To Search Receiver
          </Text>
          <Text
            onPress={() => navigation.navigate('AmountInput')}
            style={{textAlign: 'center', marginBottom: 30, fontSize: 30}}>
            Go To Amount Input
          </Text>
          <Text
            onPress={() => navigation.navigate('Confirmation')}
            style={{textAlign: 'center', marginBottom: 30, fontSize: 30}}>
            Go To Confirmation
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
          <Text
            onPress={() => navigation.navigate('Success')}
            style={{textAlign: 'center', marginBottom: 30, fontSize: 30}}>
            Go To Success
          </Text>
          <Text
            onPress={() => navigation.navigate('Failed')}
            style={{textAlign: 'center', marginBottom: 30, fontSize: 30}}>
            Go To Failed
          </Text>
          <Text
            onPress={() => navigation.navigate('Notification')}
            style={{textAlign: 'center', marginBottom: 30, fontSize: 30}}>
            Go To Notification
          </Text>
          <Text
            onPress={() => navigation.navigate('PersonalInformation')}
            style={{textAlign: 'center', marginBottom: 30, fontSize: 30}}>
            Go To Personal Information
          </Text>
          <Text
            onPress={() => setIsLoggedIn(false)}
            style={{textAlign: 'center', marginBottom: 30, fontSize: 30}}>
            Logout
          </Text>
        </Content>
    </View>
  );
}
export default Test;
