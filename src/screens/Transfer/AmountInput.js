import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import styles from './style';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { Button, Item, Input, List, ListItem, View, Container, CardItem, Thumbnail, Content, Left, Body, Icon, Text } from 'native-base';

function AmountInput(props) {
    const [isFocused, setIsFocused] = useState(false);
    const [amount, setAmount] = useState(null);
    const [profile, setProfile] = useState([]);
    const [notes, setNotes] = useState('');
    const route = useRoute();

    const token = props.token
    const navigation = useNavigation();

    const { receiver, pict, name, phone } = route.params;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`${API_URL}/v1/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(res => setProfile(res.data.data))
                .catch(err => console.log(err));
        });
        return unsubscribe;
    }, [navigation]);

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const nowDateSub = new Date();
    const dd = String(nowDateSub.getDate()).padStart(2, '0');
    const mm = monthNames[nowDateSub.getMonth()]; //January is 0!
    const yyyy = nowDateSub.getFullYear();
    const today = `${mm} ${dd}, ${yyyy}`;
    const dateObj = new Date();
    let hr = dateObj.getHours();
    let min = dateObj.getMinutes();
    if (min < 10) {
        min = '0' + min;
    }
    if (hr < 10) {
        hr = '0' + hr;
    }
    const time = hr + ':' + min;
    console.log(today)
    console.log(time)
    return (
        <Container>
            <StatusBar
                animated={true}
                backgroundColor="#FFFFFF" />
            <CardItem style={styles.headerCard}>
                <Left>
                    <Icon onPress={() => navigation.goBack()} type="MaterialCommunityIcons" name="arrow-left" style={{ color: '#4D4B57' }} />
                    <Text onPress={() => console.log(route.params)} style={styles.text1}>Transfer</Text>
                </Left>
            </CardItem>
            <Content>
                <KeyboardAvoidingView>
                    <List style={{ marginBottom: 10, marginTop: 20 }}>
                        <ListItem elevation={5} style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10, margin: 30 }} thumbnail>
                            <Left>
                                {pict !== null ? (
                                    <Thumbnail square source={{
                                        uri:
                                            `${API_URL}/images/${pict}`,
                                    }} />
                                ) : (
                                    <Thumbnail square source={require('../../assets/img/blank-profile.png')} />
                                )}
                            </Left>
                            <Body>
                                <Text style={styles.text2}>{name}</Text>
                                <Text style={styles.text3}>{phone}</Text>
                            </Body>
                        </ListItem>
                    </List>
                    <View style={{ padding: 20 }}>
                        <Text style={{ ...styles.text2, textAlign: 'center' }}>
                            Rp {props.balance} Available
                        </Text>
                        <Item style={{ marginTop: 20, borderColor: 'transparent' }}>
                            <TextInputMask
                                textAlign="center"
                                placeholder="0.00"
                                numeric
                                keyboardType="numeric"
                                style={{ ...styles.text2, color: '#6379F4', width: '100%', fontSize: 42, height: 100 }}
                                placeholderTextColor="#B5BDCC"
                                onChangeText={(formatted, extracted) => {
                                    // console.log(formatted) // +1 (123) 456-78-90
                                    setAmount(extracted)
                                }}
                                mask={"Rp[00000000]"}
                            />
                        </Item>
                        <Item style={{ marginTop: 50, marginBottom: 50, borderColor: 'transparent' }}>
                            <Icon type="MaterialCommunityIcons" name="pencil-outline" style={{ color: '#A9A9A9' }} />
                            <Input
                                {...props}
                                onBlur={() => setIsFocused(false)}
                                onFocus={() => setIsFocused(true)}
                                placeholder="Add some notes"
                                onChangeText={(text) => setNotes(text)}
                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: 16, color: '#3A3D42', fontFamily: 'NunitoSans-SemiBold' }}
                                placeholderTextColor="#B5BDCC"
                            />
                        </Item>
                        {!amount || !notes ? (
                            <Text style={{ textAlign: 'center', color: 'red', fontSize: 14 }}>
                                Amount or Notes cannot be empty
                            </Text>
                        ) : null}
                        {amount > props.balance ? (
                            <Text style={{ textAlign: 'center', color: 'red', fontSize: 14 }}>
                                Your Balance is not Sufficient
                            </Text>
                        ) : null}
                        {amount < 10000 ? (
                            <Text style={{ textAlign: 'center', color: 'red', fontSize: 14 }}>
                                Minimum Balance for Transfer is 10000
                            </Text>
                        ) : null}
                    </View>
                    <View style={{paddingHorizontal: 20}}>
                        <Button
                            disabled={
                                !amount || !notes
                                    ? true
                                    : amount > props.balance
                                        ? true
                                        : amount < 10000
                                            ? true
                                            : false
                            }
                            onPress={() => {
                                /* 1. Navigate to the Confirmation route with state passed */
                                navigation.navigate('Confirmation', {
                                    receiver: receiver,
                                    name: name,
                                    pict: pict,
                                    phone: phone,
                                    amount: amount,
                                    balance: props.balance,
                                    note: notes,
                                    date: today,
                                    time: time
                                });
                            }}
                            style={
                                !amount || !notes
                                    ? styles.button2
                                    : amount > props.balance
                                        ? styles.button2
                                        : amount < 10000
                                            ? styles.button2
                                            : { ...styles.button2, ...styles.button2Confirmed }
                            }
                            block>
                            <Text style={{ fontFamily: 'NunitoSans-Bold' }}> Transfer  </Text>
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </Content>
        </Container>
    )
}
const mapStateToProps = state => {
    return { 
        token: state.auth.results?.token,
        balance: state.balance.balance, };
};
const mapStateToDispatch = dispatch => {
    return {
        onSetBalance: value => dispatch(setBalance(value)),
    };
};
const ConnectedAmountInput = connect(mapStateToProps, mapStateToDispatch)(AmountInput);;
export default ConnectedAmountInput
