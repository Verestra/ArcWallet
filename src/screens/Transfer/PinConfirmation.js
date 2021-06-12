import React, {useState} from 'react';
import styles from './style';
import{ KeyboardAvoidingView,StatusBar } from 'react-native';
import OtpInput from '../../components/OTP/OtpInput.js';
import {API_URL} from '@env';
import Axios from 'axios';

import { Button, View, Container, CardItem, Content, Left, Body, Icon, Text } from 'native-base';

function PinConfirmation({navigation, route}) {
    const { receiver,name, pict, phone, amount, date, note, time} = route.params;
    const [pin, setPin] = useState('');
    console.log(receiver,name, pict, phone, amount, note,  date, time,pin)

    return (
        <Container>
            <StatusBar
            animated={true}
            backgroundColor="#FFFFFF"/>
            <CardItem style={styles.headerCard}>
              <Left>
                <Icon onPress={() => navigation.goBack() } type="MaterialCommunityIcons" name="arrow-left" style={{color: '#4D4B57'}} />
                <Text style={styles.text1}>Enter Your Pin</Text>
              </Left>
            </CardItem>
        <Content>
            <KeyboardAvoidingView>
                <View style={{padding: 20}}>
                    <Text style={{...styles.text1, textAlign:'center' }}>Enter PIN to Transfer</Text>
                    <Text style={{...styles.text3, textAlign:'center', marginTop: 30, marginBottom: 30}} >Enter your 6 digits PIN for confirmation to continue transferring money. </Text>
                    <OtpInput changeHandler={text => setPin(text)} resetInp={true} />
                    <Button 
                        onPress={() => {
                            /* 1. Navigate to the Success route with state passed */
                            navigation.navigate('Success', {
                            receiver: receiver,
                            name: name,
                            pict: pict,
                            phone: phone,
                            amount: amount,
                            pin: pin,
                            note: note,
                            date: date,
                            time: time
                            });
                        }}
                        disabled={!pin ? true : pin && pin.length < 6 ? true : false}
                        style={
                            !pin
                            ? styles.button2
                            : pin && pin.length < 6
                            ? styles.button2
                            : {...styles.button2, ...styles.button2Confirmed}
                        }>
                        <Text style={{fontFamily: 'NunitoSans-Bold'}}> Transfer Now  </Text>
                        </Button>
                </View>
            </KeyboardAvoidingView>
        </Content>
      </Container>
    )
}
export default PinConfirmation