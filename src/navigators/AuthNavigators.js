import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/AuthNavigation/Login';
import Register from '../screens/AuthNavigation/Register';
import ResetPassword from '../screens/AuthNavigation/ResetPassword';

function AuthNavigators(props) {
  const Stack = createStackNavigator();
  const {setIsLoggedIn} = props;
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Login"
        children={() => (
          <Login setIsLoggedIn={choice => setIsLoggedIn(choice)} />
        )}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}

export default AuthNavigators;
