import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {Form, Item, Button, Input, Icon} from 'native-base';
import Axios from 'axios';
import {API_URL} from '@env';
import {connect} from 'react-redux';
import {getUser} from '../../redux/actions/user';
function AddPhoneNumber(props) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (success) {
      setSuccess(false);
      props.getUser(`${API_URL}/v1/users`, props.auth.token);
      props.navigation.navigate('Profile');
    }
  }, [success, props.user]);
  const handleSubmit = () => {
    setIsLoading(true);
    Axios.post(
      `${API_URL}/v1/users/phone-number`,
      {phone_number: phoneNumber},
      {
        headers: {
          Authorization: `Bearer ${props.auth.token}`,
        },
      },
    )
      .then(res => {
        setMessage(res.data.message);
        setSuccess(true);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <KeyboardAvoidingView>
      <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 20,
          }}>
          <Icon
            onPress={() => props.navigation.goBack()}
            type="MaterialCommunityIcons"
            name="arrow-left"
            style={{color: '#4D4B57'}}
          />
          {/* <Image
            source={require('../../assets/img/arrow-left-black.png')}
            onPress={() => props.navigation.goBack()}
          /> */}
          <Text style={Styles.pagename}>Add Phone Number</Text>
        </View>
        <Text style={Styles.caption}>
          Add at least one phone number for the transfer ID so you can start
          transfering your money to another user.
        </Text>
        <View style={{marginTop: 50}}>
          <Form style={{paddingRight: 20}}>
            <Item
              style={
                !phoneNumber
                  ? {
                      borderBottomWidth: 2,
                    }
                  : phoneNumber && phoneNumber.length < 10
                  ? {
                      borderBottomColor: 'red',
                      borderBottomWidth: 2,
                    }
                  : {
                      borderBottomColor: '#6379F4',
                      borderBottomWidth: 2,
                    }
              }>
              <Icon
                type="MaterialIcons"
                name="phone"
                style={
                  !phoneNumber
                    ? null
                    : phoneNumber && phoneNumber.length < 10
                    ? {
                        color: 'red',
                      }
                    : {
                        color: '#6379F4',
                      }
                }
              />
              <Input
                keyboardType="numeric"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
                maxLength={12}
              />
            </Item>
            {!phoneNumber ? null : phoneNumber && phoneNumber.length < 10 ? (
              <Text style={{color: 'red'}}>minimum length is 10</Text>
            ) : null}
          </Form>
        </View>

        <Button
          disabled={
            !phoneNumber
              ? true
              : phoneNumber && phoneNumber.length < 10
              ? true
              : false
          }
          block
          style={
            !phoneNumber
              ? {...Styles.button, backgroundColor: '#e6e6e6'}
              : phoneNumber && phoneNumber.length < 10
              ? {...Styles.button, backgroundColor: '#e6e6e6'}
              : Styles.button
          }
          onPress={e => handleSubmit(e)}>
          {props.user.isPending || isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text
              style={
                !phoneNumber
                  ? {...Styles.btnLabel, color: '#6379F4'}
                  : phoneNumber && phoneNumber.length < 10
                  ? {...Styles.btnLabel, color: '#6379F4'}
                  : Styles.btnLabel
              }>
              Submit
            </Text>
          )}
        </Button>
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
  phoneIcon: {
    marginRight: 30,
    marginTop: 10,
    marginLeft: 40,
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
    alignItems: 'center',
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
const mapStateToProps = state => ({
  auth: state.auth.results,
  user: state.user,
});
const mapDispatchToProps = dispatch => ({
  getUser: (url, token) => {
    dispatch(getUser(url, token));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddPhoneNumber);
