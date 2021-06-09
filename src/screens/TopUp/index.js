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

const TopUp = ({navigation}) => {
    const virtualAccNum = '2389 081393877946';
    const step = {
      one: 'Go to the nearest ATM or you can use E-Banking.',
      two: 'Type your security number on theATM or E-Banking.',
      three: 'Select “Transfer” in the menu',
      four: 'Type the virtual account number that we provide you at the top.',
      five: 'Type the amount of the money you want to top up.',
      six: 'Read the summary details',
      seven: 'Press transfer / top up',
      eight:'You can see your money in Zwallet within 3 hours.',
    };
  return (
    <View>
      <View style={styles.header}>
        <Image
          style={styles.backIcon}
          source={require('../../assets/img/arrow-left.png')}
        />
        <Text style={styles.title}>Top Up</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.plusIcon}>
              <Image
                style={{width: 50, height: 50, alignSelf: 'center', margin: 10}}
                source={require('../../assets/img/plus.png')}
              />
            </View>
            <View style={{marginLeft: 20}}>
              <Text
                style={{
                  fontFamily: 'nunitoSans-Black',
                  color: '#7A7886',
                  fontSize: 15,
                  marginBottom: 10,
                }}>
                Virtual Account Number
              </Text>
              <Text
                style={{
                  fontFamily: 'nunitoSans-Black',
                  color: '#4D4B57',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                {virtualAccNum}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 23,
              color: '#514F5B',
              marginLeft: 20,
              marginVertical: 30,
            }}>
            How To Top-Up
          </Text>
          <Card style={styles.card}>
            <Text
              style={{
                textAlignVertical: 'center',
                color: '#6379F4',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
                width: 50,
              }}>
              1
            </Text>
            <Text style={{textAlignVertical: 'center', color: '#7A7886'}}>
              {step.one}
            </Text>
          </Card>
          <Card style={styles.card}>
            <Text
              style={{
                textAlignVertical: 'center',
                color: '#6379F4',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
                width: 50,
              }}>
              2
            </Text>
            <Text style={{textAlignVertical: 'center', color: '#7A7886'}}>
              {step.two}
            </Text>
          </Card>
          <Card style={styles.card}>
            <Text
              style={{
                textAlignVertical: 'center',
                color: '#6379F4',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
                width: 50,
              }}>
              3
            </Text>
            <Text style={{textAlignVertical: 'center', color: '#7A7886'}}>
              {step.three}
            </Text>
          </Card>
          <Card style={styles.card}>
            <Text
              style={{
                textAlignVertical: 'center',
                color: '#6379F4',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
                width: 50,
              }}>
              4
            </Text>
            <Text style={{textAlignVertical: 'center', color: '#7A7886'}}>
              {step.four}
            </Text>
          </Card>
          <Card style={styles.card}>
            <Text
              style={{
                textAlignVertical: 'center',
                color: '#6379F4',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
                width: 50,
              }}>
              5
            </Text>
            <Text style={{textAlignVertical: 'center', color: '#7A7886'}}>
              {step.five}
            </Text>
          </Card>
          <Card style={styles.card}>
            <Text
              style={{
                textAlignVertical: 'center',
                color: '#6379F4',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
                width: 50,
              }}>
              6
            </Text>
            <Text style={{textAlignVertical: 'center', color: '#7A7886'}}>
              {step.six}
            </Text>
          </Card>
          <Card style={styles.card}>
            <Text
              style={{
                textAlignVertical: 'center',
                color: '#6379F4',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
                width: 50,
              }}>
              7
            </Text>
            <Text style={{textAlignVertical: 'center', color: '#7A7886'}}>
              {step.seven}
            </Text>
          </Card>
          <Card style={styles.card}>
            <Text
              style={{
                textAlignVertical: 'center',
                color: '#6379F4',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
                width: 50,
              }}>
              8
            </Text>
            <Text style={{textAlignVertical: 'center', color: '#7A7886'}}>
              {step.eight}
            </Text>
          </Card>
          <Card style={styles.card}>
            <Text
              style={{
                textAlignVertical: 'center',
                color: '#6379F4',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
                width: 50,
              }}>
              8
            </Text>
            <Text style={{textAlignVertical: 'center', color: '#7A7886'}}>
              {step.eight}
            </Text>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6379F4',
    paddingTop: 40,
    paddingBottom: 30,
    paddingLeft: 15,
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontSize: 25,
    marginLeft: 17,
    fontWeight: 'bold',
  },
  backIcon: {
    width: 35,
    height: 35,
  },
  container: {
    backgroundColor: '#6379F4',
    height: 150,
    padding: 20,
  },
  innerContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 20,
    width: '100%',
    height: '100%',
    padding: 20,
  },
  plusIcon: {
    backgroundColor: '#EBEEF2',
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  card: {
      flexDirection: 'row',
      height:80,
      width:'90%',
      alignSelf:'center',
      borderRadius:10,
      marginBottom:20,
      paddingRight: 10,
},
});

export default TopUp;
