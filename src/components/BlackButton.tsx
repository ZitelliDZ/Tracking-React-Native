import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const BlackButton = ({onPress, title, style = {}}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        ...(style as any),
        ...styles.blackButton,
      }}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BlackButton;

const styles = StyleSheet.create({
  blackButton: {
    height: 50,
    width: 200,
    backgroundColor: '#000',
    borderRadius: 50,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    elevation: 7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
  },
});
