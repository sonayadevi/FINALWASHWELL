import React,{ useEffect, useState }  from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Box, Input, Pressable, Image, Button, ButtonIcon, ButtonSpinner, ButtonText, Center, GluestackUIProvider, Text, Textarea, TextareaInput, ScrollView, InputField, SelectTrigger, SelectInput, SelectIcon, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, ChevronDownIcon, CheckboxIndicator, CheckboxLabel, CheckIcon, RadioGroup, RadioIndicator, RadioLabel} from '@gluestack-ui/themed'
import { config } from '../config/gluestack-ui.config'
import { useNavigation } from "@react-navigation/native";
import { auth, db } from '../Firebase'
import { Header } from '../components';
import { Select } from '@gluestack-ui/themed';
import { Icon } from '@gluestack-ui/themed';
import { SelectPortal } from '@gluestack-ui/themed';
import { Checkbox } from '@gluestack-ui/themed';
import { CheckboxIcon } from '@gluestack-ui/themed';
import { Radio } from '@gluestack-ui/themed';
import { RadioIcon } from '@gluestack-ui/themed';
import { useFocusEffect } from '@react-navigation/native';

export default function AlamatScreen({route, navigation}) {
  const [data, setData] = useState([]);
  const {orderItems, totalPrice} = route.params;


  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const data = await db.collection('data-pengguna').doc(auth.currentUser.email).collection('alamat-data').doc('alamat').get();
        setData(data.data().alamatArray);
      };

      fetchData();

      return () => setData([]); // clean up function
    }, [])
  );
  
  const [alamatTerpilih, setAlamatTerpilih] = useState();
  handleSubmit = () => {
    navigation.navigate('Checkout', {orderItems, totalPrice, alamatTerpilih});
  }

  const handleAlamatTerpilihChange = (newValue) => {
    setAlamatTerpilih(newValue);
  };



  return (
    <GluestackUIProvider config={config} >
        <Header title={"Pilih Alamat"} withBack="True" />
        <ScrollView>
            <Box w={'100%'} pl={25} pr={25}>
                <Text mt={20}>
                    Pilih Alamat:
                </Text>

                
                <RadioGroup value={alamatTerpilih} onChange={handleAlamatTerpilihChange}>
                {data.map((item) => (
                  <Radio mt={10} size="md" isInvalid={false} isDisabled={false} value={item}>
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CheckIcon} strokeWidth={1} />
                    </RadioIndicator>
                    <RadioLabel>{item}</RadioLabel>
                  </Radio>
                ))}
                </RadioGroup>
      
                <Button
                    mt={15}   
                    variant='outline'
                    borderColor='$black'
                    rounded={10}
                    onPress={() => {navigation.navigate('TambahAlamat', {orderItems, totalPrice})}}
                    isDisabled={false}
                    isFocusVisible={false}
                    action='primary'
                >
                    <ButtonText color='$black'>
                        Tambah Alamat
                    </ButtonText>
                </Button>
            </Box>


        </ScrollView>
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