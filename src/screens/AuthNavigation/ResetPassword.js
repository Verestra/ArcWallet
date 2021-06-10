import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Form, Item, Input, Icon, Footer, Content} from 'native-base';
import styles from './style';
function ResetPassword() {
  const [eyeVisible, setEyeVisible] = useState(false);
  return (
    <View style={styles.authContainer}>
      <View style={styles.authHeader}>
        <Text style={styles.textHeader}>Zwallet</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={{...styles.textHeader, ...styles.textBlack}}>
          Reset Password
        </Text>
        <Text style={styles.subTextHeader}>
          Create and confirm your new password so you can login to Zwallet.
        </Text>
        <Form>
          <Item>
            <Icon type="MaterialIcons" name="lock-outline" />
            <Input
              placeholder="Create new password"
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
          <Item>
            <Icon type="MaterialIcons" name="lock-outline" />
            <Input
              placeholder="Confirm new password"
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
          <TouchableOpacity
            style={{...styles.button2, ...styles.button2Confirmed}}>
            <Text style={{...styles.semiBold, ...styles.textWhite}}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </Content>
      </View>
    </View>
  );
}
export default ResetPassword;
