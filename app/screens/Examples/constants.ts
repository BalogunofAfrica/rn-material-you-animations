import { RootStackParamList } from "../../../types";

type examplesType = {
  screen: keyof RootStackParamList;
  title: string;
};
const examples: examplesType[] = [
  {
    screen: "IncomingCall",
    title: "Incoming Calls",
  },
  {
    screen: "AlarmClock",
    title: "Alarm Clock",
  },
];

export { examples };
