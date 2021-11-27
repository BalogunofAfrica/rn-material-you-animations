import Images from "../../../assets/images";
import { RootStackParamList } from "../../../types";

type ExamplesType = {
  screen: keyof RootStackParamList;
  source: number;
  title: string;
};
const examples: ExamplesType[] = [
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
  {
    screen: "KeyPad",
    source: Images.keypad,
    title: "Key Pad",
  },
];

export { examples };
