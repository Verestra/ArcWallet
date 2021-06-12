import React, { useState } from 'react';
import styles from './style';
import { KeyboardAvoidingView, StatusBar, TouchableOpacity } from 'react-native';
import { API_URL } from '@env';
import Axios from 'axios';

import { Form, Item, Input, Footer, Button, View, Container, CardItem, Content, Left, Body, Icon, Text } from 'native-base';

function ChangePassword({ navigation }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [eyeVisible, setEyeVisible] = useState(false);
    return (
        <Container>
            <StatusBar
                animated={true}
                backgroundColor="#FFFFFF" />
            <CardItem style={styles.headerCard}>
                <Left>
                    <Icon onPress={() => navigation.goBack()} type="MaterialCommunityIcons" name="arrow-left" style={{ color: '#4D4B57' }} />
                    <Text style={styles.text1}>Change Password</Text>
                </Left>
            </CardItem>
            <Content>
                <KeyboardAvoidingView>
                    <View style={{ padding: 20 }}>
                        <Text style={{ ...styles.text3, textAlign: 'center', marginTop: 30, marginBottom: 30 }} >
                            You must enter your current password and then type your new password twice.
                        </Text>
                        <Form>
                        <Item
                            style={
                            !currentPassword
                            ? { borderBottomWidth: 2 }
                            : currentPassword && currentPassword.length < 8
                            ? { borderBottomWidth: 2, borderBottomColor: 'red' }
                            : { borderBottomWidth: 2, borderBottomColor: '#6379F4' }
                            }>
                            <Icon
                                type="MaterialIcons"
                                name="lock-outline"
                                style={
                                !currentPassword
                                ? null
                                : currentPassword && currentPassword.length < 8
                                ? { color: 'red' }
                                : { color: '#6379F4' }
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
                            <Item
                            style={
                            !password
                            ? { borderBottomWidth: 2 }
                            : password && password.length < 8
                            ? { borderBottomWidth: 2, borderBottomColor: 'red' }
                            : { borderBottomWidth: 2, borderBottomColor: '#6379F4' }
                            }>
                            <Icon
                                type="MaterialIcons"
                                name="lock-outline"
                                style={
                                !password
                                ? null
                                : password && password.length < 8
                                ? { color: 'red' }
                                : { color: '#6379F4' }
                                }
                            />
                            <Input
                                placeholder="New Password"
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
                                    ? { borderBottomWidth: 2 }
                                    : password.length < 1 ||
                                    (confirmPassword && confirmPassword !== password)
                                    ? { borderBottomWidth: 2, borderBottomColor: 'red' }
                                    : { borderBottomWidth: 2, borderBottomColor: '#6379F4' }
                                }>
                                <Icon
                                    type="MaterialIcons"
                                    name="lock-outline"
                                    style={
                                        !confirmPassword
                                            ? null
                                            : password.length < 1 ||
                                                (confirmPassword && confirmPassword !== password)
                                                ? { color: 'red' }
                                                : { color: '#6379F4' }
                                    }
                                />
                                <Input
                                    placeholder="Repeat password"
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
                            <View style={styles.boxButton}>
                                <TouchableOpacity
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
                                                : { ...styles.button2, ...styles.button2Confirmed }
                                    }>
                                    <Text
                                        style={
                                            !confirmPassword || !password
                                                ? styles.semiBold
                                                : (password && password.length < 8) ||
                                                    (confirmPassword && confirmPassword !== password)
                                                    ? styles.semiBold
                                                    : { ...styles.semiBold, ...styles.textWhite }
                                        }>
                                        Change Password
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Form>
                    </View>
                </KeyboardAvoidingView>
            </Content>
        </Container>
    )
}
export default ChangePassword