import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Form, Item, Input, Icon, Footer, Content} from 'native-base';
import styles from './style';
function Login(props) {
  const {setIsLoggedIn} = props;
  const navigation = useNavigation();
  const [eyeVisible, setEyeVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRules =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/;
  return (
    <View style={styles.authContainer}>
      <View style={styles.authHeader}>
        <Text style={styles.textHeader}>Zwallet</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={{...styles.textHeader, ...styles.textBlack}}>Login</Text>
        <Text style={styles.subTextHeader}>
          Login to your existing account to access all the features in Zwallet.
        </Text>
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
          <Item style={styles.rightSide}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPassword')}>
              <Text style={{...styles.linkSmall}}>Forgot Password?</Text>
            </TouchableOpacity>
          </Item>
        </Form>
        <Content style={styles.boxButton}>
          <TouchableOpacity
            disabled={
              !email || !password
                ? true
                : (password && password.length < 8) ||
                  (email && !emailRules.test(email))
                ? true
                : false
            }
            style={
              !email || !password
                ? styles.button2
                : (password && password.length < 8) ||
                  (email && !emailRules.test(email))
                ? styles.button2
                : {...styles.button2, ...styles.button2Confirmed}
            }
            onPress={() => setIsLoggedIn(true)}>
            <Text
              style={
                !email || !password
                  ? styles.semiBold
                  : (password && password.length < 8) ||
                    (email && !emailRules.test(email))
                  ? styles.semiBold
                  : {...styles.semiBold, ...styles.textWhite}
              }>
              Login
            </Text>
          </TouchableOpacity>
        </Content>
      </View>
      <Footer style={styles.footer}>
        <Text style={{...styles.greyLink}}>Don’t have an account? Let’s </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </Footer>
    </View>
  );
}
export default Login;
