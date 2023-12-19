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
import * as ImagePicker from 'expo-image-picker';
import firebase from "firebase/compat/app"


export default function CheckoutScreen({route, navigation}) {
  const {orderItems, totalPrice, alamatTerpilih} = route.params;
  
  const voucherDigunakan = route.params?.voucherDigunakan;
  const [paymentOption, setPaymentOption] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('gratis');
  const [gambarBuktiPembayaran, setGambarBuktiPembayaran] = useState('');
  const [nama, setNama] = useState('');

  const handlePaymentOptionChange = (value) => {
    setPaymentOption(value);
  };

  const handleDeliveryOptionChange = (value) => {
    setDeliveryOption(value);
  };

  var gambarBuktis = gambarBuktiPembayaran ? {uri: gambarBuktiPembayaran} : require('../assets/logo_washwell.png');

  const handleUploadBuktiPembayaran = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
        // create a blob
        const response = await fetch(result.uri);
        const blob = await response.blob();

        // upload file to firebase storage
        const ref = firebase.storage().ref().child(`images/${Date.now()}`);
        const snapshot = await ref.put(blob);

        // get download url
        const downloadURL = await snapshot.ref.getDownloadURL();

        // save download url to firestore
        // await db.collection('images').add({
        //     url: downloadURL,
        //     // add other fields as necessary
        // });
        console.log(downloadURL)

        setGambarBuktiPembayaran(downloadURL);

        console.log('Upload successful');
    }
  }

  handleVoucher = () => {
    navigation.navigate('Voucher', {fromHome: false, orderItems, totalPrice, alamatTerpilih});
  }

  handleCheckout  = async () => {

    // check all fields are filled
    if (alamatTerpilih === '') {
      alert('Harap pilih alamat terlebih dahulu');
      return;
    }

    if (paymentOption === '') {
        alert('Harap pilih metode pembayaran terlebih dahulu');
        return;
    }

    if (gambarBuktiPembayaran === '') {
        alert('Harap upload bukti pembayaran terlebih dahulu');
        return;
    }

    // store order data to firestore
    const index = await db.collection('data-pengguna').doc(auth.currentUser.email).collection('pesanan-data').doc('pesanan').get();

    console.log(index.data().index)

    let date = new Date();
    date.setDate(date.getDate() + 2); // add 2 days to the current date

    let firestoreTimestamp = firebase.firestore.Timestamp.fromDate(date);
    
    // i want nama pesanan with #0001 format
    const namaPesanan = 'pesanan#' + index.data().index.toString().padStart(4, '0');

    db.collection('data-pengguna').doc(auth.currentUser.email).collection('pesanan-data').doc(namaPesanan.toString()).set({
        jenisCuci: orderItems[0].jenisCuci,
        opsiPembayaran: paymentOption,
        opsiPengiriman: deliveryOption,
        status: 0,
        "totalPembayaran": (totalPrice + (deliveryOption === 'gratis' ? 0 : 12000) - (voucherDigunakan ? 10000 : 0)),
        "alamatPengiriman": alamatTerpilih,
        "waktuPemesanan": firebase.firestore.FieldValue.serverTimestamp(),
        "waktuSelesai": firestoreTimestamp,
        "buktiPembayaran": gambarBuktiPembayaran,
        orderItems: orderItems,
        nama: nama,
    });

    // if success, increment index
    db.collection('data-pengguna').doc(auth.currentUser.email).collection('pesanan-data').doc('pesanan').update({
        index: firebase.firestore.FieldValue.increment(1)
    });

    // go to order complete screen
    // navigation.replace('Berhasil', {namaPesanan: namaPesanan});
    navigation.navigate('Berhasil', {namaPesanan: namaPesanan});


    // db.collection('data-pengguna').doc(auth.currentUser.email).collection('pesanan-data').doc('order').set({
    //     orderItems: orderItems,
    //     totalPrice: totalPrice,
    //     alamatTerpilih: alamatTerpilih,
    //     paymentOption: paymentOption,
    //     gambarBuktiPembayaran: gambarBuktiPembayaran,
    //     nama: nama,
    //     status: 'Menunggu Konfirmasi'
    // })
    

  }


  console.log(voucherDigunakan + ' voucher digunakan')

  return (
    <GluestackUIProvider config={config}>
        <Header title={"Checkout"} withBack="True" />
        <ScrollView>
            <Box w={'100%'} pl={25} pr={25}>
                <Text fontSize={18} mt={20} bold>
                    Alamat Pengiriman
                </Text>
                <Text fontSize={14} mt={15} mb={0}>
                    Nama Lengkap
                </Text>
                <Input
                    variant='underlined'
                    isDisabled={false}
                    isReadOnly={false}
                    isInvalid={false}
                    mt={0}
                >
                    <InputField onChangeText={() => {}}></InputField>
                </Input>

                <Button
                    mt={15}   
                    variant='outline'
                    borderColor='$black'
                    rounded={10}
                    onPress={() => {navigation.navigate('Alamat', {orderItems, totalPrice})}}
                    isDisabled={false}
                    isFocusVisible={false}
                    action='primary'
                >
                    <ButtonText color='$black'>
                        Pilih Alamat
                    </ButtonText>
                </Button>

                <Text fontSize={14} mt={15} mb={0}>
                    Alamat
                </Text>
                <Input
                    variant='underlined'
                    isDisabled={false}
                    isReadOnly={true}
                    isInvalid={false}
                    mt={0}
                >
                    <InputField placeholder='Pilih alamatmu' onChangeText={() => {}}>
                        <Text>
                            {alamatTerpilih}
                        </Text>
                    </InputField>
                </Input>

                <Text fontSize={14} mt={15} mb={0}>
                    Opsi Pengiriman
                </Text>
                  <Select onValueChange={handleDeliveryOptionChange}>
                    <SelectTrigger variant="underlined" size="md">
                        <SelectInput placeholder="Pilih opsi pengiriman" />
                        <SelectIcon mr="$3">
                        <Icon as={ChevronDownIcon} />
                        </SelectIcon>
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="Pengiriman Gratis" value="gratis" />
                        <SelectItem label="Pengiriman Standar (+ Rp 12.000)" value="standar" />
                        </SelectContent>
                    </SelectPortal>
                </Select>

                <Text fontSize={14} mt={15} mb={0}>
                    Catatan
                </Text>
                <Input
                    variant='underlined'
                    isDisabled={false}
                    isReadOnly={false}
                    isInvalid={false}
                    mt={0}
                >
                    <InputField onChangeText={() => {}}></InputField>
                </Input>

                <Text fontSize={14} mt={15} mb={0}>
                    Opsi Pembayaran
                </Text>
                <Select onValueChange={handlePaymentOptionChange}>
                    <SelectTrigger variant="underlined" size="md">
                        <SelectInput placeholder="Pilih metode pembayaran" />
                        <SelectIcon mr="$3">
                        <Icon as={ChevronDownIcon} />
                        </SelectIcon>
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="BCA (1234567890)" value="bca" />
                        <SelectItem label="BRI (9876543210)" value="bri" />
                        </SelectContent>
                    </SelectPortal>
                </Select>

                <Button
                    mt={15}   
                    variant='outline'
                    borderColor='$black'
                    rounded={10}
                    onPress={handleUploadBuktiPembayaran}
                    isDisabled={false}
                    isFocusVisible={false}
                    action='primary'
                >
                    <ButtonText color='$black'>
                        Upload bukti pembayaran
                    </ButtonText>
                </Button>

                <Image
                    alignSelf='center'
                    size="2xl"
                    source={gambarBuktis}
                    mt={10}
                />

                <Button
                    mt={15}   
                    variant='outline'
                    borderColor='$black'
                    rounded={10}
                    onPress={handleVoucher}
                    isDisabled={false}
                    isFocusVisible={false}
                    action='primary'
                >
                    <ButtonText color='$black'>
                        Voucher
                    </ButtonText>
                </Button>

                

            </Box>
            
            <Box
                mt={30}
                borderTopLeftRadius={20}
                borderTopRightRadius={20}
                bg="$primary500"
                width={'90%'}
                height={200 + (voucherDigunakan ? 40 : 0)}
                alignSelf='center'
                p={25}
            >   
                <Box flexDirection='row' justifyContent='space-between'>
                    <Text>
                        Sub-total
                    </Text>
                    <Text color='$black' bold>
                      Rp {totalPrice.toLocaleString()}
                    </Text>
                </Box>
                <Box mt={15} flexDirection='row' justifyContent='space-between'>
                    <Text>
                        Biaya Pengiriman
                    </Text>
                    <Text color='$black' bold>
                        {deliveryOption === 'gratis' ? 'Rp 0' : 'Rp 12.000'}
                    </Text>
                </Box>
                {
                  voucherDigunakan ? (
                    <Box mt={15} flexDirection='row' justifyContent='space-between'>
                        <Text bold={false}>
                            Voucher
                        </Text>
                        <Text color='$black' bold>
                            - Rp 10.000
                        </Text>
                    </Box>
                  ) : (
                    <></>
                  )
                }
                <Box mt={35} flexDirection='row' justifyContent='space-between'>
                    <Text color='$black' bold>
                        Total Pembayaran
                    </Text>
                    <Text color='$black' bold>
                      
                      Rp {(totalPrice + (deliveryOption === 'gratis' ? 0 : 12000) - (voucherDigunakan ? 10000 : 0)).toLocaleString()}
                    </Text>
                </Box>

                <Button
                    mt={15}   
                    mb={15}
                    variant='solid'
                    rounded={10}
                    onPress={handleCheckout}
                    isDisabled={false}
                    isFocusVisible={false}
                    bg='$white'
                >
                    <ButtonText color='$black'>
                        Checkout
                    </ButtonText>
                </Button>

            </Box>
        </ScrollView>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({})