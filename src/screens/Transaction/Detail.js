import React, {useState, useEffect} from 'react';
import styles from './style';
import {connect} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env'
import {useNavigation} from '@react-navigation/native';
import{ StatusBar } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import { Badge, List, ListItem, View, Container, CardItem, Thumbnail, Content, Left, Right, Body, Icon, Text } from 'native-base';

function TransactionDetail (props) {
  const [history, setHistory] = useState([]);
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  function getArraySum(a){
    var total=0;
    for(var i in a) { 
        total += a[i];
    }
    return total;
  }

  const totalMap = history.map(({amount}) =>  amount) 
  let totalAmount = getArraySum(totalMap)
  // console.log(`${totalAmount} Total Amount`)

  const incomeMap = income.map(({amount}) =>  amount) 
  let totalIncome = getArraySum(incomeMap)
  // console.log(`${totalIncome} Total Income`)

  const expenseMap = expense.map(({amount}) =>  amount) 
  let totalExpense = getArraySum(expenseMap)
  // console.log(`${totalExpense} Total Expense`)

  const token = props.token
  const navigation = useNavigation();

    const chartConfig = {
        backgroundGradientFrom: "#F9F9F9",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#F9F9F9",
        color: (opacity = 1) => `#F9F9F9`,
        labelColor: (opacity = 1) => `rgba(143, 143, 143, ${opacity})`,
        barPercentage: 0.5,
        barRadius: 10,
        decimalPlaces: 0,
        useShadowColorFromDataset: false // optional,
      };
      
    const data = {
        labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
          {
            data: [50000, 49000, 149000, 49000, 250000, 150000, 50000],
            colors: [
                (opacity = 1) => `#6379F4`,
                (opacity = 1) => `#6379F4`,
                (opacity = 1) => `#9DA6B5`,
                (opacity = 1) => `#9DA6B5`,
                (opacity = 1) => `#9DA6B5`,
                (opacity = 1) => `#6379F4`,
                (opacity = 1) => `#9DA6B5`,]
          }
        ]
      };
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          axios.get(`${API_URL}/v1/transactions?page=1&limit=10&start=2021-05-11&end=2021-07-13`, {
             headers: {
                'Authorization': `Bearer ${token}`
            },
          })
            .then(res =>  setHistory(res.data.data) )
            .catch(err => console.log(err));

            axios.get(`${API_URL}/v1/transactions?page=1&limit=10&filter=income&start=2021-05-11&end=2021-07-13`, {
              headers: {
                 'Authorization': `Bearer ${token}`
             },
           })
             .then(res =>  setIncome(res.data.data) )
             .catch(err => console.log(err));

             axios.get(`${API_URL}/v1/transactions?page=1&limit=10&filter=expense&start=2021-05-11&end=2021-07-13`, {
              headers: {
                 'Authorization': `Bearer ${token}`
             },
           })
             .then(res =>  setExpense(res.data.data) )
             .catch(err => console.log(err));
        });
        return unsubscribe;
      }, [navigation]);
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
                        <Text style={styles.textHeader}>Rp{totalIncome}</Text>
                        </View>
                        <View>
                        <Icon style={{fontSize: 30, color: "#FF5B37"}} type='MaterialCommunityIcons' name="arrow-up" />
                        <Text style={styles.textFade}>Expense</Text>
                        <Text style={styles.textHeader}>Rp{totalExpense}</Text>
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
                    withCustomBarColorFromData={true}
                    flatColor={true}
                    fromZero={true}
                    />
            <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <Badge style={{ backgroundColor: '#6379F4' ,borderRadius: 20, marginRight: 5}} />
                <Text style={{...styles.text1, marginRight:30}}>Income</Text>
                <Badge style={{ backgroundColor: '#9DA6B5' ,borderRadius: 20, marginRight: 5}}/>
                <Text style={styles.text1}>Outcome</Text>
            </View>
            </View>
            </View>
        <View style={styles.containerHistory}>
          <View style={styles.cardHistory}>
            <Text style={styles.text1}>Transaction History</Text>
            <Text onPress={()=> navigation.navigate('TransactionHistory')} style={styles.blueText}>See all</Text>
          </View>
          {history.map((item, i)=> (
            <List key={i} style={{marginLeft: -15, marginBottom: 20}}>
                <ListItem elevation={3} style={{backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10}} thumbnail>
                <Left>
                {item.type_id === 1 ? (
                    item.receiver_avatar !== null ? (
                        <Thumbnail source={{
                            uri:
                             `${API_URL}/images/${item.receiver_avatar}` ,
                            }} />
                    ) : (
                        <Thumbnail source={require('../../assets/img/blank-profile.png')} />
                    )
                ) : item.type_id === 2 ? (
                    <Thumbnail source={{
                        uri:
                        `${API_URL}/images/avatars/topup.png`
                    }} />
                ) : (
                    <Thumbnail source={{
                        uri:
                        `${API_URL}/images/avatars/subscription.png`
                    }}/>
                )}
                </Left>
                <Body>
                    {item.receiver_name !== null ? (
                        <Text style={styles.text2}>{item.receiver_name}</Text>
                    ) : ( 
                        <Text style={styles.text2}>{item.notes}</Text>
                    )}
                    {item.type_id === 2 ? (
                        <Text style={styles.text2}></Text>
                    ) : ( 
                        <Text style={styles.text3}>{item.type}</Text>
                    )}
                </Body>
                <Right>
                    {item.type_id === (1 && 2) ? (
                    <Text style={styles.plusText}>+Rp{item.amount}</Text> ) : 
                    <Text style={styles.minusText}>-Rp{item.amount}</Text>
                    }
                </Right>
                </ListItem>
            </List>
            ))}
        </View>
      </Content>
    </Container>
  );
}
const mapStateToProps = state => {
  return {token: state.auth.results?.token};
};
export default connect(mapStateToProps)(TransactionDetail);