import React, {useEffect, useState, useRef} from 'react';
import {StatusBar, Animated, StyleSheet, View, Image, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Test from './src/screens/Test.js';

import Login from './src/screens/Login';

import Home from './src/screens/Home';
import TransactionDetail from './src/screens/Transaction/Detail.js';
import TransactionHistory from './src/screens/Transaction/History.js';

import TopUp from './src/screens/TopUp';
import Profile from './src/screens/Profile';
import Notification from './src/screens/Notification';
import PersonalInformation from './src/screens/Profile/PersonalInformation';

function App() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {Navigator, Screen} = createStackNavigator();
  const [splashScreenVisible, setSplashScreenVisible] = useState(true);
  hideSplashScreen = () => {
    setSplashScreenVisible(false);
  };
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    fadeIn();
    setTimeout(function () {
      hideSplashScreen();
    }, 5000);
  });
  let splashScreen = (
    <View style={styles.splashScreenRootView}>
      <StatusBar animated={true} hidden={true} />
      <View style={styles.splashScreenChildView}>
        <Animated.View
          style={{
            // Bind opacity to animated value
            opacity: fadeAnim,
          }}>
          <Text style={styles.textSplash}>Welcome To</Text>
          <Image source={require('./src/assets/img/arc_logo.png')} />
        </Animated.View>
      </View>
    </View>
  );
  return (
    <NavigationContainer style={styles.navigationContainer}>
      <Navigator headerMode={'none'}>
        {/* Testing Screen For Navigation Only */}
        <Screen name="navigation-testing" component={Test} />
        {/* Home Screen */}
        <Screen name="Home" component={Home} />
        <Screen name="TransactionDetail" component={TransactionDetail} />
        <Screen name="TransactionHistory" component={TransactionHistory} />
        {/* Topup Screen */}
        <Screen name="TopUp" component={TopUp} />
        {/* Profile Screen */}
        <Screen name="Profile" component={Profile} />
        <Screen name="PersonalInformation" component={PersonalInformation} />
        {/* Auth Screen */}
        <Screen name="Login" component={Login} />
        {/* Notification screen */}
        <Screen name="Notification" component={Notification} />
      </Navigator>
      {splashScreenVisible === true ? splashScreen : null}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    backgroundColor: '#F9F9F9',
  },
  splashScreenRootView: {
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  splashScreenChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  textSplash: {
    fontFamily: 'NunitoSans-ExtraLightItalic',
    textAlign: 'center',
    fontSize: 20,
    color: '#6379F4',
  },
});

export default App;
