import * as React from "react";
import { Dimensions, StyleSheet, View } from 'react-native'
import { Box, Image, Button, ButtonIcon, ButtonSpinner, ButtonText, Center, GluestackUIProvider, Text, Textarea, TextareaInput, ScrollView} from '@gluestack-ui/themed'
import { config } from '../config/gluestack-ui.config'
import { useNavigation } from "@react-navigation/native";

const AfterSplashScreen = () => {

  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const navigation = useNavigation();

  return (
    <GluestackUIProvider config={config}>
      {/* Create centered logo, and with 2 button below it */}

      <Box h={'100%'} bg='#fff' alignItems='center' justifyContent='center'>
          <Image
            size="2xl"
            source={
              require('../assets/logo_washwell.png')
            }
          />
          <Button
            size="lg"
            width={width * 0.5}
            bg="$primary500"
            color="$primary900"
            
            marginTop={30}
            rounded={10}
            onPress={() => navigation.navigate('Register')}
          >
            <ButtonText
              color="$black"
            >
              Create Account
            </ButtonText>
          </Button>

          <Button
            size="lg"
            width={width * 0.5}
            bg="$white"
            color="$primary900"
            shadowOffset={{ width: 0, height: 10 }}
            borderColor="$black"
            borderWidth={0.2}
            isHovered={true}
            marginTop={10}
            rounded={5}
            onPress={() => navigation.navigate('Login')}
          >
            <ButtonText
              color="$black"
            >
              Login
            </ButtonText>
          </Button>
      </Box>

    </GluestackUIProvider>
    
  );
};

const styles = StyleSheet.create({
  image1Icon: {
    position: 'absolute',
    width: 300, // Mengatur gambar menjadi penuh di kiri dan kanan serta ada di bagian atas tanpa batas
    height: 300,
    resizeMode: 'contain', // Mengatur gambar agar sesuai dengan ukuran yang diinginkan
  },
});




export default AfterSplashScreen;
