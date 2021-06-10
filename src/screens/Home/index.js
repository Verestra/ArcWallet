import React from 'react';
import styles from './style'
import{StatusBar} from 'react-native'
import { List, ListItem, View, Container, CardItem, Thumbnail, Content, Left, Right, Body, Icon, Text } from 'native-base';
function Home () {
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
            backgroundColor="#6379F4"/>
            <CardItem style={styles.headerCard}>
              <Left>
                <Thumbnail source={require('../../assets/img/profile-pic.png')} />
                <Body>
                  <Text style={styles.textFade}>Balance</Text>
                  <Text style={styles.textHeader}>RP.120.000</Text>
                </Body>
              </Left>
              <Right>
                <Icon type="MaterialCommunityIcons" name="bell-outline" style={styles.bell}/>
              </Right>
            </CardItem>
        <Content>
            <View style={styles.containerTransaction}>
                <View style={styles.cardTransaction}>
                    <Text style={styles.text1}>
                        <Icon type="MaterialCommunityIcons" name="arrow-up" style={styles.arrowUp} />
                        Transfer
                    </Text>
                </View>
                <View style={styles.cardTransaction}>
                    <Text style={styles.text1}>
                        <Icon type="MaterialCommunityIcons" name="plus" style={styles.arrowUp} />
                        Top Up
                    </Text>
                </View>
            </View>
            <View style={styles.containerHistory}>
                <View style={styles.cardHistory}>
                    <Text style={styles.text1}>Transaction History</Text>
                    <Text style={styles.blueText}>See all</Text>
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
        </Content>
      </Container>
    )
}
export default Home
