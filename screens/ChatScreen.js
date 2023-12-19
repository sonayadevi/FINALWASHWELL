import { Dimensions, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../Firebase'
import { Box, Button, ButtonIcon, ButtonSpinner, ButtonText, Center, GluestackUIProvider, Text, Textarea, TextareaInput, ScrollView} from '@gluestack-ui/themed'
import { config } from '../config/gluestack-ui.config'
import { useNavigation } from '@react-navigation/core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { faRocketchat } from '@fortawesome/free-brands-svg-icons'
import { Alert } from 'react-native'
import { LogBox } from 'react-native'

LogBox.ignoreAllLogs()

export default function ChatScreen() {
  
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const navigation = useNavigation()

  const [nama, setNama] = useState("");
  const [note, setNote] = useState("");

  const handleSubmitPesan = () => {

    Alert.alert(
      "Pesan Terkirim",
      "Terima kasih sudah mengirim pesan.",
      [
        { text: "OK", onPress: () => {

          // send data to firebase
          console.log(nama)
          console.log(note)

          db.collection('data-pengguna').doc(auth.currentUser?.email).collection('chat-data').add({
            nama: nama,
            note: note
          })

          setNama('')
          setNote('')

          navigation.navigate('Home')
        } }
      ]
    )
  }
  
  

  return (
    <GluestackUIProvider config={config}>
      <ScrollView>
      <Box h={'12%'} bg='$primary500' borderBottomLeftRadius={20} borderBottomRightRadius={20} alignItems='center' justifyContent='center' >
        <Box flexDirection='row' display='flex'>  
          <FontAwesomeIcon icon={faRocketchat} size={40} color='black'/>
          <Text bold={false} size='2xl' color='black' marginTop={3} marginLeft={10}>
            WashWell Chat
          </Text>
        </Box>
      </Box>
      <Box h={height} p={'$4.5'}>
        <Text bold={true} marginBottom={10} size='2xl'>
          Nama
        </Text>
        <Textarea
          size="md"
          isReadOnly={false}
          isInvalid={false}
          isDisabled={false}
          w={'100%'}
          bg='#D9D9D9'
          borderRadius={15}
          borderBlockColor='#D9D9D9'
          borderBlockWidth={2}
          borderBlockStyle='solid'
          borderColor='#D9D9D9'
        >
          <TextareaInput value={nama} onChangeText={(text) => setNama(text)} color='$warmGray900' placeholder="Masukkan nama kamu."/>
        </Textarea>

        <Text bold={true} marginTop={30} marginBottom={10} size='2xl'>
          Pesan
        </Text>
        
        <Textarea
          size="md"
          isReadOnly={false}
          isInvalid={false}
          isDisabled={false}
          w={'100%'}
          h={'35%'}
          bg='#D9D9D9'
          borderRadius={15}
          borderBlockColor='#D9D9D9'
          borderBlockWidth={2}
          borderBlockStyle='solid'
          borderColor='#D9D9D9'
        >
          <TextareaInput value={note} onChangeText={(text) => setNote(text)} placeholder='Masukkan pesan kamu disini.'/>
        </Textarea>

        <Box w={'100%'} alignItems='center' marginTop={10}>
          <Button marginTop={20} borderRadius={15} size="xl" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} width={0.5 * width}>
            <ButtonText onPress={handleSubmitPesan} color='black'>Kirim</ButtonText>
          </Button>
        </Box>

        <Box marginTop={'6%'} w={'100%'} alignItems='center'>
          <Text size='sm' color='$red600' textAlign='center'>
            Pastikan nama dan pesan kamu sudah benar sebelum mengirim.
          </Text>
        </Box>

      </Box>
      </ScrollView>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({})