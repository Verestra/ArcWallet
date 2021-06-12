import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {Card,Right} from 'native-base';

function ManagePhoneNumber() {
  const phoneNumber= '0893747776384';
  return (
    <KeyboardAvoidingView>
      <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 20,
          }}>
          <Image source={require('../../assets/img/arrow-left-black.png')} />
          <Text style={Styles.pagename}>Manage Phone Number</Text>
        </View>
        <Text style={Styles.caption}>
          You can only delete the phone number and then you must add another
          phone number.
        </Text>
        <Card
          style={{
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            paddingHorizontal: 15,
            paddingVertical:15,
            borderRadius:10,
            marginTop:60,
          }}>
          <View>
            <Text style={Styles.primary}>Primary</Text>
            <Text style={Styles.number}>{phoneNumber}</Text>
          </View>
          <Right>
            <TouchableOpacity>
              <Image source={require('../../assets/img/deleteVector.png')} />
            </TouchableOpacity>
          </Right>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
const Styles = StyleSheet.create({
  pagename: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#4D4B57',
    marginLeft: 20,
  },
  caption: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 17,
    color: '#7A7886',
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  primary:{
fontFamily: 'NunitoSans',
fontStyle: 'normal',
fontWeight: 'normal',
fontSize: 16,
color: '#7A7886',

  },
  number:{
fontFamily: 'NunitoSans',
fontStyle: 'normal',
fontWeight: 'bold',
fontSize: 22,
color: '#514F5B',
marginTop:10,
  }
});
export default ManagePhoneNumber;
