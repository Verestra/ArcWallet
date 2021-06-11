import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Test from '../screens/Test';

import Home from '../screens/Home';
import TransactionDetail from '../screens/Transaction/Detail.js';
import TransactionHistory from '../screens/Transaction/History.js';

import SearchReceiver from '../screens/Transfer/SearchReceiver.js';
import AmountInput from '../screens/Transfer/AmountInput.js';
import Confirmation from '../screens/Transfer/Confirmation.js';

import TopUp from '../screens/TopUp';
import Profile from '../screens/Profile';
const Stack = createStackNavigator();

function HomeNavigators(props) {
  const {setIsLoggedIn} = props;
  return (
    <Stack.Navigator headerMode="none">
      {/* Testing Screen For Navigation Only */}
      <Stack.Screen name="navigation-testing" children={() => (
          <Test setIsLoggedIn={choice => setIsLoggedIn(choice)} />
        )} />
      {/* Home Screen */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
      {/* Transfer Screen */}
      <Stack.Screen name="SearchReceiver" component={SearchReceiver} />
      <Stack.Screen name="AmountInput" component={AmountInput} />
      <Stack.Screen name="Confirmation" component={Confirmation} />
      {/* Topup Screen */}
      <Stack.Screen name="TopUp" component={TopUp} />
      {/* Profile Screen */}
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default HomeNavigators;
