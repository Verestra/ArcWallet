import React, {useState} from 'react';
import styles from './style';
import{ ScrollView, StatusBar } from 'react-native';
import {Input, Item,List, ListItem, View, Container, CardItem, Thumbnail, Content, Left, Body, Icon, Text } from 'native-base';

function SearchReceiver ({navigation}) {
    const [search, setSearch] = useState('')
    const quickData = [
        {
            pict: require('../../assets/img/pic-michi.png'),
            name: 'Michi',
            unknown : -9994 
        },
        {
            pict: require('../../assets/img/pic-dody.png'),
            name: 'Dody',
            unknown : -3561 
        },
        {
            pict: require('../../assets/img/pic-rian.png'),
            name: 'Rian',
            unknown : -3822 
        },
        {
            pict: require('../../assets/img/pic-samuel.png'),
            name: 'Samuel',
            unknown : -6487 
        },
    ]
    const contacts = [
        {
            id: 1,
            pict: require('../../assets/img/pic-samuel.png'),
            name: 'Samuel Suhi',
            phone: '+62 813-8492-9994',
        }, 
        {
            id: 2,
            pict: require('../../assets/img/pic-julia.png'),
            name: 'Julia Syen',
            phone: '+62 812-3942-3656',
        }, 
        {
            id: 3,
            pict: require('../../assets/img/pic-bobi.png'),
            name: 'Bobi Sammy',
            phone: '+62 813-5982-2940',
        }, 
        {
            id: 4,
            pict: require('../../assets/img/pic-juliana.png'),
            name: 'Juliana Rich',
            phone: '+62 811-6212-5663',
        }]
    return (
        <Container>
            <StatusBar
            animated={true}
            backgroundColor="#FFFFFF"/>
            <CardItem style={styles.headerCard}>
              <Left>
                <Icon onPress={() => navigation.goBack() } type="MaterialCommunityIcons" name="arrow-left" style={{color: '#4D4B57'}} />
                <Text style={styles.text1}>Find Receiver</Text>
              </Left>
            </CardItem>
            <View style={{padding: 10}}>
                    <Item style={{backgroundColor: 'rgba(58, 61, 66, 0.1)', height: 54, borderRadius: 12, padding: 10, marginBottom: 20}}>
                        <Icon name="ios-search" style={{color: '#A9A9A9'}} />
                        <Input 
                        style={{color: '#4D4B57', fontFamily: 'NunitoSans-Regular'}} placeholderTextColor="rgba(58, 61, 66, 0.4)" 
                        placeholder="Search receiver here" 
                        value={search}
                        onChangeText={text => setSearch(text)}
                        />
                        <Icon 
                        type="MaterialCommunityIcons" 
                        name="close-circle" 
                        style={{color: '#A9A9A9'}} 
                        onPress={() => setSearch('')}
                        />
                    </Item>
            </View>
            <Content>
                <View style={{padding: 15}}>
                    <View style={styles.containerQuick}>
                        <Text style={styles.text1}>
                            Quick Access
                        </Text>
                        <ScrollView 
                        horizontal={true} 
                        contentContainerStyle={{display:'flex', flexDirection: 'row'}} >
                            {quickData.map((item, i) => 
                                <View key={i} elevation={10} style={styles.quickCard}>
                                <Thumbnail square source={item.pict} />
                                <Text style={styles.text2}>{item.name}</Text>
                                <Text style={styles.text3}>{item.unknown}</Text>
                            </View>
                            )}
                        </ScrollView>
                    </View>
                    <View style={styles.containerContact}>
                        <Text style={styles.text1}>
                            All Contacts
                        </Text>
                        <Text style={styles.text3}>
                            4 Contacts Found
                        </Text>
                        {contacts.filter((item) => {
                            if (search == "") {
                                return item
                            } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
                                return item
                            }
                        }).map((item, i)=> (
                        <List key={i} style={{marginLeft: -25, marginBottom: 20, marginTop: 20}}>
                            <ListItem elevation={3} style={{backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10}} thumbnail>
                                <Left>
                                    <Thumbnail square source={item.pict} />
                                </Left>
                                <Body>
                                    <Text style={styles.text2}>{item.name}</Text>
                                    <Text style={styles.text3}>{item.phone}</Text>
                                </Body>
                            </ListItem>
                        </List>
                        ))}
                    </View>
                </View>
            </Content>
      </Container>
    )
}
export default SearchReceiver