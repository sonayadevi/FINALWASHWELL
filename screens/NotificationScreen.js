import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../Firebase'
import { Box, Button, ButtonIcon, ButtonSpinner, ButtonText, Center, GluestackUIProvider, Text, Textarea, TextareaInput, ScrollView} from '@gluestack-ui/themed'
import { config } from '../config/gluestack-ui.config'
import { useNavigation } from '@react-navigation/core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Alert } from 'react-native'
import { LogBox } from 'react-native'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons'

export default function NotificationScreen() {
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const navigation = useNavigation()

  // retrieve data from firebase and store it as state
  const [notification, setNotification] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    db.collection('data-pengguna').doc(auth.currentUser?.email).collection('notification-data').onSnapshot((snapshot) => {
      setNotification(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      })))
    })
    setLoading(false)
  }, [])

  // then map the state to the UI
  

  return (
    <GluestackUIProvider config={config}>
      <ScrollView>
      <Box h={height * 0.12} bg='$primary500' borderBottomLeftRadius={20} borderBottomRightRadius={20} alignItems='center' justifyContent='center' >
        <Box flexDirection='row' display='flex'>  
          <FontAwesomeIcon icon={faBell} size={40} color='black'/>
          <Text bold={false} size='2xl' color='black' marginTop={3} marginLeft={10}>
            Notification
          </Text>
        </Box>
      </Box>
      <Box marginVertical={10}>

      </Box>

      {/* <TouchableOpacity onPress={() => {navigation.navigate('Rating', {id: 123})}}>
        <Box marginLeft={20} marginRight={20} h={110} bg='$primary100' borderRadius={20} padding={15}>
          <Text color='black' size='2xl' bold={true}>
            #Pesanan 0001
          </Text>
          <Box flexDirection='row' display='flex' alignItems='center'>
            <FontAwesomeIcon icon={faArrowTurnUp} size={25} color='black' style={{marginLeft: 20 ,transform: [{rotate: '90deg'}]}}/>
            
            <Text color='black' size='md' marginLeft={10} paddingRight={38}>
              Laundry-mu telah selesai! Klik disini untuk memberi rating.
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
      
      */}

        {notification.map((item) => (

            item.data.id != 0 ?
            (<TouchableOpacity key={item.id} onPress={() => {navigation.navigate('Rating', {id: item.id, nomor: item.data.nomor, status: item.data.status})}}>
              <Box marginBottom={15} marginLeft={20} marginRight={20} h={110} bg='$primary100' borderRadius={20} padding={15}>
                <Text color='black' size='2xl' bold={true}>
                  {`#Pesanan ${item.data.nomor}`}
                </Text>
                <Box flexDirection='row' display='flex' alignItems='center'>
                  <FontAwesomeIcon icon={faArrowTurnUp} size={25} color='black' style={{marginLeft: 20 ,transform: [{rotate: '90deg'}]}}/>
                  <Text color='black' size='md' marginLeft={10} paddingRight={38}>
                    Laundry-mu telah selesai! Klik disini untuk memberi rating.
                  </Text>
                </Box>
              </Box>
            </TouchableOpacity>)
            :
            (<TouchableOpacity key={item.id} onPress={() => {}}>
              <Box marginLeft={20} marginRight={20} h={110} bg='$primary100' borderRadius={20} padding={15}>
                <Text color='black' size='lg' bold={true}>
                  
                  {`Halo, ${item.data.judul}`}
                </Text>
                <Box flexDirection='row' display='flex' alignItems='center'>
                  <FontAwesomeIcon icon={faArrowTurnUp} size={25} color='black' style={{marginLeft: 20 ,transform: [{rotate: '90deg'}]}}/>
                  <Text color='black' size='md' marginLeft={10} paddingRight={38}>
                    {item.data.desc}
                  </Text>
                </Box>
              </Box>
            </TouchableOpacity>)
          ))}

      </ScrollView>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({})