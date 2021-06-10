import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Form, Item, Input, Icon, Footer, Content} from 'native-base';
import styles from './style';
function Login(props) {
  const {navigation, setLoggedIn} = props;
  const [eyeVisible, setEyeVisible] = useState(false);
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
          <Item>
            <Icon type="MaterialIcons" name="mail-outline" />
            <Input placeholder="Enter your e-mail" />
          </Item>
          <Item>
            <Icon type="MaterialIcons" name="lock-outline" />
            <Input
              placeholder="Enter your password"
              secureTextEntry={eyeVisible ? false : true}
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
            style={styles.button2}
            onPress={() => setLoggedIn(true)}>
            <Text style={styles.semiBold}>Login</Text>
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
