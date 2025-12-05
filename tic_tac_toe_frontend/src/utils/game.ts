export type Player = 'X' | 'O';
export type Cell = Player | '';

/**
 * PUBLIC_INTERFACE
 * getWinningLines
 * Returns all possible winning line index triplets for a 3x3 Tic Tac Toe board.
 */
export function getWinningLines(): number[][] {
  return [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];
}

/**
 * PUBLIC_INTERFACE
 * calculateWinner
 * Determine the winner for the given board.
 * @param board - array of 9 cells
 * @returns winner: 'X' | 'O' | null and the winning line indices if any
 */
export function calculateWinner(board: Cell[]): { winner: Player | null; line: number[] | null } {
  const lines = getWinningLines();
  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line };
    }
  }
  return { winner: null, line: null };
}

/**
 * PUBLIC_INTERFACE
 * isDraw
 * A draw occurs when all cells are filled and there is no winner.
 */
export function isDraw(board: Cell[]): boolean {
  const anyEmpty = board.some((c) => c === '');
  const { winner } = calculateWinner(board);
  return !winner && !anyEmpty;
}
