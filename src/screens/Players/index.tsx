import { Button } from "@components/button";
import { ButtonIcon } from "@components/buttonIcon";
import { Filter } from "@components/filter";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Input } from "@components/input";
import { ListEmpty } from "@components/listEmpty";
import { PlayerCard } from "@components/playerCard";
import { useState } from "react";
import { FlatList } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

export function Players() {
  const [team, setTeam] = useState<string>("Time A");
  const [players, setPlayers] = useState([])

  return (
    <Container>
      <Header 
        showBackButton
      />

      <Highlight 
        title="Nome da Turma"
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />
        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList 
          data={["Time A", "Time B"]}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      <FlatList 
        data={players}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item}
        contentContainerStyle={[{
          paddingBottom: 100
        }, players.length === 0 && { flex: 1 }]}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item}
            onRemove={() => {}}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty 
            message="Não há pessoas nesse time"
          />
        )}
      />

      <Button 
        title="Remover Turma"
        type="SECONDARY"
      />
    </Container>
  )
}