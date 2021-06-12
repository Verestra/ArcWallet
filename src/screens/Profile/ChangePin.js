import React, {useState} from 'react';
import styles from './style';
import{ KeyboardAvoidingView,StatusBar } from 'react-native';
import OtpInput from '../../components/OTP/OtpInput.js';
import {API_URL} from '@env';
import Axios from 'axios';

import { Button, View, Container, CardItem, Content, Left, Body, Icon, Text } from 'native-base';

function ChangePin({navigation}) {
    const [pin, setPin] = useState('');
    return (
        <Container>
            <StatusBar
            animated={true}
            backgroundColor="#FFFFFF"/>
            <CardItem style={styles.headerCard}>
              <Left>
                <Icon onPress={() => navigation.goBack() } type="MaterialCommunityIcons" name="arrow-left" style={{color: '#4D4B57'}} />
                <Text style={styles.text1}>Change Pin</Text>
              </Left>
            </CardItem>
        <Content>
            <KeyboardAvoidingView>
                <View style={{padding: 20}}>
                    <Text style={{...styles.text3, textAlign:'center', marginTop: 30, marginBottom: 30}} >
                    Enter your current 6 digits ArcWallet PIN below to continue to the next steps.
                    </Text>
                    <OtpInput changeHandler={text => setPin(text)} resetInp={true} />
                    <Button 
                        disabled={!pin ? true : pin && pin.length < 6 ? true : false}
                        style={
                            !pin
                            ? styles.button2
                            : pin && pin.length < 6
                            ? styles.button2
                            : {...styles.button2, ...styles.button2Confirmed}
                        }>
                        <Text style={{fontFamily: 'NunitoSans-Bold'}}> Continue  </Text>
                        </Button>
                </View>
            </KeyboardAvoidingView>
        </Content>
      </Container>
    )
}
export default ChangePin