import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Card, CardItem, Left, Right, Body} from 'native-base';
import IncomeArrow from '../../assets/img/arrow-green-down.png';
import ExpenseArrow from '../../assets/img/arrow-red-up.png';
import axios from 'axios';
import {shallowEqual, useSelector} from 'react-redux';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';

const renderText = (typeId, sender, receiver, userId, notes) => {
  if (typeId === 3) return `${notes} Subcription`;
  if (receiver == userId) return `Transferred from ${sender}`;
  if (typeId === 2) return 'Top Up';
  return `Transferred to ${sender}`;
};

const renderIcon = (typeId, receiver, userId) => {
  if (typeId === 1 && receiver != userId) return ExpenseArrow;
  if (typeId === 3) return ExpenseArrow;
  return IncomeArrow;
};

function Notification() {
  const auth = useSelector(state => state.auth, shallowEqual);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = auth.results.token;
  const userId = auth.results.id;
  const navigation = useNavigation();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/v1/notifications?limit=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setNotifications(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const renderItem = ({item}) => (
    <Card style={styles.card}>
      <View style={{alignSelf: 'center'}}>
        <Image source={renderIcon(item.type_id, item.receiver, userId)} />
      </View>
      <View style={{marginLeft: 20}}>
        <Text style={styles.info}>
          {renderText(
            item.type_id,
            item.sender,
            item.receiver,
            userId,
            item.notes,
          )}
        </Text>
        <Text style={styles.nominal}>{item.amount}</Text>
      </View>
    </Card>
  );

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
      }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={styles.backIcon}
            source={require('../../assets/img/arrow-left-black.png')}
          />
        </TouchableOpacity>
        <Text style={styles.pageName}>Notification</Text>
      </View>
      {/* <Text style={styles.filterTime}>Today</Text> */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={{alignItems: 'center', marginTop: 20}}>
            {isLoading ? (
              <ActivityIndicator color="#6379F4" />
            ) : (
              <Text>Notifications is Empty</Text>
            )}
          </View>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    flexDirection: 'row',
  },
  pageName: {
    marginLeft: 20,
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 30,
    color: '#4D4B57',
  },
  card: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterTime: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    color: '#7A7886',
    marginVertical: 30,
  },
  info: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    color: '#7A7A7A',
  },
  nominal: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#43484F',
  },
});
export default Notification;
