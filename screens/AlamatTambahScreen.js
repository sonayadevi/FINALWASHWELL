import React,{ useEffect, useState }  from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Box, Input, Pressable, Image, Button, ButtonIcon, ButtonSpinner, ButtonText, Center, GluestackUIProvider, Text, Textarea, TextareaInput, ScrollView, InputField, SelectTrigger, SelectInput, SelectIcon, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, ChevronDownIcon, CheckboxIndicator, CheckboxLabel, CheckIcon, RadioGroup, RadioIndicator, RadioLabel} from '@gluestack-ui/themed'
import { config } from '../config/gluestack-ui.config'
import { useNavigation } from "@react-navigation/native";
import { auth, db } from '../Firebase'
import firebase from "firebase/compat/app"
import { Header } from '../components';
import { Select } from '@gluestack-ui/themed';
import { Icon } from '@gluestack-ui/themed';
import { SelectPortal } from '@gluestack-ui/themed';
import { Checkbox } from '@gluestack-ui/themed';
import { CheckboxIcon } from '@gluestack-ui/themed';
import { Radio } from '@gluestack-ui/themed';
import { RadioIcon } from '@gluestack-ui/themed';

export default function AlamatTambahScreen({route, navigation}) {
  const [kota, setKota] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [desa, setDesa] = useState('');
  const [detail, setDetail] = useState('');
  const {orderItems, totalPrice} = route.params;

  const handleKotaChange = (value) => {
    setKota(value);
  }

  const handleKecamatanChange = (value) => {
    setKecamatan(value);
  }

  const handleDesaChange = (value) => {
    setDesa(value);
  }

  const handleDetailChange = (value) => {
    setDetail(value);
  }
  
  const handleSubmit = () => {
    db.collection('data-pengguna').doc(auth.currentUser.email).collection('alamat-data').doc('alamat').update({
      alamatArray: firebase.firestore.FieldValue.arrayUnion(kota + ', ' + kecamatan + ', ' + desa + ', ' + detail)
    })

    navigation.navigate('Alamat', {orderItems, totalPrice});

  }


  return (
    <GluestackUIProvider config={config}>
        <Header title={"Pilih Alamat"} withBack="True" />
        <Box w={'100%'} pl={25} pr={25}>
            <Text fontSize={14} mt={15} mb={0}>
                Kota
            </Text>
            <Input
                variant='underlined'
                isDisabled={false}
                isReadOnly={false}
                isInvalid={false}
                mt={0}
            >
                <InputField onChangeText={handleKotaChange}></InputField>
            </Input>
            <Text fontSize={14} mt={15} mb={0}>
                Kecamatan
            </Text>
            <Input
                variant='underlined'
                isDisabled={false}
                isReadOnly={false}
                isInvalid={false}
                mt={0}
            >
                <InputField onChangeText={handleKecamatanChange}></InputField>
            </Input>
            <Text fontSize={14} mt={15} mb={0}>
                Desa
            </Text>
            <Input
                variant='underlined'
                isDisabled={false}
                isReadOnly={false}
                isInvalid={false}
                mt={0}
            >
                <InputField onChangeText={handleDesaChange}></InputField>
            </Input>
            <Text fontSize={14} mt={15} mb={0}>
                Detail
            </Text>
            <Input
                variant='underlined'
                isDisabled={false}
                isReadOnly={false}
                isInvalid={false}
                mt={0}
            >
                <InputField onChangeText={handleDetailChange}></InputField>
            </Input>


            


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
                onPress={handleSubmit}
                isDisabled={false}
                isFocusVisible={false}
                bg='$white'
            >
                <ButtonText color='$black'>
                    Submit
                </ButtonText>
            </Button>

        </Box>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({})