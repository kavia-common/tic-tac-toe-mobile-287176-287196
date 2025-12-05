import React from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';
import { Cell } from '../utils/game';
import { spacing } from '../theme/spacing';

type Props = {
  board: Cell[];
  onPress: (index: number) => void;
  winningLine?: number[];
  size: number; // pixel width/height for the whole board
  disabled?: boolean;
};

/**
 * PUBLIC_INTERFACE
 * Board - Renders a 3x3 grid of Square components.
 */
const Board: React.FC<Props> = ({ board, onPress, winningLine, size, disabled = false }) => {
  const cellSize = Math.floor(size / 3);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {board.map((value, index) => {
        const isWinningSquare = winningLine?.includes(index) ?? false;
        return (
          <Square
            key={index}
            value={value}
            onPress={() => onPress(index)}
            disabled={disabled || value !== ''}
            isWinningSquare={isWinningSquare}
            size={cellSize}
            accessibilityLabel={`Cell ${index + 1}, ${value === '' ? 'empty' : value}`}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    // Gap between squares is 0 to emulate grid with borders drawn by squares
    margin: spacing.sm,
  },
});

export default Board;
