/* eslint-disable @typescript-eslint/no-namespace */
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    type RootParamList = RootStackParamList;
  }
}

export type RootStackParamList = {
  AlarmClock: undefined;
  Examples: undefined;
  IncomingCall: undefined;
  KeyPad: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
