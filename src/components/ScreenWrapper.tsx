import React from 'react';
import { View, StyleSheet } from 'react-native';

interface IScreenWrapperProps {
  children: React.ReactNode;
}

const ScreenWrapper: React.FC<IScreenWrapperProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0023',
    color: '#fff',
  },
});

export default ScreenWrapper;
