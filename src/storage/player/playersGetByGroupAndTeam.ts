import { playerGetByGroup } from "./playerGetByGroup";

export async function playersGetByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await playerGetByGroup(group);

    return storage.filter(player => player.team === team)

  } catch(error) {
    throw error;
  }
}