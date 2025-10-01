export interface Player {
  id: string;
  name: string;
  nominations: number;
}

export type VoteStage = 'stage1' | 'stage2' | 'finished';

export type Vote = {
  stage1: 'assertive' | 'inassertive' | null;
  stage2: 'truth' | 'lie' | null;
};

export interface GameSettings {
  numPlayers: number;
  useOnlineCards: boolean;
  playerNames: { [key: number]: string };
}
