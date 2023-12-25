import { Header } from "../components";
import { ImageBackground } from 'react-native';
import { Box, Button, Heading, ScrollView, VStack, Text } from "native-base";
import { db, auth} from "../Firebase";
import { useState } from "react";

const VoucherScreen = ({ route, navigation }) => {

    const fromHome = route.params?.fromHome;
    // const { orderItems, totalPrice, alamatTerpilih } = route.params?;
    const orderItems = route.params?.orderItems;
    const totalPrice = route.params?.totalPrice;
    const alamatTerpilih = route.params?.alamatTerpilih;

    
    const [newUser, setNewUser] = useState(false);

    if (!fromHome) {
        db.collection('data-pengguna').doc(auth.currentUser?.email).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data().newUser);
                if (doc.data().newUser === 1) {
                    setNewUser(true);
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        ).catch((error) => {
            console.log("Error getting document:", error);
        });


        console.log(newUser)
            
    }

    handleUseVoucher = () => {
        db.collection('data-pengguna').doc(auth.currentUser?.email).update({
            newUser: 0
        })
        .then(() => {
            console.log("Document successfully updated!");
            setNewUser(false);
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

        navigation.navigate("Checkout", { orderItems, totalPrice, alamatTerpilih, voucherDigunakan: true  })
        
    }

    return (
        <>
            <Header title={"VOUCHER"} withBack="true" />
            <ScrollView alignSelf={"center"} py={8}>
                <Box
                    shadow={4}
                    w={350}
                    h={120}
                    borderRadius={14}
                    backgroundColor={"white"}
                >
                    <ImageBackground source={require('../assets/voucher.png')} style={{ width: 320, height: 100, alignSelf: "center", marginTop: 10 }}>
                        <VStack px={5} py={2}>
                            <Heading fontSize={14}>GRATIS ONGKIR</Heading>
                            <Text fontSize={12} bold> s/d 10.000</Text>

                            {
                                newUser ? (
                                    
                                        (totalPrice > 10000) ? (
                                            <Button onPress={handleUseVoucher} my={1} borderRadius={14} h={7} bg={"white"} w={16}>
                                                <Text bold fontSize={10} mt={-1}>Klaim</Text>
                                            </Button>
                                        )
                                        :
                                        (
                                            <Button my={1} borderRadius={14} h={8} bg={"amber.100"} w={40} disabled>
                                                <Text bold fontSize={10} mt={-1}>Minimal pesanan Rp 10.000</Text>
                                            </Button>
                                        )
                                    

                                )
                                :
                                (
                                    <Button my={1} borderRadius={14} h={7} bg={"amber.100"} w={32} disabled>
                                        <Text bold fontSize={10} mt={-1}>Tidak Dapat Klaim</Text>
                                    </Button>
                                )

                            }
                            
                            <Text fontSize={10} bold> Berlaku hanya untuk pengguna baru</Text>
                        </VStack>
                    </ImageBackground>
                </Box>
                {/* <Box
                my={10}
                    shadow={4}
                    w={350}
                    h={120}
                    borderRadius={14}
                    backgroundColor={"white"}
                >
                    <ImageBackground source={require('../assets/voucher.png')} style={{ width: 320, height: 100, alignSelf: "center", marginTop: 10 }}>
                        <VStack px={5} py={2}>
                            <Heading fontSize={14}>GRATIS ONGKIR</Heading>
                            <Text fontSize={12} bold> s/d 10.000</Text>
                            <Button my={1} borderRadius={14} h={7} bg={"white"} w={16}>
                                <Text bold fontSize={10} mt={-1}>klaim</Text>
                            </Button>
                            <Text fontSize={10} bold> berlaku hanya hari ini</Text>
                        </VStack>
                    </ImageBackground>
                </Box> */}
            </ScrollView>
        </>
    );
};

export default VoucherScreen;