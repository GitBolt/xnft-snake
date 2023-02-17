import { Button, Text } from "react-native";
import { Screen } from "../components/Screen";
import React from "react";


type Props = {
  setStart: React.Dispatch<React.SetStateAction<boolean>>
}

export const WelcomeScreen = ({ setStart }: Props) => {

  return (
    <Screen style={{ marginTop: "10%", display:"flex", alignItems:'center' }}>
      <Text>Welcome</Text>
      <Button onPress={() => setStart(true)} title="Start Playing" />
    </Screen>
  );
}
