import React, {useEffect, useRef} from 'react';
import {StatusBar, Animated, View, Image, Text, StyleSheet} from 'react-native';
function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
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
  }, []);
  return (
    <View style={styles.splashScreenRootView}>
      <StatusBar animated={true} hidden={true} />
      <View style={styles.splashScreenChildView}>
        <Animated.View
          style={{
            // Bind opacity to animated value
            opacity: fadeAnim,
          }}>
          <Text style={styles.textSplash}>Welcome To</Text>
          <Image source={require('./../assets/img/arc_logo.png')} />
        </Animated.View>
      </View>
    </View>
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
export default SplashScreen;
