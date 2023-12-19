import { ActivityIndicator, Dimensions, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../Firebase'
import { config } from '../config/gluestack-ui.config'
import { useNavigation } from '@react-navigation/core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Alert } from 'react-native'
import { LogBox } from 'react-native'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons'
import { AirbnbRating } from 'react-native-ratings'
import { Header } from '../components'
import { ImageBackground } from 'react-native';
import { Box, Pressable, TextArea, ScrollView, Button, Image, Heading, Slider, Text, View, Icon, Center, VStack, HStack } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Textarea, TextareaInput } from '@gluestack-ui/themed'

export default function RatingScreen({route}) {
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const navigation = useNavigation()
  
  const [isLoading, setIsLoading] = useState(true)
  const [dataPesananCucian, setDataPesananCucian] = useState([]); // data cucian

  useEffect(() => {
      const dataPesanan = db.collection('data-pengguna').doc(auth.currentUser?.email).collection('pesanan-data').doc(namaPesanan).get().then((doc) => {
        setDataPesananCucian(doc.data())
        setIsLoading(false)
      });
    }, []);

  // const { id, nomor, status } = route.params
  const { namaPesanan, statuses } = route.params
  // var status = statuses


  const handleSubmitRating = () => {
    Alert.alert(
      "Rating Terkirim",
      "Terima kasih sudah memberi rating.",
      [
        { text: "OK", onPress: () => {
            console.log(komentar)
            db.collection('data-pengguna').doc(auth.currentUser?.email).collection('rating-data').doc(namaPesanan).set({
              id: namaPesanan,
              email: auth.currentUser?.email,
              rating: rating,
              komentar: komentar,
            })
            db.collection('data-pengguna').doc(auth.currentUser?.email).collection('pesanan-data').doc(namaPesanan).update({
              status: 3
            })
            navigation.goBack()

          }
        }
      ]
    )
  }

  const [rating, setRating] = useState(0);
  const [komentar, setKomentar] = useState("");

  LogBox.ignoreAllLogs()

  if (statuses != 2) {
    db.collection('data-pengguna').doc(auth.currentUser?.email).collection('rating-data').doc(namaPesanan).get().then((doc) => {
      setRating(doc.data().rating)
      setKomentar(doc.data().komentar)
    })
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (statuses == 3) {
    return (
      <ImageBackground
        source={require('../assets/bgrating.png')} // Ganti dengan path gambar Anda
        style={{ flex: 1 }}>
              <ScrollView>
        <Box flex={1} py={4} alignSelf={"center"}>
          <Heading pt={5} alignSelf={"center"}>{auth.currentUser?.email}</Heading>
          <Image
            source={require("../assets/logo.png")}
            mt={2}
            w="220"
            h="240"
            alt="Washwell Logo"
            mr={"3"}
          />
        </Box>
        <Box alignSelf={"center"} flex={1}>
          <Heading alignSelf={"center"}>{dataPesananCucian?.orderItems[0].jenisCuci}</Heading>
          <Text bold alignSelf={"center"}>Paket Setrika + Cuci Lengkap</Text>
          <VStack pt={10}>
            <Heading>Rate</Heading>
            <AirbnbRating 
            count={5}
            reviews={["Wahh, buruk banget", "Buruk", "Oke", "Bagus", "Bagus Banget!"]}
            defaultRating={rating}
            size={30}
            reviewSize={20}
            onFinishRating={(rating) => setRating(rating)}
            starContainerStyle={{ gap: 20 }}
            isDisabled={true}
            
            />
          </VStack>
          <VStack>
            <Heading>Komentar</Heading>
            <TextArea h={20} placeholder="Masukan Komentar" w={320} maxW="320" value={komentar} isDisabled/>
          </VStack>
        </Box>
        <Box flex={"1"}></Box>
        </ScrollView>
      </ImageBackground>
    )
  }

  return (
    <ImageBackground
      source={require('../assets/bgrating.png')} // Ganti dengan path gambar Anda
      style={{ flex: 1 }}>
            <ScrollView>
      <Box flex={1} py={4} alignSelf={"center"}>
        <Heading pt={5} alignSelf={"center"}>{auth.currentUser?.email}</Heading>
        <Image
          source={require("../assets/logo.png")}
          mt={2}
          w="220"
          h="240"
          alt="Washwell Logo"
          mr={"3"}
        />
      </Box>
      <Box alignSelf={"center"} flex={1}>
        <Heading alignSelf={"center"}>{dataPesananCucian?.orderItems[0].jenisCuci}</Heading>
        <Text bold alignSelf={"center"}>Paket Setrika + Cuci Lengkap</Text>
        <VStack pt={10}>
          <Heading>Rate</Heading>
          <AirbnbRating 
          count={5}
          reviews={["Wahh, buruk banget", "Buruk", "Oke", "Bagus", "Bagus Banget!"]}
          defaultRating={0}
          size={30}
          reviewSize={20}
          onFinishRating={(rating) => setRating(rating)}
          starContainerStyle={{ gap: 20 }}
          />
        </VStack>
        <VStack>
          <Heading>Komentar</Heading>
          <TextArea h={20} placeholder="Masukan Komentar" w={320} maxW="320" onChangeText={text => setKomentar(text)}/>
          <Button bg={"yellow.200"} mt={10} onPress={handleSubmitRating}>
            <Text bold>Kirim</Text>
          </Button>
        </VStack>
      </Box>
      <Box flex={"1"}></Box>
      </ScrollView>
    </ImageBackground>
    // <Text>
    //   s
    // </Text>
  )
}

const styles = StyleSheet.create({})