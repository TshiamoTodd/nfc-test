import { View, Text, Modal, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

const PromptModal = (props: any, ref: any) => {
  const [visible, setVisible] = React.useState(true)
  const [hintText, setHintText] = React.useState('')

  useEffect(() => {
    if(ref) {
      ref.current = {
        setHintText,
        setVisible
      }
    }
  }, [ref])
  return (
    <Modal visible={true} transparent={true}>
      <View className='flex-1'>
        <View style={[{backgroundColor: 'rgba(0,0,0,0.3)'}, StyleSheet.absoluteFill]}>
            <View className='absolute bottom-2 left-5 right-0 p-5 bg-white rounded-md py-14 px-5 align-center justify-center' style={{width: (Dimensions.get('window').width - 2 * 20)}}>
                <Text className='text-sm mb-5'>{hintText || 'Hello NFC'}</Text>
                <TouchableOpacity className='border border-gray-400 rounded-md p-4' onPress={() => setVisible(false)}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  )
}

export default React.forwardRef(PromptModal)