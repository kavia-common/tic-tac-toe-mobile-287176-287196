import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  value: 'X' | 'O' | '';
  onPress: () => void;
  disabled?: boolean;
  isWinningSquare?: boolean;
  size: number; // width/height
  accessibilityLabel?: string;
};

/**
 * PUBLIC_INTERFACE
 * Square - A touchable Tic Tac Toe cell.
 */
const Square: React.FC<Props> = ({
  value,
  onPress,
  disabled = false,
  isWinningSquare = false,
  size,
  accessibilityLabel,
}) => {
  // Determine border visibility to draw grid lines: each cell draws its right and bottom borders except the last col/row
  // But simpler: draw all borders and hide outermost with parent overflow hidden for uniform look
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          width: size,
          height: size,
          backgroundColor: isWinningSquare ? '#fff7ed' /* subtle amber-50 */ : '#FFFFFF',
          opacity: disabled && value === '' ? 0.8 : 1,
        },
        pressed && !disabled ? styles.pressed : null,
      ]}
    >
      <View style={styles.content}>
        {value !== '' ? (
          <Text
            style={[
              styles.value,
              value === 'X' ? styles.valueX : styles.valueO,
              isWinningSquare ? styles.winningText : null,
            ]}
          >
            {value}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
};

const BORDER = 2;

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#e5e7eb', // gray-200 grid lines
    borderWidth: BORDER,
  },
  pressed: {
    backgroundColor: '#f9fafb', // gray-50 feedback
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 48,
    fontWeight: '800',
  },
  valueX: {
    color: colors.primary,
  },
  valueO: {
    color: colors.secondary,
  },
  winningText: {
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});

export default Square;
