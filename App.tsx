import { ThemeProvider } from "styled-components/native";
import theme from "@theme/index";

import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Spinner } from "@components/spinner";
import { StatusBar } from "react-native";
import { Routes } from "@routes/index";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Spinner size={40} />}
    </ThemeProvider>
  );
}
