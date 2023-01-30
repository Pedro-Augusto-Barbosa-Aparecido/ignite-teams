import { TextInputProps, TextInput } from "react-native"
import { Container } from "./styles"

import { useTheme } from "styled-components/native"

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: Props) {
  const { COLORS: { GRAY_300 } } = useTheme();

  return (
    <Container 
      ref={inputRef}
      placeholderTextColor={GRAY_300}
      {...rest}
    />
  )
}

