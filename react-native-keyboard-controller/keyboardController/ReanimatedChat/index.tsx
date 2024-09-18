import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Reanimated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import Message from "../components/Message";
import { history } from "../components/Message/data";

import { useTelegramTransitions } from "./hooks";
import styles from "./styles";

const AnimatedTextInput = Reanimated.createAnimatedComponent(TextInput);


export function ReanimatedChat() {
  const [isTGTransition, setTGTransition] = useState(false);

  const { height: telegram } = useTelegramTransitions();
  const { height: platform } = useReanimatedKeyboardAnimation();
  const height = useDerivedValue(
    () => (isTGTransition ? telegram.value : platform.value),
    [isTGTransition],
  );

  const scrollViewStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: height.value }, ...styles.inverted.transform],
    }),
    [],
  );
  const textInputStyle = useAnimatedStyle(
    () => ({
      height: 50,
      width: "100%",
      backgroundColor: "#BCBCBC",
      transform: [{ translateY: height.value }],
    }),
    [],
  );
  const fakeView = useAnimatedStyle(
    () => ({
      height: Math.abs(height.value),
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <Reanimated.ScrollView
        showsVerticalScrollIndicator={false}
        style={scrollViewStyle}
      >
        <View style={styles.inverted}>
          <Reanimated.View style={fakeView} />
          {history.map((message, index) => (
            <Message key={index} {...message} />
          ))}
        </View>
      </Reanimated.ScrollView>
      <AnimatedTextInput style={textInputStyle} />
    </View>
  );
}

