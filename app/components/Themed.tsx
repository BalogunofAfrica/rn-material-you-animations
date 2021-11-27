/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from "react";
import {
  Text as DefaultText,
  TextStyle,
  View as DefaultView,
} from "react-native";
import Animated from "react-native-reanimated";

import Colors from "../constants/Colors";
import { useColorScheme } from "../hooks";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }
  return Colors[theme][colorName];
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ dark: darkColor, light: lightColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function AnimatedText(props: TextProps & { animatedStyle?: TextStyle }) {
  const { animatedStyle, style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ dark: darkColor, light: lightColor }, "text");

  return (
    <Animated.Text style={[{ color }, style, animatedStyle]} {...otherProps} />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { dark: darkColor, light: lightColor },
    "background",
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
