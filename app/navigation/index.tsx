import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import { RootStackParamList } from "../../types";
import AlarmClock from "../screens/Alarm";
import Examples from "../screens/Examples";
import IncomingCall from "../screens/IncomingCall";
import KeyPad from "../screens/KeyPad";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Examples}
        name="Examples"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={IncomingCall}
        name="IncomingCall"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={AlarmClock}
        name="AlarmClock"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={KeyPad}
        name="KeyPad"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
