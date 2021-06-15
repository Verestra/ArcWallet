import React, {useState, useEffect} from 'react';
import styles from './style';
import {connect} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback, StatusBar} from 'react-native';
import {
  Button,
  List,
  ListItem,
  View,
  Container,
  CardItem,
  Thumbnail,
  Content,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from 'native-base';
import {setBalance} from '../../redux/actions/balance';
function Home(props) {
  const [profile, setProfile] = useState([]);
  const [history, setHistory] = useState([]);
  const token = props.token;
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios
        .get(`${API_URL}/v1/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setProfile(res.data.data);
          props.onSetBalance(res.data.data.balance);
        })
        .catch(err => console.log(err));

      axios
        .get(
          `${API_URL}/v1/transactions?page=1&limit=5&start=2021-05-11&end=2021-07-13`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(res => setHistory(res.data.data))
        .catch(err => console.log(err));
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <Container>
      <StatusBar animated={true} backgroundColor="#6379F4" />
      <CardItem style={styles.headerCard}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Profile')}>
          <Left>
            {profile.avatar !== null ? (
              <Thumbnail
                source={{
                  uri: `${API_URL}/images/${profile.avatar}`,
                }}
              />
            ) : (
              <Thumbnail
                source={require('../../assets/img/blank-profile.png')}
              />
            )}
            <Body>
              <Text style={styles.textFade}>Balance</Text>
              <Text style={styles.textHeader}>Rp {props.balance}</Text>
            </Body>
          </Left>
        </TouchableWithoutFeedback>
        <Right>
          <Icon
            onPress={() => navigation.navigate('Notification')}
            type="MaterialCommunityIcons"
            name="bell-outline"
            style={styles.bell}
          />
        </Right>
      </CardItem>
      <Content>
        <View style={styles.containerTransaction}>
          <Button
            onPress={() => navigation.navigate('SearchReceiver')}
            style={styles.cardTransaction}>
            <Text style={styles.text1}>
              <Icon
                type="MaterialCommunityIcons"
                name="arrow-up"
                style={styles.arrowUp}
              />
              Transfer
            </Text>
          </Button>
          <Button
            onPress={() => navigation.navigate('TopUp')}
            style={styles.cardTransaction}>
            <Text style={styles.text1}>
              <Icon
                type="MaterialCommunityIcons"
                name="plus"
                style={styles.arrowUp}
              />
              Top Up
            </Text>
          </Button>
        </View>
        <View style={styles.containerHistory}>
          <View style={styles.cardHistory}>
            <Text style={styles.text1}>Transaction History</Text>
            <Text
              onPress={() => navigation.navigate('TransactionDetail')}
              style={styles.blueText}>
              See all
            </Text>
          </View>
          {history?.length === 0 && (
            <Text style={{...styles.text3, textAlign: 'center'}}>
              No Transaction History
            </Text>
          )}
          {history.map((item, i) => (
            <List key={i} style={{marginLeft: -15, marginBottom: 20}}>
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
                <Body style={{borderBottomWidth: 0}}>
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
                <Right style={{borderBottomWidth: 0}}>
                  {item.type_id === (1 && 2) ? (
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
  return {token: state.auth.results?.token, balance: state.balance.balance};
};
const mapStateToDispatch = dispatch => {
  return {
    onSetBalance: value => dispatch(setBalance(value)),
  };
};
export default connect(mapStateToProps, mapStateToDispatch)(Home);
