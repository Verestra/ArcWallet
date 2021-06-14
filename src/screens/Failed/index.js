import React, { useState } from 'react';
import styles from '../Transfer/style.js';
import { API_URL } from '@env';
import { KeyboardAvoidingView, StatusBar, Image } from 'react-native';
import { Button, List, ListItem, View, Container, CardItem, Thumbnail, Content, Left, Body, Icon, Text } from 'native-base';

function Failed({ navigation, route }) {
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
            <Content>
                <KeyboardAvoidingView>
                    <View style={{ padding: 20 }}>
                        <View style={{ alignItems: 'center', marginVertical: 30, }}>
                            <Image source={require('../../assets/img/failed.png')} />
                            <Text style={{ ...styles.text1, marginVertical: 30 }}>Transfer Failed</Text>
                        </View>
                        <Text style={{ ...styles.text1, marginBottom: 30 }}> Details </Text>
                        {details.map((item, i) =>
                            <ListItem key={i} elevation={5} style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 5, marginLeft: -5, marginBottom: 20 }} thumbnail>
                                <Body>
                                    <Text style={{ ...styles.text3, marginBottom: 15 }}>{item.title}</Text>
                                    <Text style={styles.text1}>{item.body}</Text>
                                </Body>
                            </ListItem>
                        )}
                    </View>
                    <List style={{ marginBottom: 10, padding: 20 }}>
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
                        <Button
                            onPress={() => navigation.replace('Home')}
                            style={{ borderRadius: 12, height: 57, backgroundColor: '#6379F4', marginTop: 50, marginBottom: 30 }} block>
                            <Text style={{ fontFamily: 'NunitoSans-Bold', color: '#F9F9F9' }}> Try Again  </Text>
                        </Button>
                    </List>
                </KeyboardAvoidingView>
            </Content>
        </Container>
    );
}

export default Failed;
