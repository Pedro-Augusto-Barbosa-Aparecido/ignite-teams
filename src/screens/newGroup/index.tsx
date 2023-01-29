import { Button } from "@components/button";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Input } from "@components/input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [group, setGroup] = useState<string>("")
  const { navigate } = useNavigation()
  
  function handleNew() {
    navigate("players", { group })
  }

  return (
    <Container>
      <Header 
        showBackButton
      />

      <Content>
        <Icon />

        <Highlight 
          title="Nova Turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          value={group}
          onChangeText={setGroup}
        />

        <Button 
          title="Criar"
          style={{
            marginTop: 20
          }}

          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}