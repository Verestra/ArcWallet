import React, {useEffect, useState, useRef} from 'react';
import {StatusBar, Animated, StyleSheet, View, Image, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigators from './src/navigators/AuthNavigators';
import HomeNavigators from './src/navigators/HomeNavigators';

function App() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        {/* Auth Screen */}
        {isLoggedIn ? (
          <>
            <Screen
              name="Home"
              children={() => (
                <HomeNavigators
                  setIsLoggedIn={choice => setIsLoggedIn(choice)}
                />
              )}
            />
          </>
        ) : (
          <>
            <Screen
              name="Auth"
              children={() => (
                <AuthNavigators
                  setIsLoggedIn={choice => setIsLoggedIn(choice)}
                />
              )}
            />
          </>
        )}
      </Navigator>
      {splashScreenVisible === true ? splashScreen : null}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    backgroundColor: '#E5E5E5',
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
