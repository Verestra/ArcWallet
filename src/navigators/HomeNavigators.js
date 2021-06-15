import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import TransactionDetail from '../screens/Transaction/Detail.js';
import TransactionHistory from '../screens/Transaction/History.js';

import SearchReceiver from '../screens/Transfer/SearchReceiver.js';
import AmountInput from '../screens/Transfer/AmountInput.js';
import Confirmation from '../screens/Transfer/Confirmation.js';
import PinConfirmation from '../screens/Transfer/PinConfirmation.js';

import TopUp from '../screens/TopUp';
import Profile from '../screens/Profile';
import ChangePassword from '../screens/Profile/ChangePassword.js';
import ChangePin from '../screens/Profile/ChangePin.js';
import Success from '../screens/Success';
import Failed from '../screens/Failed';

import Notification from '../screens/Notification';
import PersonalInformation from '../screens/Profile/PersonalInformation.js';

import AddPhoneNumber from '../screens/AddPhoneNumber';
import ManagePhoneNumber from '../screens/ManagePhoneNumber';
import {connect} from 'react-redux';
import {getUser} from '../redux/actions/user';
import {API_URL} from '@env';
const Stack = createStackNavigator();

function HomeNavigators(props) {
  const {setIsLoggedIn} = props;
  useEffect(() => {
    props.getUser(`${API_URL}/v1/users`, props.auth.token);
  }, []);
  return (
    <Stack.Navigator headerMode="none">
      {/* Home Screen */}
      <Stack.Screen
        name="Home"
        children={() => (
          <Home setIsLoggedIn={choice => setIsLoggedIn(choice)} />
        )}
      />
      <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
      {/* Transfer Screen */}
      <Stack.Screen name="SearchReceiver" component={SearchReceiver} />
      <Stack.Screen name="AmountInput" component={AmountInput} />
      <Stack.Screen name="Confirmation" component={Confirmation} />
      <Stack.Screen name="PinConfirmation" component={PinConfirmation} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="Failed" component={Failed} />
      {/* Topup Screen */}
      <Stack.Screen name="TopUp" component={TopUp} />
      {/* Profile Screen */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChangePin" component={ChangePin} />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
      />
      {/* Phone Number Screen */}
      <Stack.Screen name="AddPhoneNumber" component={AddPhoneNumber} />
      <Stack.Screen name="ManagePhoneNumber" component={ManagePhoneNumber} />
    </Stack.Navigator>
  );
}
const mapStateToProps = state => ({
  auth: state.auth.results,
});
const mapDispatchToProps = dispatch => ({
  getUser: (url, token) => {
    dispatch(getUser(url, token));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeNavigators);
