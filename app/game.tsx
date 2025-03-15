import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NfcManager, {NfcEvents} from 'react-native-nfc-manager'
import PromptModal from '@/components/PromptModal'

const GameScreen = () => {
    const [start, setStart] = useState<Date | null>(null)
    const [duration, setDuration] = useState<number>(0)
    const promptRef = React.useRef<{ setVisible: (visible: boolean) => void, setHintText: (hintText: string) => void }>()

    useEffect(() => {
        let count = 5
        NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag:any) => {
            count--

            if(Platform.OS === 'android') {
                promptRef.current!.setHintText(`${count}...`)
            }
            console.log(tag.id)

            if(count <= 0) {
                NfcManager.unregisterTagEvent().catch(() => 0)
                setDuration(new Date().getTime() - start!.getTime())

                if(Platform.OS === 'android') {
                    promptRef.current!.setVisible(false)
                }
            }
        })

        return () => {
            NfcManager.setEventListener(NfcEvents.DiscoverTag, null)
        }
    }, [start])

    const scanTag = async () => {
        await NfcManager.registerTagEvent()

        if(Platform.OS === 'android') {
          promptRef.current!.setVisible(true)
        }
        setStart(new Date())
        setDuration(0)
    }

    return (
      <SafeAreaView className='flex-1 items-center justify-center'>
        <Text>Start Game</Text>
        {duration > 0 && <Text>Duration: {duration}ms</Text>}
        <TouchableOpacity 
          className='m-4 p-4 rounded-md bg-[#ccc]'
          onPress={scanTag}
      >
          <Text>Start</Text>
        </TouchableOpacity>
        <PromptModal ref={promptRef} />
      </SafeAreaView>
    )
}

export default GameScreen