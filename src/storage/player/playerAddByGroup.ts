import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppError } from "@utils/AppError"
import { PLAYER_COLLECTION } from "@storage/storage.config"
import type { PlayerStorageDTO } from "./PlayerSToragetDTO"
import { playerGetByGroup } from "./playerGetByGroup"

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storedPlayers = await playerGetByGroup(group);
    const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name)

    if (playerAlreadyExists.length > 0) {
      throw new AppError("Essa pessoa já está adicionada em um time aqui")
    }

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify([
      ...storedPlayers, newPlayer
    ]))

  } catch(error) {
    throw error;
  }
}