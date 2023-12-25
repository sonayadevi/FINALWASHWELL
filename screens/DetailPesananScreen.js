import { Header } from "../components";
import { ActivityIndicator, ImageBackground } from 'react-native';
import { Box, Center, HStack, Heading, Text, VStack, Image, Divider, ScrollView } from "native-base";
import { auth, db } from '../Firebase'
import { useEffect, useState } from "react";

const DetailPesanan = ({route, navigation}) => {
    const {namaPesanan} = route.params;

    // take data from firebase
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const subscriber = db
            .collection('data-pengguna')
            .doc(auth.currentUser.email)
            .collection('pesanan-data')
            .doc(namaPesanan)
            .onSnapshot((querySnapshot) => {
                const data = querySnapshot.data();
                setData(data);
                setLoading(false);
            });
        return () => subscriber();
    }
    , []);

    if (loading) {
        return <ActivityIndicator />;
    }
    console.log (data)

    // get timestamp from data
    const timestamp = data.waktuPemesanan;
    const date = timestamp.toDate();
    waktuPemesanan = date.toString();

    // cut the GMT+0700
    waktuPemesanan = waktuPemesanan.substring(0, 24);
    waktuPemesanan = waktuPemesanan.substring(0, 10) + ' | ' + waktuPemesanan.substring(16, 24);
    

    const timestamp2 = data.waktuSelesai;
    const date2 = timestamp2.toDate();
    waktuPemesananSelesai = date2.toString();

    // cut the GMT+0700
    waktuPemesananSelesai = waktuPemesananSelesai.substring(0, 24);
    waktuPemesananSelesai = waktuPemesananSelesai.substring(0, 10) + ' | ' + waktuPemesananSelesai.substring(16, 24);

    
    return (
        <ImageBackground
        source={require('../assets/bgrating.png')} 
        style={{ flex: 1 }}>
            <Header title={"PESANAN"} withBack="true" />
            <ScrollView>
                
            <Box p={4} flex={1}>
                <Box alignSelf="center" shadow={3} justifyContent="center" borderColor={"#a3a3a3"} borderWidth={2} borderRadius={10} backgroundColor={"white"} h={16} w={350}>
                    <VStack>
                        <Text paddingRight={2} paddingLeft={2}>Order Processed, Thank You for entrusing "WashWell" as your choice</Text>
                    </VStack>
                </Box>
                <Box mt={5} alignSelf="center" borderColor={"#a3a3a3"} borderWidth={2} borderRadius={10} backgroundColor={"white"} w={350}>
                    <Center>
                        <Heading paddingTop={4}>
                            {auth.currentUser.email}
                        </Heading>
                    </Center>
                    <Text p={3} fontSize={"lg"} bold>Pesanan</Text>
                    <VStack>
                        <Box alignSelf="center" shadow={3} borderColor={"#a3a3a3"} borderWidth={2} borderRadius={10} backgroundColor={"white"} w={330}>
                            <Text paddingLeft={4} paddingTop={2} fontSize={"sm"} bold>{data.orderItems[0].jenisCuci}</Text>
                            <VStack>
                                {
                                    data.orderItems
                                    .filter(item => item.quantity !== 0)
                                    .map((item, index) => (
                                        <HStack key={index} paddingTop={2} paddingLeft={4}>
                                        <Image
                                            source={require("../assets/mesincuci.png")}
                                            width={10}
                                            height={12}
                                            alt="mesin cuci"
                                        />
                                        <VStack>
                                            <Text bold paddingLeft={4}> {item.title}</Text>
                                            <Text paddingLeft={4}> {item.quantity}x</Text>
                                        </VStack>
                                        </HStack>
                                    ))
                                }

                                <Divider marginTop={2} w={290}  alignSelf="center" justifyContent="center"/>
                                <VStack>
                                    <HStack paddingTop={1}  justifyContent="space-between">
                                        <Text bold paddingLeft={5}>PENGIRIMAN</Text>
                                        <Text paddingRight={5}>{data.opsiPengiriman == 'standar' ? 'Gratis' : 'Rp 12.000'}</Text>
                                    </HStack>
                                    <HStack paddingTop={1} marginBottom={5} justifyContent="space-between">
                                        <Text bold paddingLeft={5}>TOTAL</Text>
                                        <Text paddingRight={5}>Rp {data.totalPembayaran.toLocaleString()}</Text>
                                    </HStack>
                                </VStack>
                            </VStack>
                        </Box>
                        <Box mt={5} alignSelf="center" shadow={3} borderColor={"#a3a3a3"} borderWidth={2} borderRadius={10} backgroundColor={"white"} h={16} w={330}>
                            <VStack>
                            <Text paddingLeft={4} paddingTop={1} bold fontSize={"lg"}>Metode Pembayaran</Text>
                            <Text paddingLeft={4}>{data.opsiPembayaran.toUpperCase()}</Text>
                            </VStack>
                        </Box>
                        <Box mt={5} mb={5} alignSelf="center" shadow={3} borderColor={"#a3a3a3"} borderWidth={2} borderRadius={10} backgroundColor={"white"} h={90} w={330}>
                            <VStack>
                                <HStack paddingRight={4} paddingLeft={4} paddingTop={2} justifyContent="space-between">
                                    <Text>Nomor Pesanan</Text>
                                    <Text>{namaPesanan}</Text>
                                </HStack>
                                <HStack paddingRight={4} paddingLeft={4} justifyContent="space-between">
                                    <Text>Waktu Pemesanan</Text>
                                    <Text>{waktuPemesanan}</Text>
                                </HStack>
                                <HStack paddingRight={4} paddingLeft={4} justifyContent="space-between">
                                    <Text>Waktu Pemesanan Selesai</Text>
                                    <Text>{waktuPemesananSelesai}</Text>
                                </HStack>
                            </VStack>
                        </Box>
                    </VStack>
                </Box>
            </Box>
            </ScrollView>
        </ImageBackground>
    );
};
export default DetailPesanan;