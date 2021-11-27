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
    screen: "NumberPad",
    source: Images.numberPad,
    title: "Number Pad",
  },
];

export { examples };
