import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Form, Item, Input, Icon, Content} from 'native-base';
import styles from './style';
import OtpInput from '../../components/OTP/OtpInput';
import {
  postSendOTP,
  postVerifyOTP,
  postResetPassword,
} from './../../redux/actions/auth';
import {API_URL} from '@env';
import {persistor} from './../../redux/store';
import {connect} from 'react-redux';
function ResetPassword(props) {
  const {navigation} = props;
  const {auth} = props;
  const [eyeVisible, setEyeVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  useEffect(() => {
    if (props.auth.isFulfilled) {
      setStep(step + 1);
      persistor.purge();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.auth]);
  const emailRules =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/;
  const handleSubmit = event => {
    if (step === 0) {
      const postData = {email: email};
      console.log('sended');
      props.postSendOTP(`${API_URL}/v1/auth/reset-password`, postData);
    } else if (step === 1) {
      const postData = {otp, email};
      console.log('Verified');
      props.postVerifyOTP(`${API_URL}/v1/auth/otp-verification`, postData);
    } else if (step === 2) {
      const postData = {email, otp, password: confirmPassword};
      console.log('Success Reset');
      props.postResetPassword(`${API_URL}/v1/auth/new-password`, postData);
    } else if (step === 3) {
      persistor.purge();
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
            : step === 3
            ? 'Password Changed!'
            : 'Reset Password'}
        </Text>
        <Text
          style={{
            ...styles.text3,
            textAlign: 'center',
            paddingHorizontal: 30,
            marginBottom: 35,
          }}>
          {step === 0
            ? 'Enter your ArcWallet e-mail so we can send you a password reset link.'
            : step === 1
            ? 'We have sent your OTP (One Time Password) code via Email'
            : step === 3
            ? 'Click button to Login'
            : 'Create and confirm your new password so you can login to ArcWallet.'}
        </Text>
        {step === 0 ? (
          <Form>
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
                    ? {color: '#A9A9A9'}
                    : email && !emailRules.test(email)
                    ? {color: 'red'}
                    : {color: '#6379F4'}
                }
              />
              <Input
                placeholder="Enter your e-mail"
                placeholderTextColor="#A9A9A9"
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </Item>
          </Form>
        ) : step === 1 ? (
          <OtpInput changeHandler={text => setOTP(text)} />
        ) : step === 2 ? (
          <Form>
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
                    ? {color: '#A9A9A9'}
                    : password && password.length < 8
                    ? {color: 'red'}
                    : {color: '#6379F4'}
                }
              />
              <Input
                placeholder="Create new password"
                placeholderTextColor="#A9A9A9"
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
            <Item
              style={
                !confirmPassword
                  ? {borderBottomWidth: 2}
                  : password.length < 1 ||
                    (confirmPassword && confirmPassword !== password)
                  ? {borderBottomWidth: 2, borderBottomColor: 'red'}
                  : {borderBottomWidth: 2, borderBottomColor: '#6379F4'}
              }>
              <Icon
                type="MaterialIcons"
                name="lock-outline"
                style={
                  !confirmPassword
                    ? {color: '#A9A9A9'}
                    : password.length < 1 ||
                      (confirmPassword && confirmPassword !== password)
                    ? {color: 'red'}
                    : {color: '#6379F4'}
                }
              />
              <Input
                placeholder="Confirm new password"
                placeholderTextColor="#A9A9A9"
                secureTextEntry={eyeVisible ? false : true}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
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
              {!confirmPassword ? null : password.length < 1 ||
                (confirmPassword && confirmPassword !== password) ? (
                <Text style={{color: 'red', fontSize: 14}}>
                  password doesn't match
                </Text>
              ) : (
                <Text style={{color: 'green', fontSize: 14}}>
                  <Icon
                    name="checkmark-circle"
                    style={{fontSize: 16, color: '#1EC15F'}}
                  />
                  password match
                </Text>
              )}
            </View>
          </Form>
        ) : null}
        {step === 0 ? (
          <Content style={styles.boxButton}>
            <TouchableOpacity
              disabled={
                !email ? true : email && !emailRules.test(email) ? true : false
              }
              style={
                !email
                  ? styles.button2
                  : email && !emailRules.test(email)
                  ? styles.button2
                  : {...styles.button2, ...styles.button2Confirmed}
              }
              onPress={e => handleSubmit(e)}>
              {auth.isPending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text
                  style={
                    !email
                      ? {...styles.text2, textAlign: 'center', color: '#A9A9A9'}
                      : email && !emailRules.test(email)
                      ? {...styles.text2, textAlign: 'center', color: '#A9A9A9'}
                      : {...styles.text1, ...styles.textWhite}
                  }>
                  Confirm
                </Text>
              )}
            </TouchableOpacity>
          </Content>
        ) : step === 1 ? (
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
              {auth.isPending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text
                  style={
                    !otp
                      ? {...styles.text2, textAlign: 'center', color: '#A9A9A9'}
                      : otp && otp.length < 6
                      ? {...styles.text2, textAlign: 'center', color: '#A9A9A9'}
                      : {...styles.text1, ...styles.textWhite}
                  }>
                  Confirm
                </Text>
              )}
            </TouchableOpacity>
          </Content>
        ) : step === 2 ? (
          <Content style={styles.boxButton}>
            <TouchableOpacity
              onPress={e => handleSubmit(e)}
              disabled={
                !confirmPassword || !password
                  ? true
                  : (password && password.length < 8) ||
                    (confirmPassword && confirmPassword !== password)
                  ? true
                  : false
              }
              style={
                !confirmPassword || !password
                  ? styles.button2
                  : (password && password.length < 8) ||
                    (confirmPassword && confirmPassword !== password)
                  ? styles.button2
                  : {...styles.button2, ...styles.button2Confirmed}
              }>
              {auth.isPending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text
                  style={
                    !confirmPassword || !password
                      ? {...styles.text2, textAlign: 'center', color: '#A9A9A9'}
                      : (password && password.length < 8) ||
                        (confirmPassword && confirmPassword !== password)
                      ? {...styles.text2, textAlign: 'center', color: '#A9A9A9'}
                      : {...styles.text1, ...styles.textWhite}
                  }>
                  Reset Password
                </Text>
              )}
            </TouchableOpacity>
          </Content>
        ) : (
          <Content style={styles.boxButton}>
            <TouchableOpacity
              onPress={e => handleSubmit(e)}
              disabled={
                !confirmPassword || !password
                  ? true
                  : (password && password.length < 8) ||
                    (confirmPassword && confirmPassword !== password)
                  ? true
                  : false
              }
              style={{...styles.button2, ...styles.button2Confirmed}}>
              {auth.isPending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={{...styles.semiBold, ...styles.textWhite}}>
                  Login Now
                </Text>
              )}
            </TouchableOpacity>
          </Content>
        )}
      </View>
    </View>
  );
}
const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
  postSendOTP: (url, data) => {
    dispatch(postSendOTP(url, data));
  },
  postVerifyOTP: (url, data) => {
    dispatch(postVerifyOTP(url, data));
  },
  postResetPassword: (url, data, token) => {
    dispatch(postResetPassword(url, data, token));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
