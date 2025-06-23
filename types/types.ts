export type language = {
  name: string,
  backgroundColor: string,
  color: string
};

export interface GameState {
  isWon: boolean,
  isLost: boolean,
  wrongGuesses: number
}

