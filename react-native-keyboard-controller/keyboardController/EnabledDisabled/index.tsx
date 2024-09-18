import React from "react";
import { Button, View } from "react-native";
import { useKeyboardController } from "react-native-keyboard-controller";

import KeyboardAnimationTemplate from "../components/KeyboardAnimation";

export  function EnabledDisabled() {
  const {setEnabled, enabled } = useKeyboardController();

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <Button
        title={enabled ? "Enabled" : "Disabled"}
        onPress={() => setEnabled(!enabled)}
        testID="toggle_button"
      />
      <KeyboardAnimationTemplate />
    </View>
  );
}
