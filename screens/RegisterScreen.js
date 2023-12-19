import React,{ useEffect, useState }  from 'react'
import { Alert, Dimensions, StyleSheet, View } from 'react-native'
import { Box, Input, Pressable, Image, Button, ButtonIcon, ButtonSpinner, ButtonText, Center, GluestackUIProvider, Text, Textarea, TextareaInput, ScrollView, InputField} from '@gluestack-ui/themed'
import { config } from '../config/gluestack-ui.config'
import { useNavigation } from "@react-navigation/native";
import { auth, db } from '../Firebase'

export default function RegisterScreen() {
  

  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister =  () => {
    console.log (email, password, confirmPassword)
    console.log(password != confirmPassword)
    if (password !== confirmPassword ) {
      alert("Password don't match")
    } else {
      auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        console.log(user)
        // checking if firestore doc exists if not create one and set collection called 'chat-data'
       
        navigation.replace('Tabs')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        Alert.alert(
          "Error",
          errorMessage,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
        
        // ..
      });
    }

  }

  return (
    <GluestackUIProvider config={config}>
        <Box h={'100%'} bg='#fff' alignItems='center' justifyContent='center' pl={40} pr={40}>
            <Image
                size="2xl"
                source={
                require('../assets/logo_washwell_notext.png')
                }
            />

          <Box w={'80%'} h={height * 0.05} flexDirection='row' justifyContent='space-between' alignItems='center'>

            <Pressable
              onPress={() => navigation.navigate('Login')}
              h={'100%'}              
              justifyContent='center'
            >
              <Text color='$black' fontSize={20} fontWeight={500}>LOGIN</Text>
            </Pressable>
            <Text color='$primary500' fontSize={20} fontWeight={600}>REGISTER</Text>

          </Box>

          <Input
            variant='underlined'
            size='md'
            w={'80%'}
            isDisabled={false}
            isReadOnly={false}
            isInvalid={false}
            marginTop={20}
          >
            <InputField placeholder='EMAIL' value={email} onChangeText={(text) => setEmail(text)}>
            </InputField>
          
          </Input>
          <Input
            variant='underlined'
            size='md'
            w={'80%'}
            isDisabled={false}
            isReadOnly={false}
            isInvalid={false}
            marginTop={40}
            
          >
            <InputField type='password' placeholder='PASSWORD' value={password} onChangeText={(text) => setPassword (text)}>
            </InputField>
          
          </Input>
          <Input
            variant='underlined'
            size='md'
            w={'80%'}
            isDisabled={false}
            isReadOnly={false}
            isInvalid={false}
            marginTop={40}
            
          >
            <InputField type='password' placeholder='CONFIRM PASSWORD' value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)}>
            </InputField>
          
          </Input>

          <Button
            size="lg"
            width={'80%'}
            bg="$primary500"
            color="$primary900"
            isHovered={true}
            marginTop={40}
            marginBottom={50}
            rounded={10}
            onPress={handleRegister}
          >
            <ButtonText
              color="$black"
            >
              Register
            </ButtonText>
          </Button>
        </Box>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({})