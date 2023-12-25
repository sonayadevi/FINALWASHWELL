import { Header } from "../components";
import { ImageBackground } from 'react-native';
import { Box, Image, Button, Text, HStack, Heading, ScrollView, VStack, Icon } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "@gluestack-ui/themed";
import { auth, db } from '../Firebase'
import { useEffect, useState } from "react";
import { CommonActions } from "@react-navigation/native";

const ProfileScreen = ({navigation}) => {

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



    return (
      <ImageBackground
      source={require('../assets/bgrating.png')} 
      style={{ flex: 1 }}>
          <Header title={"Profile"} />

            <Box p={4} flex={1} alignItems={'center'} justifyContent={'center'}>

            <Heading>
                Logged on as 
            </Heading>
            <Text>
                {auth.currentUser?.email}
            </Text>

            <Button onPress={() => {
                    auth.signOut();
                    navigation.dispatch(
                        CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'AfterSplash' },
                        ],
                        })
                    );}} mt={4} colorScheme="danger">
                <Text bold={false} color="white">
                    Logout
                </Text>
            </Button>

            </Box>

          
        </ImageBackground>
    );
};

export default ProfileScreen;