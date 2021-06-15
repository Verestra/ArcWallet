import React, { useState, useEffect } from 'react';
import styles from './style';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '@env'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import { Badge, List, ListItem, View, Container, CardItem, Thumbnail, Content, Left, Right, Body, Icon, Text } from 'native-base';
import style from '../../components/OTP/style';

function TransactionDetail(props) {
  const [history, setHistory] = useState([]);
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [chartIncome, setChartIncome] = useState([]);
  const [chartExpense, setChartExpense] = useState([]);

  const chartIncomeMap = chartIncome.map(({ amount }) => amount)
  console.log(chartIncomeMap)

  const chartDateIncomeMap = chartIncome.map(({ day }) => day.slice(8, 10))
  console.log(chartDateIncomeMap)

  const chartExpenseMap = chartExpense.map(({ amount }) => amount)
  console.log(chartExpenseMap)

  const chartDateExpenseMap = chartExpense.map(({ day }) => day.slice(8, 10))
  console.log(chartDateExpenseMap)

  function getArraySum(a) {
    var total = 0;
    for (var i in a) {
      total += a[i];
    }
    return total;
  }

  const totalMap = history.map(({ amount }) => amount)
  let totalAmount = getArraySum(totalMap)
  // console.log(`${totalAmount} Total Amount`)

  const incomeMap = income.map(({ amount }) => amount)
  let totalIncome = getArraySum(incomeMap)
  // console.log(`${totalIncome} Total Income`)

  const expenseMap = expense.map(({ amount }) => amount)
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

  const dataChartIncome = {
    labels: chartDateIncomeMap,
    datasets: [
      {
        data: chartIncomeMap,
        colors: [
          (opacity = 1) => `#6379F4`,
          (opacity = 1) => `#6379F4`,
          (opacity = 1) => `#6379F4`,
          (opacity = 1) => `#6379F4`,
          (opacity = 1) => `#6379F4`,
          (opacity = 1) => `#6379F4`,
          (opacity = 1) => `#6379F4`,]
      }
    ]
  };

  const dataChartExpense = {
    labels: chartDateExpenseMap,
    datasets: [
      {
        data: chartExpenseMap,
        colors: [
          (opacity = 1) => '#9DA6B5',
          (opacity = 1) => '#9DA6B5',
          (opacity = 1) => '#9DA6B5',
          (opacity = 1) => '#9DA6B5',
          (opacity = 1) => '#9DA6B5',
          (opacity = 1) => '#9DA6B5',
          (opacity = 1) => '#9DA6B5',]
      }
    ]
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Get History
      axios.get(`${API_URL}/v1/transactions?page=1&limit=10&start=2021-05-11&end=2021-07-13`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
        .then(res => setHistory(res.data.data))
        .catch(err => console.log(err));

      // Get Total Income
      axios.get(`${API_URL}/v1/transactions?page=1&limit=30&filter=income&start=2021-05-11&end=2021-07-13`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
        .then(res => setIncome(res.data.data))
        .catch(err => console.log(err));

      // Get Total Expense
      axios.get(`${API_URL}/v1/transactions?page=1&limit=10&filter=expense&start=2021-05-11&end=2021-07-13`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
        .then(res => setExpense(res.data.data))
        .catch(err => console.log(err));

      // Get Chart
      axios.get(`${API_URL}/v1/transactions/charts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
        .then(res => {
          setChartIncome(res.data.data.income)
          setChartExpense(res.data.data.expense)
        })
        .catch(err => console.log(err));
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <Container>
      <StatusBar
        animated={true}
        backgroundColor="#FFFFFF" />
      <CardItem style={styles.headerCard}>
        <Left>
          <Icon onPress={() => navigation.goBack()} type="MaterialCommunityIcons" name="arrow-left" style={{ color: '#4D4B57' }} />
          <Text style={styles.text1}>Transaction</Text>
        </Left>
      </CardItem>
      <Content>
        <CardItem style={styles.headerCard1}>
          <Body style={{ padding: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View>
                <Icon style={{ fontSize: 30, color: '#4CEDB3' }} type='MaterialCommunityIcons' name="arrow-down" />
                <Text style={styles.textFade}>Income</Text>
                <Text style={styles.textHeader}>Rp {totalIncome}</Text>
              </View>
              <View>
                <Icon style={{ fontSize: 30, color: "#FF5B37" }} type='MaterialCommunityIcons' name="arrow-up" />
                <Text style={styles.textFade}>Expense</Text>
                <Text style={styles.textHeader}>Rp {totalExpense}</Text>
              </View>
            </View>
          </Body>
        </CardItem>
        <View style={styles.containerTransaction}>
          <View style={{ marginTop: 45, marginBottom: 25 }}>
            <Text style={{ ...styles.text1, marginBottom: 30 }}>In This Week</Text>
            {chartIncome?.length === 0 && (
              <Text style={styles.text3}>No Income History</Text>
            )}
            <BarChart
              data={dataChartIncome}
              width={325}
              height={220}
              chartConfig={chartConfig}
              withInnerLines={false}
              withCustomBarColorFromData={true}
              flatColor={true}
              fromZero={true}
            />
            {chartExpense?.length === 0 && (
              <Text style={styles.text3}>No Expense History</Text>
            )}
            <BarChart
              data={dataChartExpense}
              width={325}
              height={220}
              chartConfig={chartConfig}
              withInnerLines={false}
              withCustomBarColorFromData={true}
              flatColor={true}
              fromZero={true}
            />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Badge style={{ backgroundColor: '#6379F4', borderRadius: 20, marginRight: 5 }} />
              <Text style={{ ...styles.text1, marginRight: 30 }}>Income</Text>
              <Badge style={{ backgroundColor: '#9DA6B5', borderRadius: 20, marginRight: 5 }} />
              <Text style={styles.text1}>Expense</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerHistory}>
          <View style={styles.cardHistory}>
            <Text style={styles.text1}>Transaction History</Text>
            <Text onPress={() => navigation.navigate('TransactionHistory')} style={styles.blueText}>See all</Text>
          </View>
          {history?.length === 0 && (
            <Text style={{ ...styles.text3, textAlign: 'center' }}>No Transaction History</Text>
          )}
          {history.map((item, i) => (
            <List key={i} style={{ marginLeft: -15, marginBottom: 20 }}>
              <ListItem
                elevation={3}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  padding: 10,
                }}
                thumbnail>
                <Left>
                  {item.type_id === 1 ? (
                    item.receiver == props.idUser ? (
                      <Thumbnail
                        source={{
                          uri: `${API_URL}/images/${item.sender_avatar}`,
                        }}
                      />
                    ) :
                      item.receiver_avatar !== null ? (
                        <Thumbnail
                          source={{
                            uri: `${API_URL}/images/${item.receiver_avatar}`,
                          }}
                        />
                      ) : (
                        <Thumbnail
                          source={require('../../assets/img/blank-profile.png')}
                        />
                      )
                  ) : item.type_id === 2 ? (
                    <Thumbnail source={require('../../assets/img/topup.png')} />
                  ) : (
                    <Thumbnail
                      source={require('../../assets/img/subscription.png')}
                    />
                  )}
                </Left>
                <Body style={{ borderBottomWidth: 0 }}>
                  {item.receiver_name !== null ?
                    item.receiver == props.idUser ? (
                      <Text style={styles.text2}>{item.sender_name}</Text>
                    ) : (
                      <Text style={styles.text2}>{item.receiver_name}</Text>
                    ) :
                    (
                      <Text style={styles.text2}>{item.notes}</Text>
                    )}
                  {item.type_id === 2 ? (
                    <Text style={styles.text2}></Text>
                  ) :
                    item.receiver == props.idUser ? (
                      <Text style={styles.text3}>{item.type} in</Text>
                    ) : (
                      <Text style={styles.text3}>{item.type} out</Text>
                    )}
                </Body>
                <Right style={{ borderBottomWidth: 0 }}>
                  {item.type_id === (1 && 2) ? (
                    <Text style={styles.plusText}>+Rp {item.amount}</Text>
                  ) :
                    item.receiver == props.idUser ? (
                      <Text style={styles.plusText}>+Rp {item.amount}</Text>
                    ) : (
                      <Text style={styles.minusText}>-Rp {item.amount}</Text>
                    )}
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
  return {
    token: state.auth.results?.token,
    balance: state.balance.balance,
    idUser: state.auth.results?.id
  };
};
const ConnectedTransactionDetail = connect(mapStateToProps)(TransactionDetail);
export default ConnectedTransactionDetail