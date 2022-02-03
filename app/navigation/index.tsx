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
import NumberPad from "../screens/NumberPad";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Examples} name="Examples" />
      <Stack.Screen component={IncomingCall} name="IncomingCall" />
      <Stack.Screen component={AlarmClock} name="AlarmClock" />
      <Stack.Screen component={NumberPad} name="NumberPad" />
    </Stack.Navigator>
  );
}

export default function Navigation({
  colorScheme,
}: {
  colorScheme: NonNullable<ColorSchemeName>;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
