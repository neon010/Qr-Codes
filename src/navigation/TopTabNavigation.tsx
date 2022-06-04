import React from "react"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CreateHistory } from '../screens/CreateHistory';
import { ScanHistory } from '../screens/ScanHistory';

const Tab = createMaterialTopTabNavigator();

export function TopTabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Scan" component={ScanHistory} />
      <Tab.Screen name="Create" component={CreateHistory} />
    </Tab.Navigator>
  );
}