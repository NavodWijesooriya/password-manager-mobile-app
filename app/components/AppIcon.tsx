import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface AppIconProps {
  size?: number;
  style?: ViewStyle;
  showBackground?: boolean;
  backgroundColor?: string;
  iconColor?: string;
}

export default function AppIcon({ 
  size = 60, 
  style, 
  showBackground = true,
  backgroundColor = '#4a90e2',
  iconColor = '#fff'
}: AppIconProps) {
  const iconSize = size * 0.6;
  
  return (
    <View 
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: showBackground ? backgroundColor : 'transparent',
        },
        style
      ]}
    >
      <Text style={[styles.icon, { fontSize: iconSize, color: showBackground ? iconColor : backgroundColor }]}>
        🔐
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    fontWeight: 'bold',
  },
});
