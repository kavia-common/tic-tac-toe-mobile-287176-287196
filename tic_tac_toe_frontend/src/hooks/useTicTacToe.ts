import { useCallback, useMemo, useState } from 'react';
import { Cell, Player, calculateWinner, isDraw } from '../utils/game';

type UseTicTacToe = {
  board: Cell[];
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  gameOver: boolean;
  winningLine: number[] | null;
  moveCount: number;
  playMove: (index: number) => void;
  reset: () => void;
};

/**
 * PUBLIC_INTERFACE
 * useTicTacToe - React hook to manage Tic Tac Toe game state and logic.
 */
export function useTicTacToe(): UseTicTacToe {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [moveCount, setMoveCount] = useState<number>(0);

  const { winner, winningLine } = useMemo(() => {
    const { winner, line } = calculateWinner(board);
    return { winner, winningLine: line };
  }, [board]);

  const draw = useMemo(() => isDraw(board), [board]);
  const gameOver = winner !== null || draw;

  const playMove = useCallback(
    (index: number) => {
      if (gameOver) return;
      if (board[index] !== '') return;

      setBoard((prev) => {
        const next = [...prev];
        next[index] = currentPlayer;
        return next;
      });
      setMoveCount((c) => c + 1);
      setCurrentPlayer((p) => (p === 'X' ? 'O' : 'X'));
    },
    [board, currentPlayer, gameOver]
  );

  const reset = useCallback(() => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setMoveCount(0);
  }, []);

  return {
    board,
    currentPlayer,
    winner,
    isDraw: draw,
    gameOver,
    winningLine,
    moveCount,
    playMove,
    reset,
  };
}
