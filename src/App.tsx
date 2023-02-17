import { useState } from "react";
import { registerRootComponent } from "expo";
import { ActivityIndicator, View } from "react-native";
import { useFonts, Inter_900Black } from "@expo-google-fonts/dev";
import { GameScreen } from "./screens/GameScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";



function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  const [start, setStart] = useState<boolean>(false)


  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (start) {
    return <GameScreen />
  }
  return <WelcomeScreen setStart={setStart} />
}

export default registerRootComponent(App);
