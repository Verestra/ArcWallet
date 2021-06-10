import React from 'react';
import styles from './style';
import{ StatusBar } from 'react-native';
import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { List, ListItem, View, Container, CardItem, Thumbnail, Content, Left, Right, Body, Icon, Text } from 'native-base';

function TransactionDetail ({navigation}) {
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: "#F9F9F9",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#F9F9F9",
        color: (opacity = 1) => `rgba(99, 121, 244, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(143, 143, 143, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false // optional,
      };
      
    const data = {
        labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
          {
            data: [50000, 49000, 149000, 1150000]
          }
        ]
      };
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
                <Text style={styles.text1}>Transaction</Text>
              </Left>
            </CardItem>
        <Content>
            <CardItem style={styles.headerCard1}>
                <Body style={{padding: 10}}>
                    <View style={{display:'flex', flexDirection:'row'}}>
                        <View>
                        <Icon style={{fontSize: 30, color: '#4CEDB3'}} type='MaterialCommunityIcons' name="arrow-down" />
                        <Text style={styles.textFade}>Income</Text>
                        <Text style={styles.textHeader}>Rp2.120.000</Text>
                        </View>
                        <View>
                        <Icon style={{fontSize: 30, color: "#FF5B37"}} type='MaterialCommunityIcons' name="arrow-up" />
                        <Text style={styles.textFade}>Outcome</Text>
                        <Text style={styles.textHeader}>Rp2.120.000</Text>
                        </View>
                    </View>
                </Body>
            </CardItem>
            <View style={styles.containerTransaction}>
            <View style={{marginTop: 45, marginBottom: 25}}>
            <Text style={{...styles.text1, marginBottom: 30}}>In This Week</Text>
                <BarChart
                    data={data}
                    width={325}
                    height={220}
                    chartConfig={chartConfig}
                    withInnerLines={false}
                    />
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
export default TransactionDetail