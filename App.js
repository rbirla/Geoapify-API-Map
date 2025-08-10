import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NearbyPOIs"
          component={HomeScreen}
          options={{ title: 'Nearby Malls & Gas Stations' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
