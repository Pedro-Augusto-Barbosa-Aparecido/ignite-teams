import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";


export type ButtonTypeStyleProps = "PRIMARY" | "SECONDARY";

type Props = {
  type: ButtonTypeStyleProps;
}

export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  background-color: ${props => {
    switch (props.type) {
      case "PRIMARY":
        return props.theme.COLORS.GREEN_700
      default:
        return props.theme.COLORS.RED_DARK
    }
  }};

  border-radius: 6px;

  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  font-size: ${props => props.theme.FONT_SIZE.MD}px;
  font-family: ${props => props.theme.FONT_FAMILY.BOLD};
  color: ${props => props.theme.COLORS.WHITE};

`