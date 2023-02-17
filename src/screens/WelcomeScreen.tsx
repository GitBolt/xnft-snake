import { Button, Image, Text } from "react-native";
import * as Linking from "expo-linking";
import { Section } from "../components/Section";
import { Screen } from "../components/Screen";
import React from "react";


type Props = {
  setStart: React.Dispatch<React.SetStateAction<boolean>>
}

export const WelcomeScreen = ({ setStart }: Props) => {

  return (
    <Screen>
      <Text>Welcome</Text>
      <Button onPress={() => setStart(true)} title="Start Playing"/>
    </Screen>
  );
}
