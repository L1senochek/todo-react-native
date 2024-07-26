import React from 'react';
import {
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  PressableProps,
  Pressable,
} from 'react-native';

interface ICustomButtonProps extends PressableProps {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const CustomButton: React.FC<ICustomButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  ...props
}): React.JSX.Element => {
  return (
    <Pressable
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      {...props}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7000ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default CustomButton;
