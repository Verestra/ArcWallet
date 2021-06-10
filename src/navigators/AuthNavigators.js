import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/AuthNavigation/Login';
import Register from '../screens/AuthNavigation/Register';
import ResetPassword from '../screens/AuthNavigation/ResetPassword';

const Stack = createStackNavigator();

function AuthNavigators(props) {
  const {setLoggedIn} = props;
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Login"
        children={() => <Login setLoggedIn={choice => setLoggedIn(choice)} />}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}

export default AuthNavigators;
