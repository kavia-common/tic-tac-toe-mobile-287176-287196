import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type Props = {
  currentPlayer: 'X' | 'O';
  winner?: 'X' | 'O' | null;
  isDraw: boolean;
};

/**
 * PUBLIC_INTERFACE
 * GameStatusBar - Displays status: current player's turn, winner, or draw.
 */
const GameStatusBar: React.FC<Props> = ({ currentPlayer, winner = null, isDraw }) => {
  let message = `Player ${currentPlayer}'s turn`;
  let accentColor = colors.text;

  if (winner) {
    message = `${winner} wins!`;
    accentColor = winner === 'X' ? colors.primary : colors.secondary;
  } else if (isDraw) {
    message = "It's a draw.";
    accentColor = colors.text;
  } else {
    accentColor = currentPlayer === 'X' ? colors.primary : colors.secondary;
  }

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={`Game status: ${message}`}
      style={styles.container}
    >
      <Text style={[styles.text, { color: accentColor }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default GameStatusBar;
