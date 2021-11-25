import Images from "../../../assets/images";
import { RootStackParamList } from "../../../types";

type examplesType = {
  screen: keyof RootStackParamList;
  source: number;
  title: string;
};
const examples: examplesType[] = [
  {
    screen: "IncomingCall",
    source: Images.incoming,
    title: "Incoming Calls",
  },
  {
    screen: "AlarmClock",
    source: Images.alarm,
    title: "Alarm Clock",
  },
];

export { examples };
