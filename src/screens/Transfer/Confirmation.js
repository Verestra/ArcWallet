import React, { useState } from 'react';
import styles from './style';
import { API_URL } from '@env';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import { Button, List, ListItem, View, Container, CardItem, Thumbnail, Content, Left, Body, Icon, Text } from 'native-base';

function Confirmation({ navigation, route }) {
    const { receiver, name, pict, phone, amount, balance, date, note, time } = route.params;
    console.log(receiver, name, pict, phone, amount, balance, note, date, time)
    const details = [
        {
            id: 1,
            title: 'Amount',
            body: `Rp${amount}`,
        },
        {
            id: 2,
            title: 'Balance Left',
            body: `Rp${balance - amount}`,
        },
        {
            id: 3,
            title: 'Date & Time',
            body: `${date}, ${time}`,
        },
        {
            id: 4,
            title: 'Notes',
            body: note,
        }]
    return (
        <Container>
            <StatusBar
                animated={true}
                backgroundColor="#FFFFFF" />
            <CardItem style={styles.headerCard}>
                <Left>
                    <Icon onPress={() => navigation.goBack()} type="MaterialCommunityIcons" name="arrow-left" style={{ color: '#4D4B57' }} />
                    <Text style={styles.text1}>Confirmation</Text>
                </Left>
            </CardItem>
            <Content>
                <KeyboardAvoidingView>
                    <List style={{ marginBottom: 10, marginTop: 20, padding: 20 }}>
                        <Text style={{ ...styles.text1, marginBottom: 30 }}>Transfer To</Text>
                        <ListItem elevation={5} style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10, marginLeft: -5 }} thumbnail>
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
                        <Text style={{ ...styles.text1, marginBottom: 30 }}> Details </Text>
                        {details.map((item, i) =>
                            <ListItem key={i} elevation={5} style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 5, marginLeft: -5, marginBottom: 20 }} thumbnail>
                                <Body>
                                    <Text style={{ ...styles.text3, marginBottom: 15 }}>{item.title}</Text>
                                    <Text style={styles.text1}>{item.body}</Text>
                                </Body>
                            </ListItem>
                        )}
                        <Button
                            onPress={() => {
                                /* 1. Navigate to the Success route with state passed */
                                navigation.navigate('PinConfirmation', {
                                    receiver: receiver,
                                    name: name,
                                    pict: pict,
                                    phone: phone,
                                    amount: amount,
                                    balance: balance,
                                    note: note,
                                    date: date,
                                    time: time
                                });
                            }}
                            style={{ borderRadius: 12, height: 57, backgroundColor: '#6379F4' }} block>
                            <Text style={{ fontFamily: 'NunitoSans-Bold' }}> Continue  </Text>
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </Content>
        </Container>
    )
}
export default Confirmation