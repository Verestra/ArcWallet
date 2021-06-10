import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Form, Item, Input, Icon, Footer, Content} from 'native-base';
import styles from './style';
import OtpInput from '../../components/OTP/OtpInput';
function Register(props) {
  const {navigation} = props;
  const [eyeVisible, setEyeVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [step, setStep] = useState(0);
  const [otp, setOTP] = useState('');
  const [pin, setPin] = useState('');
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
          {step === 1
            ? 'Please input your OTP'
            : step === 2
            ? 'Create Security PIN'
            : 'Register'}
        </Text>
        <Text style={styles.subTextHeader}>
          {step === 1
            ? 'We have sent your OTP (One Time Password) code via Email'
            : step === 2
            ? 'Create a PIN that’s contain 6 digits number for security purpose in Zwallet.'
            : 'Create your account to access Zwallet.'}
        </Text>
        {step === 1 ? (
          <OtpInput changeHandler={text => setOTP(text)} />
        ) : step === 2 ? (
          <OtpInput changeHandler={text => setPin(text)} resetInp={true} />
        ) : (
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
            {/* <Text >error email</Text> */}
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
          </Form>
        )}
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
              onPress={() => navigation.navigate('Login')}>
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
            </TouchableOpacity>
          </Content>
        ) : (
          <Content style={styles.boxButton}>
            <TouchableOpacity
              onPress={() => setStep(1)}
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
