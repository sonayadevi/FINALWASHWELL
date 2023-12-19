import { Header } from "../components";
import { ImageBackground } from 'react-native';
import { Box, Image, Button, Text, HStack, Heading, ScrollView, VStack, Icon } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "@gluestack-ui/themed";
import { auth, db } from '../Firebase'
import { useEffect, useState } from "react";

const HomeScreen = ({ navigation }) => {

    const [dataPesananCucian, setDataPesananCucian] = useState([]); // data cucian

    // checking if firestore doc exists if not create one and set collection called 'chat-data'
    db.collection('data-pengguna').doc(auth.currentUser?.email).get().then((doc) => {
        if (doc.exists) {
        console.log("Document data:", doc.data());
        
        } else {
        // doc.data() will be undefined in this case
        db.collection('data-pengguna').doc(auth.currentUser?.email).set({
            email: auth.currentUser?.email,
            newUser: 1
        })
        db.collection('data-pengguna').doc(auth.currentUser?.email).collection('chat-data').add({
            nama: 'Admin',
            note: 'Selamat datang di WashWell Chat. Silahkan kirim pesan untuk memulai chat.'
        })
        db.collection('data-pengguna').doc(auth.currentUser?.email).collection('notification-data').add({
            id: 1,
            judul: "Selamat datang di WashWell",
            desc: "Silahkan menggunakan layanan kami dengan nyaman.",
            status: 0
        })
        db.collection('data-pengguna').doc(auth.currentUser?.email).collection('rating-data').add({
            id: 0,
            email: "admin",
            rating: 0,
            komentar: 0,
        })
        db.collection('data-pengguna').doc(auth.currentUser?.email).collection('pesanan-data').doc('pesanan').set({
            index: 1
        })
        db.collection('data-pengguna').doc(auth.currentUser?.email).collection('alamat-data').doc('alamat').set({
            alamatArray: []
        })

        console.log("No such document!");
        }
    }
    ).catch((error) => {
        console.log("Error getting document:", error);
    });
    const Cucikering = () => {
        navigation.navigate("CuciKering");
    };
    const Cucibasah = () => {
        navigation.navigate("CuciBasah");
    }
    const CuciVIP = () => {
        navigation.navigate("CuciVIP");
    }
    const CuciExpress = () => {
        navigation.navigate("CuciExpress");
    }

    const Voucher = () => {
        navigation.navigate("Voucher");
    };


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

    

    return (
        <ImageBackground
            source={require('../assets/bgrating.png')} 
            style={{ flex: 1 }}>
            <Header title={"HOME"} />
            <ScrollView>
                <Box paddingLeft={8} flex={1}>
                    <HStack marginBottom={2} justifyContent={"space-between"}>
                        <VStack>
                            <Text fontSize={15}>HALO,</Text>
                            <Heading fontSize={20}>{ auth.currentUser.email.split('@')[0] }</Heading>
                        </VStack>
                        <Image
                            source={require("../assets/logo.png")}
                            w={"100px"}
                            marginTop={"-15px"}
                            h={"100px"}
                            alt="Washwell Logo"
                            mr={"8"}
                        />
                    </HStack>
                    <Box borderRadius={14} shadow={2} w={350} h={250} backgroundColor={"white"}>
                        <VStack >
                            <HStack p={5} justifyContent={"space-between"}>
                                <Pressable onPress={Cucibasah}>
                                    <Box shadow={4} borderRadius={14} w={130} h={24} backgroundColor={"#EBDF64"}>
                                        <HStack px={5} py={5} justifyContent={"space-between"}>
                                            <Image
                                                source={require("../assets/cucibasah.png")}
                                                w={"50px"}
                                                h={"50px"}
                                                alt="cucibasah"
                                                alignSelf={"center"}

                                            />
                                            <Button ml={3} w={10} background={"#EBDF64"}>
                                                <Icon
                                                    as={<Ionicons name={'arrow-redo-circle-outline'} />}
                                                    size={8}
                                                    color={"black"}
                                                />
                                            </Button>
                                        </HStack>
                                    </Box>
                                </Pressable>
                                <Pressable onPress={Cucikering}>    
                                    <Box shadow={4} borderRadius={14} w={130} h={24} backgroundColor={"#EBDF64"}>
                                        <HStack px={4} py={5}>
                                            
                                            <Image
                                                source={require("../assets/cucikering.png")}
                                                w={"60px"}
                                                h={"50px"}
                                                alt="Washwell Logo"
                                                alignSelf={"center"}

                                            />
                                            <Button ml={2} w={10} background={"#EBDF64"} >
                                                <Icon
                                                    as={<Ionicons name={'arrow-redo-circle-outline'} />}
                                                    size={8}
                                                    color={"black"}
                                                />
                                            </Button>
                                        </HStack>
                                    </Box>
                                </Pressable>
                            </HStack>
                            <HStack px={5} justifyContent={"space-between"}>
                                <Pressable onPress={CuciVIP}>

                                    <Box shadow={4} borderRadius={14} w={130} h={24} backgroundColor={"#EBDF64"}>
                                        <HStack px={4} py={4}>
                                            <Image
                                                source={require("../assets/cucivip.png")}
                                                w={"60px"}
                                                h={"60px"}
                                                alt="Washwell Logo"
                                                alignSelf={"center"}

                                            />
                                            <Button ml={1} w={10} background={"#EBDF64"}>
                                                <Icon
                                                    as={<Ionicons name={'arrow-redo-circle-outline'} />}
                                                    size={8}
                                                    color={"black"}
                                                />
                                            </Button>
                                        </HStack>
                                    </Box>
                                </Pressable>
                                <Pressable onPress={CuciExpress}>
                                    
                                    <Box shadow={4} borderRadius={14} w={130} h={24} backgroundColor={"#EBDF64"}>
                                        <HStack px={4} py={5}>
                                            <Image
                                                source={require("../assets/express.png")}
                                                w={"60px"}
                                                h={"50px"}
                                                alt="Washwell Logo"
                                                alignSelf={"center"}
                                            />
                                            <Button ml={1} w={10} background={"#EBDF64"}>
                                                <Icon
                                                    as={<Ionicons name={'arrow-redo-circle-outline'} />}
                                                    size={8}
                                                    color={"black"}
                                                />
                                            </Button>
                                        </HStack>
                                    </Box>
                                </Pressable>
                            </HStack>
                        </VStack>
                    </Box>
                    <Box>
                        <HStack pt={10} justifyContent={"space-between"}>
                        <Heading mt={1}>STATUS PESANAN</Heading>
                        <Button onPress={Voucher} bg={"#EBDF64"} borderRadius={14} marginRight={10} h={10} w={24}>
                            <Text bold>Voucher</Text>
                        </Button>
                        </HStack>
                        <VStack>
                        {
                        dataPesananCucian
                        .filter(pesanan => pesanan.id !== "pesanan")
                        .reverse()
                        .map((pesanan, index) => (
                            <Pressable key={index} onPress={() => navigation.navigate('DetailPesanan', { namaPesanan: pesanan.id })}>
                                <Box my={3} borderRadius={14} shadow={5} w={350} h={20} backgroundColor={"white"}>
                                    <HStack py={4} px={4}>
                                    <Image
                                        source={require("../assets/cucibasah.png")}
                                        w={"40px"}
                                        h={"45px"}
                                        alt="Washwell Logo"
                                        alignSelf={"center"}
                                    />
                                    <VStack px={6}>
                                        <Text bold fontSize={"lg"}>Pesanan No.{pesanan.id.replace('pesanan#'," ")}</Text>
                                        {pesanan.status === 0 ? <Text color={"red.300"} bold fontSize={"sm"}>Pesanan Dibuat</Text> : pesanan.status === 1 ? <Text color={"yellow.300"} bold fontSize={"sm"}>Pesanan Dicuci</Text> : <Text color={"green.300"} bold fontSize={"sm"}>Sudah Selesai</Text>}
                                    </VStack>
                                    </HStack>
                                </Box>
                                </Pressable>
                        ))
                        }
                            
                        </VStack>
                    </Box>
                </Box>
            </ScrollView>
        </ImageBackground>
    );
};

export default HomeScreen;