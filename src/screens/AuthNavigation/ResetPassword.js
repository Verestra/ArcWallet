import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Form, Item, Input, Icon, Content} from 'native-base';
import styles from './style';
import OtpInput from '../../components/OTP/OtpInput';
function ResetPassword() {
  const [eyeVisible, setEyeVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const emailRules =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/;
  return (
    <View style={styles.authContainer}>
      <View style={styles.authHeader}>
        <Text style={styles.textHeader}>Zwallet</Text>
      </View>
      <View style={styles.formContainer}>
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
          {step === 1 ? 'Please input your OTP' : 'Reset Password'}
        </Text>
        <Text style={styles.subTextHeader}>
          {step === 0
            ? 'Enter your Zwallet e-mail so we can send you a password reset link.'
            : step === 1
            ? 'We have sent your OTP (One Time Password) code via Email'
            : 'Create and confirm your new password so you can login to Zwallet.'}
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
          </Form>
        ) : step === 1 ? (
          <OtpInput changeHandler={text => setOTP(text)} />
        ) : (
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
                    ? null
                    : password && password.length < 8
                    ? {color: 'red'}
                    : {color: '#6379F4'}
                }
              />
              <Input
                placeholder="Create new password"
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
                    ? null
                    : password.length < 1 ||
                      (confirmPassword && confirmPassword !== password)
                    ? {color: 'red'}
                    : {color: '#6379F4'}
                }
              />
              <Input
                placeholder="Confirm new password"
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
          </Form>
        )}
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
              onPress={() => setStep(1)}>
              <Text
                style={
                  !email
                    ? styles.semiBold
                    : email && !emailRules.test(email)
                    ? styles.semiBold
                    : {...styles.semiBold, ...styles.textWhite}
                }>
                Confirm
              </Text>
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
              onPress={() => setStep(2)}>
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
            </TouchableOpacity>
          </Content>
        ) : (
          <Content style={styles.boxButton}>
            <TouchableOpacity
              onPress={() => console.log('reset-password')}
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
              <Text
                style={
                  !confirmPassword || !password
                    ? styles.semiBold
                    : (password && password.length < 8) ||
                      (confirmPassword && confirmPassword !== password)
                    ? styles.semiBold
                    : {...styles.semiBold, ...styles.textWhite}
                }>
                Reset Password
              </Text>
            </TouchableOpacity>
          </Content>
        )}
      </View>
    </View>
  );
}
export default ResetPassword;
