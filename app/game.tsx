import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NfcManager, {NfcEvents} from 'react-native-nfc-manager'

const GameScreen = () => {
    const [start, setStart] = useState<Date | null>(null)
    const [duration, setDuration] = useState<number>(0)

    useEffect(() => {
        let count = 5
        NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag:any) => {
            count--

            if(count <= 0) {
                NfcManager.unregisterTagEvent().catch(() => 0)
                console.warn(new Date().getTime() - start!.getTime())
            }
            console.warn('Tag found: ',tag)
        })

        return () => {
            NfcManager.setEventListener(NfcEvents.DiscoverTag, null)
        }
    }, [])
    const scanTag = async () => {
        

        await NfcManager.registerTagEvent()
    }
  return (
    <SafeAreaView className='flex-1'>
      <Text>Start Game</Text>
      {duration > 0 && <Text>Duration: {duration}ms</Text>}
      <TouchableOpacity 
        className='m-4 p-4 rounded-md bg-[#ccc]'
        onPress={scanTag}
    >
        <Text>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default GameScreen