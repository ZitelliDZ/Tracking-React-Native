import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, ViewProps, ViewStyle } from 'react-native'
import { View } from 'react-native'
import Icon  from 'react-native-vector-icons/Ionicons'


interface Props{
    iconName: string,
    onPress: ()=>void,
    style?: StyleProp<ViewStyle>
    size?: number
}

const Fab = ({iconName,onPress,style = {},size=45}:Props) => {
  return (
    <View style={{...style as any}}>
      <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.blackButton}
      >
        <Icon name={iconName} color={'white'} size={size}  />
      </TouchableOpacity>
    </View>
  )
}

export default Fab


const styles = StyleSheet.create({
    blackButton: {
        backgroundColor: '#000000',
        borderRadius: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        zIndex:9999,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.34,
        shadowRadius: 4.65,
        elevation: 7,
    },
})