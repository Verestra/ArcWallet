import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Card, CardItem, Left, Right, Body, Button} from 'native-base';

function Success() {
  const detail = {
    amount: '100.000',
    balance: '20.000',
    date: 'May 11, 2020',
    time: '12.20',
    notes: 'For buying some socks',
  };
  const from = {
    name: 'Robert Chandler',
    number: '2093023934',
  };
  const to = {
    name: 'Samuel Chandler',
    number: '08283939022',
  };
  return (
    <ScrollView>
      <View>
        <View style={styles.header}>
          <Text style={styles.pageName}> Transfer Details</Text>
        </View>
        <View style={{padding:10,}}>
          <View style={{alignItems: 'center', marginVertical: 30,}}>
            <Image source={require('../../assets/img/success.png')} />
            <Text style={styles.status}>Transfer Success</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.detailTransfer}>
              <Text style={styles.detailMenu}>Amount</Text>
              <Text style={styles.detailValue}>Rp {detail.amount}</Text>
            </View>
            <View style={styles.detailTransfer}>
              <Text style={styles.detailMenu}>Balance Left</Text>
              <Text style={styles.detailValue}> RP {detail.balance}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.detailTransfer}>
              <Text style={styles.detailMenu}>Date</Text>
              <Text style={styles.detailValue}>{detail.date}</Text>
            </View>
            <View style={styles.detailTransfer}>
              <Text style={styles.detailMenu}>Time</Text>
              <Text style={styles.detailValue}>{detail.time}</Text>
            </View>
          </View>
          <View style={styles.detailTransfer2}>
            <Text style={styles.detailMenu}>Notes </Text>
            <Text style={styles.detailValue}>{detail.notes}</Text>
          </View>
          <Text style={styles.detailValue}>From</Text>
          <View style={styles.detailuserTransfer}>
            <Image source={require('../../assets/img/profile-pic.png')} />
            <View>
              <Text style={styles.username}>{from.name}</Text>
              <Text style={styles.usernumber}>{from.number}</Text>
            </View>
          </View>
          <Text style={styles.detailValue}>To</Text>
          <View style={styles.detailuserTransfer}>
            <Image source={require('../../assets/img/pic-samuel.png')} />
            <View>
              <Text style={styles.username}>{to.name}</Text>
              <Text style={styles.usernumber}>{to.number}</Text>
            </View>
          </View>
          <Button style={styles.btnHome}>
            <Text style={styles.btnText}>Back To Home</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6379F4',
    height: 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 50,
  },
  pageName: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  status: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#4D4B57',
    marginTop: 20,
  },
  detailTransfer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '49%',
    padding: 10,
    marginRight: 10,
  },
  detailTransfer2: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    padding: 20,
  },
  detailuserTransfer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    padding: 20,
    flexDirection: 'row',
  },
  detailMenu: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 22,
    color: '#7A7886',
    marginBottom: 15,
  },
  detailValue: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 25,
    color: '#514F5B',
  },
  username: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4D4B57',
    marginLeft: 10,
  },
  usernumber: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    color: '#7A7886',
    marginLeft: 10,
  },
  btnHome: {
    backgroundColor: '#6379F4',
    width: '100%',
    borderRadius: 10,
    padding:10,
    marginBottom: 30,
    alignItems:'center',
  },
  btnText: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontSize: 18,
    color: 'white',
    marginLeft:140,
  },
});
export default Success;
