/* eslint-disable @typescript-eslint/no-namespace */
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    type RootParamListTypes = RootStackParamList;
  }
}

export type RootStackParamList = {
  AlarmClock: undefined;
  Examples: undefined;
  IncomingCall: undefined;
  NumberPad: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
