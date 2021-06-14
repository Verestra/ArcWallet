import React, { useState, useEffect } from 'react';
import styles from './style';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import OtpInput from '../../components/OTP/OtpInput.js';
import { API_URL } from '@env';
import axios from 'axios';

import { Button, View, Container, CardItem, Content, Left, Body, Icon, Text } from 'native-base';

function PinConfirmation(props) {
    const route = useRoute();
    const navigation = useNavigation();
    const token = props.token
    const { receiver, name, pict, phone, amount, balance, date, note, time } = route.params;
    const [pin, setPin] = useState('');
    console.log(receiver, name, pict, phone, amount, balance, note, date, time, pin)


    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    const createTransaction = (body) => {
        return axios.post(`${API_URL}/v1/transactions`, body, {
            headers: headers
        });
    };

    const createTransactionHandler = () => {
        const body = {
            "receiver": receiver,
            "type_id": 1,
            "amount": parseInt(amount),
            "notes": note,
            "pin": pin
        }
        console.log(body)
        createTransaction(body)
            .then(res => {
                navigation.replace('Success', {
                    receiver: receiver,
                    name: name,
                    pict: pict,
                    phone: phone,
                    amount: amount,
                    balance: balance,
                    pin: pin,
                    note: note,
                    date: date,
                    time: time
                });
                console.log(res)
            })
            .catch(err => {
                console.log(body)
                console.log(err.message)
                navigation.replace('Failed', {
                    receiver: receiver,
                    name: name,
                    pict: pict,
                    phone: phone,
                    amount: amount,
                    balance: balance,
                    pin: pin,
                    note: note,
                    date: date,
                    time: time,
                    error: err.message
                });
            });
    }

    return (
        <Container>
            <StatusBar
                animated={true}
                backgroundColor="#FFFFFF" />
            <CardItem style={styles.headerCard}>
                <Left>
                    <Icon onPress={() => navigation.goBack()} type="MaterialCommunityIcons" name="arrow-left" style={{ color: '#4D4B57' }} />
                    <Text style={styles.text1}>Enter Your Pin</Text>
                </Left>
            </CardItem>
            <Content>
                <KeyboardAvoidingView>
                    <View style={{ padding: 20 }}>
                        <Text style={{ ...styles.text1, textAlign: 'center' }}>Enter PIN to Transfer</Text>
                        <Text style={{ ...styles.text3, textAlign: 'center', marginTop: 30, marginBottom: 30 }} >Enter your 6 digits PIN for confirmation to continue transferring money. </Text>
                        <OtpInput changeHandler={text => setPin(text)} resetInp={true} />
                        {!pin ? (
                            <Text style={{ textAlign: 'center', color: 'red', fontSize: 14 , marginVertical: 30}}>
                                Please Fill The Pin
                            </Text>
                        ) : null}
                        {pin && pin.length < 6 ? (
                            <Text style={{ textAlign: 'center', color: 'red', fontSize: 14 , marginVertical: 30}}>
                                Pin Length is not enough
                            </Text>
                        ) : null}
                        <Button
                            onPress={createTransactionHandler}
                            disabled={!pin ? true : pin && pin.length < 6 ? true : false}
                            style={
                                !pin
                                    ? styles.button2
                                    : pin && pin.length < 6
                                        ? styles.button2
                                        : { ...styles.button2, ...styles.button2Confirmed }
                            }>
                            <Text style={{ fontFamily: 'NunitoSans-Bold' }}> Transfer Now  </Text>
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </Content>
        </Container>
    )
}
const mapStateToProps = state => {
    return { token: state.auth.results?.token };
};
const ConnectedPinConfirmation = connect(mapStateToProps)(PinConfirmation);
export default ConnectedPinConfirmation