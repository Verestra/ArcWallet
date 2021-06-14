import React, {useState} from 'react';
import styles from './style';
import {
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {API_URL} from '@env';
import Axios from 'axios';

import {
  Form,
  Item,
  Input,
  Footer,
  Button,
  View,
  Container,
  CardItem,
  Content,
  Left,
  Body,
  Icon,
  Text,
} from 'native-base';
import {connect} from 'react-redux';

function ChangePassword(props) {
  const {navigation} = props;
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [eyeVisible, setEyeVisible] = useState(false);
  const [eyeVisible1, setEyeVisible1] = useState(false);
  const [eyeVisible2, setEyeVisible2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = () => {
    Axios.patch(
      `${API_URL}/v1/users`,
      {old_password: currentPassword, new_password: confirmPassword},
      {
        headers: {
          Authorization: `Bearer ${props.auth.token}`,
        },
      },
    )
      .then(res => {
        setSuccess(true);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <Container>
      <StatusBar animated={true} backgroundColor="#FFFFFF" />
      <CardItem style={styles.headerCard}>
        <Left>
          <Icon
            onPress={() => navigation.goBack()}
            type="MaterialCommunityIcons"
            name="arrow-left"
            style={{color: '#4D4B57'}}
          />
          <Text style={styles.text1}>Change Password</Text>
        </Left>
      </CardItem>
      <Content>
        <KeyboardAvoidingView>
          <View style={{padding: 20}}>
            <Text
              style={{
                ...styles.text3,
                textAlign: 'center',
                marginTop: 30,
                marginBottom: 30,
              }}>
              {success
                ? 'Password Changed'
                : 'You must enter your current password and then type your new password twice.'}
            </Text>

            <Form>
              {success ? (
                <Icon
                  name="checkmark-circle"
                  style={{
                    fontSize: 100,
                    color: '#1EC15F',
                    marginTop: 40,
                    alignSelf: 'center',
                  }}
                />
              ) : (
                <>
                  <Item
                    style={
                      !currentPassword
                        ? {borderBottomWidth: 2}
                        : currentPassword && currentPassword.length < 8
                        ? {borderBottomWidth: 2, borderBottomColor: 'red'}
                        : {borderBottomWidth: 2, borderBottomColor: '#6379F4'}
                    }>
                    <Icon
                      type="MaterialIcons"
                      name="lock-outline"
                      style={
                        !currentPassword
                          ? null
                          : currentPassword && currentPassword.length < 8
                          ? {color: 'red'}
                          : {color: '#6379F4'}
                      }
                    />
                    <Input
                      placeholder="Current Password"
                      secureTextEntry={eyeVisible ? false : true}
                      value={currentPassword}
                      onChangeText={text => setCurrentPassword(text)}
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
                    {currentPassword && currentPassword.length < 8 ? (
                      <Text style={{color: 'red', fontSize: 14}}>
                        character min length is 8
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
                      placeholder="New Password"
                      secureTextEntry={eyeVisible1 ? false : true}
                      value={password}
                      onChangeText={text => setPassword(text)}
                    />
                    <Icon
                      style={styles.eyeIcon}
                      type="FontAwesome"
                      name={eyeVisible1 ? 'eye' : 'eye-slash'}
                      onPress={() => {
                        eyeVisible1
                          ? setEyeVisible1(false)
                          : setEyeVisible1(true);
                      }}
                    />
                  </Item>
                  <View style={{height: 20, paddingLeft: 18}}>
                    {password && password.length < 8 ? (
                      <Text style={{color: 'red', fontSize: 14}}>
                        character min length is 8
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
                          ? null
                          : password.length < 1 ||
                            (confirmPassword && confirmPassword !== password)
                          ? {color: 'red'}
                          : {color: '#6379F4'}
                      }
                    />
                    <Input
                      placeholder="Repeat password"
                      secureTextEntry={eyeVisible2 ? false : true}
                      value={confirmPassword}
                      onChangeText={text => setConfirmPassword(text)}
                    />
                    <Icon
                      style={styles.eyeIcon}
                      type="FontAwesome"
                      name={eyeVisible2 ? 'eye' : 'eye-slash'}
                      onPress={() => {
                        eyeVisible2
                          ? setEyeVisible2(false)
                          : setEyeVisible2(true);
                      }}
                    />
                  </Item>
                </>
              )}
              {success ? null : (
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
              )}

              <View style={styles.boxButton}>
                {success ? (
                  <Content style={styles.boxButton}>
                    <TouchableOpacity
                      style={{...styles.button2, ...styles.button2Confirmed}}
                      onPress={e => navigation.navigate('Profile')}>
                      {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={{...styles.semiBold, ...styles.textWhite}}>
                          Back to profile
                        </Text>
                      )}
                    </TouchableOpacity>
                  </Content>
                ) : (
                  <TouchableOpacity
                    disabled={
                      !confirmPassword || !password
                        ? true
                        : (password && password.length < 8) ||
                          (confirmPassword && confirmPassword !== password)
                        ? true
                        : false
                    }
                    onPress={e => {
                      handleSubmit(e);
                    }}
                    style={
                      !confirmPassword || !password
                        ? styles.button2
                        : (password && password.length < 8) ||
                          (confirmPassword && confirmPassword !== password)
                        ? styles.button2
                        : {...styles.button2, ...styles.button2Confirmed}
                    }>
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text
                        style={
                          !confirmPassword || !password
                            ? styles.semiBold
                            : (password && password.length < 8) ||
                              (confirmPassword && confirmPassword !== password)
                            ? styles.semiBold
                            : {...styles.semiBold, ...styles.textWhite}
                        }>
                        Change Password
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </Form>
          </View>
        </KeyboardAvoidingView>
      </Content>
    </Container>
  );
}
const mapStateToProps = state => ({
  auth: state.auth.results,
  user: state.user.results,
});
export default connect(mapStateToProps)(ChangePassword);
