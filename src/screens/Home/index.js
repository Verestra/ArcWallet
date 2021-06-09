import React from 'react';
import styles from './style'
import{StatusBar} from 'react-native'
import { List, ListItem, View, Container, Card, CardItem, Thumbnail, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
function Home () {
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
            <List style={{marginLeft: -15, marginBottom: 20}}>
                <ListItem elevation={3} style={{backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10}} thumbnail>
                <Left>
                    <Thumbnail square source={require('../../assets/img/pic-samuel.png')} />
                </Left>
                <Body>
                    <Text style={styles.text2}>Samuel Suhi</Text>
                    <Text style={styles.text3}>Transfer</Text>
                </Body>
                <Right>
                    <Text style={styles.plusText}>+Rp50.000</Text>
                </Right>
                </ListItem>
            </List>
            <List style={{marginLeft: -15, marginBottom: 20}}>
                <ListItem elevation={3} style={{backgroundColor: '#FFFFFF',borderRadius: 10, padding: 10}} thumbnail>
                <Left>
                    <Thumbnail square source={require('../../assets/img/logo-spotify.png')} />
                </Left>
                <Body>
                    <Text style={styles.text2}>Spotify</Text>
                    <Text style={styles.text3}>Subscription</Text>
                </Body>
                <Right>
                    <Text style={styles.minusText}>-Rp50.000</Text>
                </Right>
                </ListItem>
            </List>
            </View>
        </Content>
      </Container>
    )
}
export default Home
