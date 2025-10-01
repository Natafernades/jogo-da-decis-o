export interface Player {
  id: string;
  name: string;
}

export type VoteStage = 'stage1' | 'stage2' | 'finished';

export type StoredVote = {
  round: number;
  voterId: string;
  votedOnId: string;
  stage1: 'assertive' | 'inassertive';
  stage2: 'truth' | 'lie';
};

export interface GameSettings {
  numPlayers: number;
  numRounds: number;
  useOnlineCards: boolean;
  playerNames: { [key: number]: string };
}
