export interface Player {
  id: string;
  name: string;
}

export type GameStage = 'card_selection' | 'voting' | 'finished' | 'arm_wrestling_selection' | 'arm_wrestling_voting';

export type VoteStage = 'stage1' | 'stage2';

export type ArmWrestlingVote = {
  round: number;
  voterId: string;
  challenger1Id: string; // The player who chose the opponent
  challenger2Id: string; // The chosen opponent
  votedForWinnerId: string;
}

export type StoredVote = {
  round: number;
  voterId: string;
  votedOnId: string;
  stage1: 'assertive' | 'inassertive';
  stage2: 'truth' | 'lie';
  cardQuestion?: string;
  cardAnswer?: string | null;
};

export interface GameSettings {
  numPlayers: number;
  numRounds: number;
  useOnlineCards: boolean;
  playerNames: { [key: number]: string };
}

export interface CardAnswer {
  text: string;
  color: 'azul' | 'vermelha';
}

export interface GameCard {
  theme: string;
  question: string;
  answers: CardAnswer[];
}

export interface GameResults {
  players: Player[];
  votes: StoredVote[];
  armWrestlingVotes: ArmWrestlingVote[];
}
