import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Form, Item, Input, Icon, Footer, Content} from 'native-base';
import styles from './style';
import OtpInput from '../../components/OTP/OtpInput';
import {API_URL} from '@env';
import Axios from 'axios';
function Register(props) {
  const {navigation} = props;
  const [eyeVisible, setEyeVisible] = useState(false);
  const [isFulfilled, setIsFulfilled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [step, setStep] = useState(0);
  const [otp, setOTP] = useState('');
  const [pin, setPin] = useState('');
  const [msgFetch, setMsgFetch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (isFulfilled) {
      setStep(step + 1);
      setIsError(false);
      setIsFulfilled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFulfilled]);
  const emailRules =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/;
  const handleSubmit = event => {
    setIsLoading(true);
    if (step === 0) {
      const postData = {email, username};
      Axios.post(`${API_URL}/v1/auth/generate-otp`, postData)
        .then(res => {
          setMsgFetch(res.data.message);
          setIsFulfilled(true);
          setIsLoading(false);
        })
        .catch(err => {
          setIsError(true);
          console.log(err);
          setIsLoading(false);
        });
    } else if (step === 1) {
      const postData = {email, otp};
      Axios.post(`${API_URL}/v1/auth/otp-verification`, postData)
        .then(res => {
          setMsgFetch(res.data.message);
          setIsFulfilled(true);
          setIsLoading(false);
        })
        .catch(err => {
          setIsError(true);
          console.log(err);
          setIsLoading(false);
        });
    } else if (step === 2) {
      const postData = {email, username, pin, password};
      Axios.post(`${API_URL}/v1/auth/register`, postData)
        .then(res => {
          setMsgFetch(res.data.message);
          setIsFulfilled(true);
          setIsLoading(false);
        })
        .catch(err => {
          setIsError(true);
          console.log(err);
          setIsLoading(false);
        });
    } else if (step === 3) {
      setIsError(false);
      setIsFulfilled(false);
      navigation.navigate('Login');
    }
    event.preventDefault();
  };
  return (
    <View style={styles.authContainer}>
      <View style={styles.authHeader}>
        <Text style={styles.textHeader}>ArcWallet</Text>
      </View>
      <View style={styles.formContainer}>
        {step === 3 ? (
          <Icon
            name="checkmark-circle"
            style={{
              fontSize: 100,
              color: '#1EC15F',
              marginTop: 40,
              alignSelf: 'center',
            }}
          />
        ) : null}

        <Text
          style={
            step === 1
              ? {
                  ...styles.textHeader,
                  ...styles.textBlack,
                  ...styles.fontHeaderSmall,
                }
              : {...styles.textHeader, ...styles.textBlack}
          }>
          {step === 1
            ? 'Please input your OTP'
            : step === 2
            ? 'Create Security PIN'
            : step === 3
            ? 'PIN Successfully Created'
            : 'Register'}
        </Text>
        <Text style={styles.subTextHeader}>
          {step === 1
            ? 'We have sent your OTP (One Time Password) code via Email'
            : step === 2
            ? 'Create a PIN that’s contain 6 digits number for security purpose in ArcWallet.'
            : step === 3
            ? 'Your PIN was successfully created and you can now access all the features in ArcWallet. Login to your new account and start exploring!'
            : 'Create your account to access ArcWallet.'}
        </Text>
        {step === 1 ? (
          <OtpInput changeHandler={text => setOTP(text)} />
        ) : step === 2 ? (
          <OtpInput changeHandler={text => setPin(text)} resetInp={true} />
        ) : step === 0 ? (
          <Form>
            <Item
              style={
                !username
                  ? {borderBottomWidth: 2}
                  : username && username.length < 6
                  ? {borderBottomWidth: 2, borderBottomColor: 'red'}
                  : {borderBottomWidth: 2, borderBottomColor: '#6379F4'}
              }>
              <Icon
                type="MaterialIcons"
                name="person-outline"
                style={
                  !username
                    ? null
                    : username && username.length < 6
                    ? {color: 'red'}
                    : {color: '#6379F4'}
                }
              />
              <Input
                placeholder="Enter your username"
                value={username}
                onChangeText={text => setUsername(text)}
              />
            </Item>
            <View style={{height: 20, paddingLeft: 18}}>
              {username && username.length < 6 ? (
                <Text style={{color: 'red', fontSize: 14}}>
                  username min length is 6
                </Text>
              ) : null}
            </View>
            <Item
              style={
                !email
                  ? {borderBottomWidth: 2}
                  : email && !emailRules.test(email)
                  ? {borderBottomWidth: 2, borderBottomColor: 'red'}
                  : {borderBottomWidth: 2, borderBottomColor: '#6379F4'}
              }>
              <Icon
                type="MaterialIcons"
                name="mail-outline"
                style={
                  !email
                    ? null
                    : email && !emailRules.test(email)
                    ? {color: 'red'}
                    : {color: '#6379F4'}
                }
              />
              <Input
                placeholder="Enter your e-mail"
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </Item>
            <View style={{height: 20, paddingLeft: 18}}>
              {email && !emailRules.test(email) < 8 ? (
                <Text style={{color: 'red', fontSize: 14}}>
                  wrong email format
                </Text>
              ) : null}
            </View>
            <Item
              style={
                !password
                  ? {borderBottomWidth: 2}
                  : password && password.length < 8
                  ? {borderBottomWidth: 2, borderBottomColor: 'red'}
                  : {borderBottomWidth: 2, borderBottomColor: '#6379F4'}
              }>
              <Icon
                type="MaterialIcons"
                name="lock-outline"
                style={
                  !password
                    ? null
                    : password && password.length < 8
                    ? {color: 'red'}
                    : {color: '#6379F4'}
                }
              />
              <Input
                placeholder="Enter your password"
                secureTextEntry={eyeVisible ? false : true}
                value={password}
                onChangeText={text => setPassword(text)}
              />
              <Icon
                style={styles.eyeIcon}
                type="FontAwesome"
                name={eyeVisible ? 'eye' : 'eye-slash'}
                onPress={() => {
                  eyeVisible ? setEyeVisible(false) : setEyeVisible(true);
                }}
              />
            </Item>
            <View style={{height: 20, paddingLeft: 18}}>
              {password && password.length < 8 ? (
                <Text style={{color: 'red', fontSize: 14}}>
                  password min length is 8
                </Text>
              ) : null}
            </View>
          </Form>
        ) : null}
        {step === 1 ? (
          <Content style={styles.boxButton}>
            <TouchableOpacity
              disabled={!otp ? true : otp && otp.length < 6 ? true : false}
              style={
                !otp
                  ? styles.button2
                  : otp && otp.length < 6
                  ? styles.button2
                  : {...styles.button2, ...styles.button2Confirmed}
              }
              onPress={e => handleSubmit(e)}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text
                  style={
                    !otp
                      ? styles.semiBold
                      : otp && otp.length < 6
                      ? styles.semiBold
                      : {...styles.semiBold, ...styles.textWhite}
                  }>
                  Confirm
                </Text>
              )}
            </TouchableOpacity>
          </Content>
        ) : step === 2 ? (
          <Content style={styles.boxButton}>
            <TouchableOpacity
              disabled={!pin ? true : pin && pin.length < 6 ? true : false}
              style={
                !pin
                  ? styles.button2
                  : pin && pin.length < 6
                  ? styles.button2
                  : {...styles.button2, ...styles.button2Confirmed}
              }
              onPress={e => handleSubmit(e)}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text
                  style={
                    !pin
                      ? styles.semiBold
                      : pin && pin.length < 6
                      ? styles.semiBold
                      : {...styles.semiBold, ...styles.textWhite}
                  }>
                  Confirm
                </Text>
              )}
            </TouchableOpacity>
          </Content>
        ) : step === 3 ? (
          <Content style={styles.boxButton}>
            <TouchableOpacity
              style={{...styles.button2, ...styles.button2Confirmed}}
              onPress={e => handleSubmit(e)}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={{...styles.semiBold, ...styles.textWhite}}>
                  Login Now
                </Text>
              )}
            </TouchableOpacity>
          </Content>
        ) : (
          <Content style={styles.boxButton}>
            <TouchableOpacity
              onPress={e => handleSubmit(e)}
              disabled={
                !username || !email || !password
                  ? true
                  : (username && username.length < 6) ||
                    (password && password.length < 8) ||
                    (email && !emailRules.test(email))
                  ? true
                  : false
              }
              style={
                !username || !email || !password
                  ? styles.button2
                  : (username && username.length < 6) ||
                    (password && password.length < 8) ||
                    (email && !emailRules.test(email))
                  ? styles.button2
                  : {...styles.button2, ...styles.button2Confirmed}
              }>
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text
                  style={
                    !username || !email || !password
                      ? styles.semiBold
                      : (username && username.length < 6) ||
                        (password && password.length < 8) ||
                        (email && !emailRules.test(email))
                      ? styles.semiBold
                      : {...styles.semiBold, ...styles.textWhite}
                  }>
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
          </Content>
        )}
      </View>
      {step === 0 ? (
        <Footer style={styles.footer}>
          <Text style={{...styles.greyLink}}>
            Already have an account? Let’s{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </Footer>
      ) : null}
    </View>
  );
}
export default Register;
