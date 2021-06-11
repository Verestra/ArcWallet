import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Card, CardItem, Left, Right, Body} from 'native-base';

function Notification() {
  const transaction = {
    info: 'Transfered from Jhosua Lee',
    nominal: '220.000',
  };
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
      }}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            style={styles.backIcon}
            source={require('../../assets/img/arrow-left-black.png')}
          />
        </TouchableOpacity>
        <Text style={styles.pageName}>Notification</Text>
      </View>
      <Text style={styles.filterTime}>Today</Text>
      <Card style={styles.card}>
        <View style={{alignSelf: 'center'}}>
          <Image source={require('../../assets/img/arrow-green-down.png')} />
        </View>
        <View style={{marginLeft: 20}}>
          <Text style={styles.info}>{transaction.info}</Text>
          <Text style={styles.nominal}>Rp. {transaction.nominal}</Text>
        </View>
      </Card>
      <Card style={styles.card}>
        <View style={{alignSelf: 'center'}}>
          <Image source={require('../../assets/img/arrow-red-up.png')} />
        </View>
        <View style={{marginLeft: 20}}>
          <Text style={styles.info}>Netflix Subscription</Text>
          <Text style={styles.nominal}>Rp. 149.000</Text>
        </View>
      </Card>
      <Text style={styles.filterTime}>This Week</Text>
      <Card style={styles.card}>
        <View style={{alignSelf: 'center'}}>
          <Image source={require('../../assets/img/arrow-green-down.png')} />
        </View>
        <View style={{marginLeft: 20}}>
          <Text style={styles.info}>Transfer to Jessica</Text>
          <Text style={styles.nominal}>Rp. 100.000</Text>
        </View>
      </Card>
      <Card style={styles.card}>
        <View style={{alignSelf: 'center'}}>
          <Image source={require('../../assets/img/arrow-red-up.png')} />
        </View>
        <View style={{marginLeft: 20}}>
          <Text style={styles.info}>Top Up from BNI E-Banking</Text>
          <Text style={styles.nominal}>Rp. 100.000</Text>
        </View>
      </Card>
      <Card style={styles.card}>
        <View style={{alignSelf: 'center'}}>
          <Image source={require('../../assets/img/arrow-green-down.png')} />
        </View>
        <View style={{marginLeft: 20}}>
          <Text style={styles.info}>Top Up from BNI E-Banking</Text>
          <Text style={styles.nominal}>Rp. 100.000</Text>
        </View>
      </Card>
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
