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

function PersonalInformation({...props}) {
  const information = {
    firstName: 'Robert',
    lastName: 'Chandler',
    email: 'pewdiepie@gmail.com',
    phoneNumber: '0918283747',
  };
  return (
    <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
      <View style={styles.header}>
        <TouchableOpacity
        onPress={() => props.navigation.navigate('Profile')}>
          <Image
            style={styles.backIcon}
            source={require('../../assets/img/arrow-left-black.png')}
          />
        </TouchableOpacity>
        <Text style={styles.pageName}>Personal Information</Text>
      </View>
      <View style={{padding: 20}}>
        <Text style={styles.caption}>
          We got your personal information from the sign up proccess. If you
          want to make changes on your information, contact our support.
        </Text>
      </View>
      <Card style={styles.card}>
        <Text style={styles.menuInCard}>First Name</Text>
        <Text style={styles.valueInCard}>{information.firstName}</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.menuInCard}>Last Name</Text>
        <Text style={styles.valueInCard}>{information.lastName}</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.menuInCard}>Verified E-mail</Text>
        <Text style={styles.valueInCard}>{information.email}</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.menuInCard}>Phone Number</Text>
        <Text style={{color:'blue',marginLeft:'80%'}}>Manage</Text>
        <Text style={styles.valueInCard}>{information.phoneNumber}</Text>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 15,
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
  caption: {
    fontFamily: 'NunitoSans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 27,
    color: '#7A7886',
    marginVertical:15,
  },
  card: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
  },
  menuInCard:{
fontFamily: 'NunitoSans',
fontStyle: 'normal',
fontWeight: 'normal',
fontSize: 16,
lineHeight: 22,
color: '#7A7886',
  },
valueInCard:{
fontFamily: 'NunitoSans',
fontStyle: 'normal',
fontWeight: 'bold',
fontSize: 22,
lineHeight: 30,
color: '#514F5B',
  }
});
export default PersonalInformation;
