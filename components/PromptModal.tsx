import { View, Text, Modal, Dimensions, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import React, { useEffect } from 'react'

const PromptModal = (props: any, ref: any) => {
  const [_visible, _setVisible] = React.useState(false)
  const [visible, setVisible] = React.useState(true)
  const [hintText, setHintText] = React.useState('')
  const animValue = React.useRef(new Animated.Value(0)).current

  useEffect(() => {
    if(ref) {
      ref.current = {
        setHintText,
        setVisible: _setVisible
      }
    }
  }, [ref])

  useEffect(() => {
    if(_visible) {
      setVisible(true)
      Animated.timing(animValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start()
    } else {
      Animated.timing(animValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        setVisible(false)
        setHintText('')
      })
    }

  }, [_visible, animValue])

  const promptAnimStyle = {
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 0]
        })
      }
    ]
  }

  return (
    <Modal visible={visible} transparent={true}>
      <View className='flex-1'>
        <Animated.View style={[{backgroundColor: 'rgba(0,0,0,0.3)'}, StyleSheet.absoluteFill]}>
            <Animated.View 
              className='absolute bottom-2 left-5 right-0 p-5 bg-white rounded-md py-14 px-5 align-center justify-center' 
              style={[{width: (Dimensions.get('window').width - 2 * 20)}, promptAnimStyle]}
            >
                <Text className='text-sm mb-5'>{hintText || 'Hello NFC'}</Text>
                <TouchableOpacity 
                  className='border border-gray-400 rounded-md p-4' 
                  onPress={() => {
                    _setVisible(false)
                  }}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  )
}

export default React.forwardRef(PromptModal)