import { Button } from "@components/button";
import { ButtonIcon } from "@components/buttonIcon";
import { Filter } from "@components/filter";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Input } from "@components/input";
import { ListEmpty } from "@components/listEmpty";
import { PlayerCard } from "@components/playerCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerSToragetDTO";
import { AppError } from "@utils/AppError";
import { useState, useEffect, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type PlayerRouteParams = {
  group: string;
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState<string>("")
  const [team, setTeam] = useState<string>("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const route = useRoute();
  const { navigate } = useNavigation()
  const { group } = route.params as PlayerRouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    try {
      if (newPlayerName.trim().length === 0) {
        return Alert.alert("Novo Player", "Informe o nome da pessoa para adicionar")
      }

      const newPlayer = {
        name: newPlayerName,
        team
      }

      await playerAddByGroup(newPlayer, group)
      await fetchPlayersByTeam()

      newPlayerNameInputRef.current?.blur()

      setNewPlayerName("")


    } catch(error) {
      if (error instanceof AppError) {
        return Alert.alert("Nova Pessoa", error.message);
      }

      Alert.alert("Nova pessoa", "Não foi possível adicionar um player")
      console.log(error)
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const players = await playersGetByGroupAndTeam(group, team);
      setPlayers(players)
    } catch(error) {
      Alert.alert("Pessoas", "Não foi possível carregar as pessoas do time selecionado")
      console.log(error)
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch(error) {
      console.log(error)
      Alert.alert("Remove player", "Não foi possível remover a pessoa")
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigate("groups")
    } catch(error) {
      console.log(error);
      Alert.alert("Remover Grupo", "Não foi possível deletar o grupo")
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      "Remover grupo",
      "Deseja remover o grupo?",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: () => groupRemove() }
      ]
    )
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header 
        showBackButton
      />

      <Highlight 
        title={group}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
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
        keyExtractor={item => item.name}
        contentContainerStyle={[{
          paddingBottom: 100
        }, players.length === 0 && { flex: 1 }]}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
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
        onPress={handleGroupRemove}
      />
    </Container>
  )
}