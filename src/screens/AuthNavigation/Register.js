import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Form, Item, Input, Icon, Footer, Content} from 'native-base';
import styles from './style';
function Register(props) {
  const {navigation} = props;
  const [eyeVisible, setEyeVisible] = useState(false);
  return (
    <View style={styles.authContainer}>
      <View style={styles.authHeader}>
        <Text style={styles.textHeader}>Zwallet</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={{...styles.textHeader, ...styles.textBlack}}>
          Register
        </Text>
        <Text style={styles.subTextHeader}>
          Create your account to access Zwallet.
        </Text>
        <Form>
          <Item>
            <Icon type="MaterialIcons" name="person-outline" />
            <Input placeholder="Enter your username" />
          </Item>
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
        </Form>
        <Content style={styles.boxButton}>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.semiBold}>Sign Up</Text>
          </TouchableOpacity>
        </Content>
      </View>
      <Footer style={styles.footer}>
        <Text style={{...styles.greyLink}}>
          Already have an account? Let’s{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </Footer>
    </View>
  );
}
export default Register;
