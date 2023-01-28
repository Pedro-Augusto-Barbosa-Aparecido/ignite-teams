import { ActivityIndicatorProps } from "react-native";
import { Container, LoadingIndicator } from "./styles";

interface SpinnerProps extends ActivityIndicatorProps {
  color?: string;
}

export function Spinner({ color, ...rest }: SpinnerProps) {
  return (
    <Container>
      <LoadingIndicator {...rest} />
    </Container>
  )
}
