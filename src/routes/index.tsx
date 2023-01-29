import { View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { AppRoutes } from "./app.routes"
import { useTheme } from "styled-components/native"

export function Routes() {
  const { COLORS } = useTheme()
  
  return (
    <View style={{
      backgroundColor: COLORS.GRAY_600,
      flex: 1
    }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  )

}