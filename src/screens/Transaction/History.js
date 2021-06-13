import React from 'react';
import styles from './style';
import{ StatusBar } from 'react-native';
import { Footer,List, ListItem, View, Container, CardItem, Thumbnail, Content, Left, Right, Body, Icon, Text } from 'native-base';

function TransactionHistory ({navigation}) {
    const history = [
        {
            id: 1,
            pict: require('../../assets/img/pic-samuel.png'),
            name: 'Samuel Suhi',
            type: 'Transfer',
            transfer: 'in',
            money: '50.000'
        }, 
        {
            id: 2,
            pict: require('../../assets/img/logo-spotify.png'),
            name: 'Spotify',
            type: 'Subscription',
            transfer: 'out',
            money: '49.000'
        }, 
        {
            id: 3,
            pict: require('../../assets/img/logo-netflix.png'),
            name: 'Netflix',
            type: 'Subscription',
            transfer: 'out',
            money: '149.000'
        }, 
        {
            id: 2,
            pict: require('../../assets/img/pic-bobi.png'),
            name: 'Spotify',
            type: 'Transfer',
            transfer: 'in',
            money: '1.150.000'
        }]
    return (
        <Container>
            <StatusBar
            animated={true}
            backgroundColor="#FFFFFF"/>
            <CardItem style={styles.headerCard}>
              <Left>
                <Icon onPress={() => navigation.goBack() } type="MaterialCommunityIcons" name="arrow-left" style={{color: '#4D4B57'}} />
                <Text style={styles.text1}>History</Text>
              </Left>
            </CardItem>
        <Content>
            <View style={styles.containerHistory}>
                <View style={styles.cardHistory}>
                    <Text style={styles.text3}>This Week</Text>
                </View>
            {history.map((item, i)=> (
            <List key={i} style={{marginLeft: -15, marginBottom: 20}}>
                <ListItem elevation={3} style={{backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10}} thumbnail>
                <Left>
                    <Thumbnail square source={item.pict} />
                </Left>
                <Body>
                    <Text style={styles.text2}>{item.name}</Text>
                    <Text style={styles.text3}>{item.type}</Text>
                </Body>
                <Right>
                    {item.transfer === 'in' ? (
                    <Text style={styles.plusText}>+Rp{item.money}</Text> ) : 
                    <Text style={styles.minusText}>-Rp{item.money}</Text>
                    }
                </Right>
                </ListItem>
            </List>
            ))}
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', marginBottom: 50}}>
                <View elevation={5} style={{borderRadius: 12, backgroundColor: '#FFFFFF', width: 57}}>
                    <Icon style={{textAlign:'center',fontSize: 35, color: '#FF5B37'}} type="MaterialCommunityIcons" name="arrow-up"/>
                </View>
                <View elevation={5} style={{borderRadius: 12, backgroundColor: '#FFFFFF', width: 57}}>
                    <Icon style={{textAlign:'center',fontSize: 35, color: '#4CEDB3'}} type="MaterialCommunityIcons" name="arrow-down"/>
                 </View>
                <View elevation={5} style={{borderRadius: 12, backgroundColor: '#FFFFFF', width: 200}}>
                    <Text style={styles.blueText1}>Filter By Date</Text>
                 </View>
            </View>
        </Content>
            
      </Container>
    )
}
export default TransactionHistory