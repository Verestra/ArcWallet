import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigators from './src/navigators/AuthNavigators';
import HomeNavigators from './src/navigators/HomeNavigators';
import {connect} from 'react-redux';
import NotifService from './src/services/notifications/NotifService';
import {io} from 'socket.io-client';
import {API_URL} from '@env';
import {setBalance} from './src/redux/actions/balance';

function App(props) {
  const {isLogin} = props;
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const {Navigator, Screen} = createStackNavigator();

  useEffect(() => {
    if (isLogin) {
      const token = props.auth.results.token;
      const userId = props.auth.results.id;

      const notif = new NotifService();

      const socket = io(API_URL, {
        // timeout: 5000,
        autoConnect: false,
        reconnectionDelay: 10000,
        query: {
          token: `Bearer ${token}`,
        },
      });
      socket.connect();

      socket.on('connect', () => {
        socket.emit('join', `notification:${userId}`);
      });

      socket.on('notification', notification => {
        notif.localNotif(
          notification.title || 'New Notification!',
          notification.content,
        );
      });

      socket.on('new-balance', balance => {
        props.onSetBalance(balance);
      });

      socket.on('connect_error', err => {
        console.log(err.message); // prints the message associated with the error
      });
      return () => socket.disconnect();
    }
  }, [isLogin]);

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
  return {
    isLogin: state.auth.isLogin,
    auth: state.auth,
    balance: state.balance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetBalance: value => dispatch(setBalance(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
