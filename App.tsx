import { ThemeProvider } from "styled-components";
import Groups from "@screens/groups";
import theme from "@theme/index";

import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Spinner } from "@components/spinner";
import { StatusBar } from "react-native";
import { NewGroup } from "@screens/newGroup";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <NewGroup /> : <Spinner size={40} />}
    </ThemeProvider>
  );
}
