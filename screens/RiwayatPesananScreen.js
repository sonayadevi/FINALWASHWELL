import { Header } from "../components";
import { ImageBackground } from 'react-native';
import { Box, Image, Button, Text, HStack, Heading, ScrollView, VStack, Icon } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "@gluestack-ui/themed";
import { auth, db } from '../Firebase'
import { useEffect, useState } from "react";

const RiwayatPesananScreen = ({ route, navigation }) => {
    const [dataPesananCucian, setDataPesananCucian] = useState([]); // data cucian

    useEffect(() => {
        const unsubscribe = db.collection('data-pengguna').doc(auth.currentUser?.email).collection('pesanan-data')
          .onSnapshot(snapshot => {
            const documents = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
      
            setDataPesananCucian(documents);
          });
      
        // Clean up the listener when the component unmounts
        return () => unsubscribe();
      }, []);

    const Rating = () => {
        navigation.navigate("Rating");
    };
    return (
        <ImageBackground
            source={require('../assets/bgrating.png')} // Ganti dengan path gambar Anda
            style={{ flex: 1 }}>
            <Header title={"RIWAYAT"} />
            <ScrollView flex={1}>
                {
                    dataPesananCucian.length > 0
                    ?
                    <Box p={4} flex={1}>
                    {
                        dataPesananCucian
                        .filter(pesanan => pesanan.id !== "pesanan")
                        .reverse()
                        .map((pesanan, index) => {

                            // Convert Firestore timestamp to JavaScript Date object
                            const waktuSelesai = pesanan.waktuSelesai.toDate();

                            // Add a week to waktuSelesai
                            waktuSelesai.setDate(waktuSelesai.getDate() + 7);

                            // Format the date as 'dd-mm-yyyy'
                            const formattedDate = waktuSelesai.toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            });
                        
                        
                        
                            return (
                            <Box mt={5} key={index} alignSelf={"center"} w={350} h={170} backgroundColor={"white"} borderWidth={2} borderColor={"#a3a3a3"}>
                                <VStack>
                                    <HStack justifyContent="space-between">
                                    <Text pt={2} pl={4}>{pesanan.id.replace("pesanan#","")}</Text>
                                    <Text pt={2} pr={4} color={"red.600"}>{pesanan.status === 0 ? "Pesanan Dibuat" : pesanan.status === 1 ? "Pesanan di Proses" : "Selesai"}</Text>
                                    </HStack>
                                    <HStack paddingTop={5} paddingLeft={4}>
                                    <Image
                                        source={require("../assets/mesincuci.png")}
                                        width={"50px"}
                                        height={16}
                                        alt="mesin cuci"
                                    />
                                    <VStack>
                                        <Text fontSize={"sm"} bold paddingLeft={4}>{pesanan.orderItems[0].jenisCuci}</Text>
                                        <Text paddingLeft={4}> {pesanan.orderItems.reduce((total, item) => total + item.quantity, 0)} Produk</Text>
                                        <HStack paddingTop={1} paddingLeft={5} justifyContent="space-between" w={300}>
                                        <Button backgroundColor={"yellow.200"} h={7} w={20} onPress={() => {navigation.navigate("DetailPesanan", {namaPesanan: pesanan.id})}} >
                                            <Text color={"black"} mt={-2}>Detail</Text>
                                        </Button>
                                        <Text paddingRight={8} bold>Rp {pesanan.totalPembayaran.toLocaleString()}</Text>
                                        </HStack>
                                    </VStack>
                                    </HStack>
                                    {pesanan.status === 2
                                    ?
                                        <HStack paddingTop={2} paddingLeft={5} justifyContent="space-between" w={335}>
                                            <Text fontSize={12}>Rating produk sebelum tanggal {formattedDate.replaceAll('/', '-')}</Text>
                                            <Button backgroundColor={"yellow.200"} h={7} w={20} onPress={() => {navigation.navigate('Rating', {namaPesanan: pesanan.id, statuses: pesanan.status})}} >
                                                <Text color={"black"} mt={-2}>Nilai</Text>
                                            </Button>
                                        </HStack>
                                    : pesanan.status === 3
                                        ?  
                                        <HStack paddingTop={2} paddingLeft={5} justifyContent="space-between" w={335}>
                                            <Text fontSize={12}>Pesanan telah diberi nilai</Text>
                                            <Button backgroundColor={"yellow.200"} h={7} w={20} onPress={() => {navigation.navigate('Rating', {namaPesanan: pesanan.id, statuses: pesanan.status})}} >
                                                <Text color={"black"} mt={-2}>Lihat</Text>
                                            </Button>
                                        </HStack>
                                        : null
                                    }
                                </VStack>
                            </Box>
                            )
                            })   
                        }
                    </Box>
                    :
                    <Box flex={1} h={700} justifyContent="center" alignItems="center">
                        <Text textAlign="center" fontSize="xl">Belum ada Pesanan</Text>
                    </Box>
                }
            </ScrollView>
        </ImageBackground>
    );
};

export default RiwayatPesananScreen;