import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { colors } from './src/theme/colors';
import { spacing } from './src/theme/spacing';
import Board from './src/components/Board';
import GameStatusBar from './src/components/StatusBar';
import Controls from './src/components/Controls';
import { useTicTacToe } from './src/hooks/useTicTacToe';

/**
 * PUBLIC_INTERFACE
 * App - Entry point wiring together the game:
 * - Status (top)
 * - Board (center)
 * - Controls (bottom)
 *
 * README (how to run):
 * - Install deps: npm install
 * - Start dev server: npm run start (or npm run web / ios / android)
 * - Play: Tap squares to place X and O. Reset to start over.
 */
export default function App() {
  const {
    board,
    currentPlayer,
    winner,
    isDraw,
    gameOver,
    winningLine,
    playMove,
    reset,
  } = useTicTacToe();

  const { width } = useWindowDimensions();
  // Board width responsive: 90% of screen width up to a max
  const BOARD_MAX = 360;
  const boardSize = Math.min(Math.floor(width * 0.9), BOARD_MAX);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.root}>
        <View style={styles.header}>
          <GameStatusBar currentPlayer={currentPlayer} winner={winner} isDraw={isDraw} />
        </View>

        <View style={[styles.card, styles.shadow, { width: boardSize + spacing.xl * 2 }]}>
          <Board
            board={board}
            onPress={playMove}
            winningLine={winningLine ?? undefined}
            size={boardSize}
            disabled={gameOver}
          />
        </View>

        <View style={styles.footer}>
          <Controls onReset={reset} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    // Subtle classic card shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
});
