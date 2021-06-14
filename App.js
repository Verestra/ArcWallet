import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigators from './src/navigators/AuthNavigators';
import HomeNavigators from './src/navigators/HomeNavigators';
import {connect} from 'react-redux';
import NotifService from './src/services/notifications/NotifService';

function App(props) {
  const {isLogin} = props;
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const {Navigator, Screen} = createStackNavigator();

  useEffect(() => {
    const notif = new NotifService();
    notif.localNotif('test', 'Message');
  }, []);

  return (
    <NavigationContainer style={styles.navigationContainer}>
      <Navigator headerMode={'none'}>
        {/* Auth Screen */}
        {!isLogin ? (
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
        ) : (
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
        )}
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    backgroundColor: '#E5E5E5',
  },
});
const mapStateToProps = state => {
  return {isLogin: state.auth.isLogin};
};
export default connect(mapStateToProps)(App);
