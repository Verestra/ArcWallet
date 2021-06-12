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
import {Form,Item, Button, Label,Input, Footer} from 'native-base';


function AddPhoneNumber() {
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
            <Text style={Styles.pagename}>Add Phone Number</Text>
          </View>
          <Text style={Styles.caption}>
            Add at least one phone number for the transfer ID so you can start
            transfering your money to another user.
          </Text>
          <View style={{flexDirection: 'row', marginTop: 50}}>
            <Image
              style={Styles.phoneIcon}
              source={require('../../assets/img/VectorPhone.png')}
            />
            <TextInput
              keyboardType="numeric"
              placeholder="Enter your phone number"
            />
          </View>

          <Button block style={Styles.button}>
            <Text style={Styles.btnLabel}>Submit</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
}
const Styles = StyleSheet.create({
    pagename:{
fontFamily: 'NunitoSans',
fontStyle: 'normal',
fontWeight: 'bold',
fontSize: 20,
color: '#4D4B57',
marginLeft:20,
    },
    phoneIcon:{
        marginRight:30,
        marginTop:10,
        marginLeft:40,
    },
    caption:{
fontFamily: 'NunitoSans',
fontStyle: 'normal',
fontWeight: 'normal',
fontSize: 17,
color: '#7A7886',
width: '90%',
textAlign:'center',
alignSelf:'center',

    },
  button: {
    backgroundColor: '#6379F4',
    borderRadius: 10,
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 25,
    height: 60,
    marginVertical: 30,
    position: 'absolute',
    top: '80%',
    alignItems:'center',
  },
  btnLabel: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: 'blue',
    marginTop: 50,
  },
});
export default AddPhoneNumber;