export interface Player {
  id: string;
  name: string;
  nominations: number;
}

export interface GameSettings {
  numPlayers: number;
  useOnlineCards: boolean;
  playerNames: { [key: number]: string };
}
