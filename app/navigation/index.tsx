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

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Examples"
        component={Examples}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IncomingCall"
        component={IncomingCall}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AlarmClock"
        component={AlarmClock}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
