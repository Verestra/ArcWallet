import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Form, Item, Button, Input, Icon, Footer, Content} from 'native-base';
import styles from './style';
import {connect} from 'react-redux';
import {postLogin} from './../../redux/actions/auth';
import {API_URL} from '@env';
function Login(props) {
  const {setIsLoggedIn, auth} = props;
  const navigation = useNavigation();
  const [eyeVisible, setEyeVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRules =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/;
  const handleSubmit = event => {
    const postData = {email, password};
    props.postLogin(`${API_URL}/v1/auth/login`, postData);
    event.preventDefault();
  };
  return (
    <View style={styles.authContainer}>
      <View style={styles.authHeader}>
        <Text style={styles.textHeader}>ArcWallet</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={{...styles.textHeader, ...styles.textBlack}}>Login</Text>
        <Text
          style={{
            ...styles.text3,
            textAlign: 'center',
            paddingHorizontal: 30,
            marginBottom: 35,
          }}>
          Login to your existing account to access all the features in
          ArcWallet.
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
          <View style={{height: 20, paddingLeft: 18}}>
            {email && !emailRules.test(email) ? (
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
                  ? {color: '#A9A9A9'}
                  : password && password.length < 8
                  ? {color: 'red'}
                  : {color: '#6379F4'}
              }
            />
            <Input
              placeholder="Enter your password"
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
          <Item style={styles.rightSide}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPassword')}>
              <Text style={{...styles.text3}}>Forgot Password?</Text>
            </TouchableOpacity>
          </Item>
        </Form>

        <View style={{marginTop: 30}}>
          {auth.isRejected && auth.err ? (
            <Text style={{alignSelf: 'center', color: 'red', fontSize: 16}}>
              {auth.isRejected && auth.err ? 'Wrong email or password' : null}
            </Text>
          ) : null}
        </View>

        <Button
          block
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
              ? {...styles.button2, marginTop: 20}
              : (password && password.length < 8) ||
                (email && !emailRules.test(email))
              ? {...styles.button2, marginTop: 20}
              : {...styles.button2, ...styles.button2Confirmed, marginTop: 20}
          }
          onPress={e => handleSubmit(e)}>
          {auth.isPending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text
              style={
                !email || !password
                  ? {...styles.text2, textAlign: 'center', color: '#A9A9A9'}
                  : (password && password.length < 8) ||
                    (email && !emailRules.test(email))
                  ? {...styles.text2, textAlign: 'center', color: '#A9A9A9'}
                  : {...styles.text1, ...styles.textWhite}
              }>
              Login
            </Text>
          )}
        </Button>
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
const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
  postLogin: (url, data) => {
    dispatch(postLogin(url, data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
