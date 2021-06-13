import React, {useState, useEffect} from 'react';
import styles from './style';
import {KeyboardAvoidingView, StatusBar, ActivityIndicator} from 'react-native';
import OtpInput from '../../components/OTP/OtpInput.js';
import {API_URL} from '@env';
import Axios from 'axios';

import {
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

function ChangePin(props) {
  const {navigation} = props;
  const [pin, setPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFulfilled, setIsFulfilled] = useState(false);
  useEffect(() => {
    if (isFulfilled) {
      setStep(step + 1);
      setIsFulfilled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFulfilled]);
  const handleSubmit = event => {
    setIsLoading(true);
    if (step === 0) {
      setIsLoading(false);
      setStep(1);
    } else if (step === 1) {
      const postData = {old_pin: pin, new_pin: newPin};
      console.log(postData);
      Axios.patch(`${API_URL}/v1/users`, postData, {
        headers: {
          Authorization: `Bearer ${props.auth.token}`,
        },
      })
        .then(res => {
          console.log(res);
          setIsFulfilled(true);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    } else if (step === 2) {
      setIsLoading(false);
      navigation.navigate('profile');
    }
    event.preventDefault();
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
          <Text style={styles.text1}>Change Pin</Text>
        </Left>
      </CardItem>
      <Content>
        <KeyboardAvoidingView>
          <View style={{padding: 20}}>
            {step === 2 ? (
              <Text style={{...styles.textHeader, ...styles.textBlack}}>
                PIN Successfully Changed
              </Text>
            ) : null}
            <Text
              style={{
                ...styles.text3,
                textAlign: 'center',
                marginTop: 30,
                marginBottom: 30,
              }}>
              {step === 0
                ? 'Enter your current 6 digits ArcWallet PIN below to continue to the next steps.'
                : step === 1
                ? 'Type your new 6 digits security PIN to use in Zwallet.'
                : null}
            </Text>
            {step === 0 ? (
              <OtpInput changeHandler={text => setPin(text)} />
            ) : step === 1 ? (
              <OtpInput
                changeHandler={text => setNewPin(text)}
                resetInp={true}
              />
            ) : (
              <Icon
                name="checkmark-circle"
                style={{
                  fontSize: 100,
                  color: '#1EC15F',
                  marginTop: 40,
                  alignSelf: 'center',
                }}
              />
            )}
            <Button
              onPress={e => handleSubmit(e)}
              disabled={!pin ? true : pin && pin.length < 6 ? true : false}
              style={
                !pin
                  ? styles.button2
                  : pin && pin.length < 6
                  ? styles.button2
                  : {...styles.button2, ...styles.button2Confirmed}
              }>
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={{fontFamily: 'NunitoSans-Bold'}}>
                  {' '}
                  {step === 0
                    ? 'Continue'
                    : step === 1
                    ? 'Change Pin'
                    : 'Back to profile'}{' '}
                </Text>
              )}
            </Button>
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
export default connect(mapStateToProps)(ChangePin);
