import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NfcManager from 'react-native-nfc-manager'
import GameScreen from './game'
import PromptModal from '@/components/PromptModal'

const HomeScreen = () => {
  const [hasNfc, setHasNfc] = useState<boolean | null>(null)
  const promptRef = React.useRef<{ setVisible: (visible: boolean) => void }>(null)

  useEffect(() => {
    const checkNfc = async () => {
      const supported = await NfcManager.isSupported()

      if(supported) {
        await NfcManager.start()
      }

      setHasNfc(supported)
    }

    checkNfc()
  }, [])

  if(hasNfc === null) {
    return (
      <SafeAreaView className='flex-1 items-center justify-center'>
        <Text>Your device does not support NFC</Text>
        <TouchableOpacity onPress={() => {
          promptRef.current!.setVisible(true)
        }}>
          <Text>Test</Text>
        </TouchableOpacity>
        <PromptModal ref={promptRef} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='flex-1'>
      <PromptModal />
    </SafeAreaView>
  )
}

export default HomeScreen