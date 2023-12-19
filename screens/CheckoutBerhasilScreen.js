import React,{ useEffect, useState }  from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Box, Input, Pressable, Image, Button, ButtonIcon, ButtonSpinner, ButtonText, Center, GluestackUIProvider, Text, Textarea, TextareaInput, ScrollView, InputField, SelectTrigger, SelectInput, SelectIcon, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, ChevronDownIcon} from '@gluestack-ui/themed'
import { config } from '../config/gluestack-ui.config'
import { useNavigation } from "@react-navigation/native";
import { auth, db } from '../Firebase'
import { Header } from '../components';
import { Select } from '@gluestack-ui/themed';
import { Icon } from '@gluestack-ui/themed';
import { SelectPortal } from '@gluestack-ui/themed';
import firebase from "firebase/compat/app"

export default function CheckoutBerhasilScreen({route, navigation}) {

  const {namaPesanan} = route.params;
  

  const handleLihatDetailPesanan = () => {
    navigation.navigate('DetailPesanan', {namaPesanan});
  }


  return (
    <GluestackUIProvider config={config}>
        <Header title={"Checkout Berhasil"} withBack="True" />
        <Box w={'100%'} h={'100%'} >
            <Center flex={1}>
                <Image
                  size="xl"
                  source={
                    require('../assets/berhasil.png')
                  }
                  
                />
                <Text mt={20} fontSize={20} bold>
                    Pesanan Sukses 
                </Text>
                <Text fontSize={14} mt={15} mb={0}>
                    Bajumu sedang berada dalam antre an cuci baju!
                </Text>
                <Text fontSize={14} mt={0} mb={0}>
                    Nomor pesanan: {namaPesanan}
                </Text>
            </Center>
        </Box>
        <Box
            position='absolute'
            bottom={0}
            mt={30}
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            bg="$primary500"
            width={'90%'}
            height={90}
            alignSelf='center'
            p={25}
        >   
            <Button
                mt={5}   
                mb={15}
                variant='solid'
                rounded={10}
                onPress={handleLihatDetailPesanan}
                isDisabled={false}
                isFocusVisible={false}
                bg='$white'
            >
                <ButtonText color='$black'>
                    Lihat Detail Pesanan
                </ButtonText>
            </Button>

        </Box>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({})