import React, { useState, useEffect } from 'react';
import styles from './style';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '@env'
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { Input, Item, List, ListItem, View, Container, CardItem, Thumbnail, Content, Left, Body, Icon, Text } from 'native-base';

function SearchReceiver(props) {
    const [search, setSearch] = useState('')
    const [contacts, setContacts] = useState([])
    const [info, setInfo] = useState()
    const token = props.token
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`${API_URL}/v1/transactions/receiver?limit=10&page=1&search=`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(res => {
                    setContacts(res.data.data)
                    setInfo(res.data.info.total)
                })
                .catch(err => console.log(err));

        });
        return unsubscribe;
    }, [navigation]);

    // const contacts = [
    //     {
    //         id: 1,
    //         pict: require('../../assets/img/pic-samuel.png'),
    //         name: 'Samuel Suhi',
    //         phone: '+62 813-8492-9994',
    //     }, 
    //     {
    //         id: 2,
    //         pict: require('../../assets/img/pic-julia.png'),
    //         name: 'Julia Syen',
    //         phone: '+62 812-3942-3656',
    //     }, 
    //     {
    //         id: 3,
    //         pict: require('../../assets/img/pic-bobi.png'),
    //         name: 'Bobi Sammy',
    //         phone: '+62 813-5982-2940',
    //     }, 
    //     {
    //         id: 4,
    //         pict: require('../../assets/img/pic-juliana.png'),
    //         name: 'Juliana Rich',
    //         phone: '+62 811-6212-5663',
    //     }]
    return (
        <Container>
            <StatusBar
                animated={true}
                backgroundColor="#FFFFFF" />
            <CardItem style={styles.headerCard}>
                <Left>
                    <Icon onPress={() => navigation.goBack()} type="MaterialCommunityIcons" name="arrow-left" style={{ color: '#4D4B57' }} />
                    <Text style={styles.text1}>Find Receiver</Text>
                </Left>
            </CardItem>
            <View style={{ padding: 10 }}>
                <Item style={{ backgroundColor: 'rgba(58, 61, 66, 0.1)', height: 54, borderRadius: 12, padding: 10, marginBottom: 20 }}>
                    <Icon name="ios-search" style={{ color: '#A9A9A9' }} />
                    <Input
                        style={{ color: '#4D4B57', fontFamily: 'NunitoSans-Regular' }} placeholderTextColor="rgba(58, 61, 66, 0.4)"
                        placeholder="Search receiver here"
                        value={search}
                        onChangeText={text => setSearch(text)}
                    />
                    <Icon
                        type="MaterialCommunityIcons"
                        name="close-circle"
                        style={{ color: '#A9A9A9' }}
                        onPress={() => setSearch('')}
                    />
                </Item>
            </View>
            <Content>
                <View style={{ padding: 15 }}>
                    <View style={styles.containerContact}>
                        <Text style={styles.text1}>
                            All Contacts
                        </Text>
                        <Text style={styles.text3}>
                            {info} Contacts Found
                        </Text>
                        {contacts?.map((item, i) => (
                            <List key={i} style={{ marginLeft: -25, marginBottom: 20, marginTop: 20 }}>
                                <TouchableWithoutFeedback
                                    key={item.id}
                                    onPress={() => {
                                        /* 1. Navigate to the Amount Input route with state passed */
                                        navigation.navigate('AmountInput', {
                                            receiver: item.id_receiver,
                                            name: item.username,
                                            pict: item.avatar,
                                            phone: item.phone_number
                                        });
                                    }}>
                                    <ListItem elevation={3} style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10 }} thumbnail>
                                        <Left>
                                            {item.avatar !== null ? (
                                                <Thumbnail square source={{
                                                    uri:
                                                        `${API_URL}/images/${item.avatar}`,
                                                }} />
                                            ) : (
                                                <Thumbnail square source={require('../../assets/img/blank-profile.png')} />
                                            )}
                                        </Left>
                                        <Body>
                                            <Text style={styles.text2}>{item.username}</Text>
                                            <Text style={styles.text3}>{item.phone_number}</Text>
                                        </Body>
                                    </ListItem>
                                </TouchableWithoutFeedback>
                            </List>
                        ))}
                    </View>
                </View>
            </Content>
        </Container>
    )
}
const mapStateToProps = state => {
    return { token: state.auth.results?.token };
};
export default connect(mapStateToProps)(SearchReceiver);