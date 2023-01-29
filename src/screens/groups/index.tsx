import { GroupCard } from '@components/groupcard';
import { Header } from '@components/header';
import { Highlight } from '@components/highlight';
import { useState } from 'react';
import { Container } from './styles';

import { FlatList } from "react-native"
import { ListEmpty } from '@components/listEmpty';
import { Button } from '@components/button';
import { useNavigation } from '@react-navigation/native';

export default function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const { navigate } = useNavigation();

  function handleNewGroup() {
    navigate("new")
  }

  return (
    <Container>
      <Header />
      <Highlight 
        title='Turmas' 
        subtitle='Jogue com a sua turma' 
      />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        contentContainerStyle={groups.length === 0 && {
          flex: 1
        }}        
        ListEmptyComponent={() => (
          <ListEmpty 
            message="Que tal cadastrar a primeira turma?" 
          />
        )}
        renderItem={({ item }) => (
          <GroupCard 
            title={item} 
          />
        )}
      />

      <Button 
        title='Cria nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  );
}
