import React, { useState } from "react";
import { Header } from "../../components";
import { Box, Heading, VStack, FlatList, Image, Text, HStack, Button } from "native-base";
import {DataCuciBasah} from "./DataCuci";
import mesincuciimage from "../../assets/mesincuci.png";

const CuciBasahScreen = ({ navigation }) => {  //flatlist

  const [quantities, setQuantities] = useState(new Array(DataCuciBasah.length).fill(0));

  const Item = ({ item, index }) => {

    const handleIncrement = () => {
      const newQuantities = [...quantities];
      newQuantities[index]++;
      setQuantities(newQuantities);
    };

    const handleDecrement = () => {
      if (quantities[index] > 0) {
        const newQuantities = [...quantities];
        newQuantities[index]--;
        setQuantities(newQuantities);
      }
    };

    return (
      <VStack py={2} alignSelf={"center"}>
        <Box borderRadius={24} shadow={4} w={350} h={120} bg={"white"}>
          <HStack px={7} py={7}>
            <Image
              source={mesincuciimage}
              alt="Image Data"
              my={1}
              w="60px"
              h="60px"
            />
            <VStack>
              <Text px={3} bold fontSize={15}>{item.title}</Text>
              <Text color={"green.400"} px={3} bold fontSize={13}>{item.price.toLocaleString()}</Text>
              <HStack>
                <Button
                  backgroundColor={"transparent"}
                  p={1}
                  h={8}
                  w={7}
                  onPress={handleDecrement}>
                  <Text fontSize={12} paddingBottom={2} color={"black"}>-</Text>
                </Button>
                <Text
                  mt={1}
                  fontSize={12}
                  borderBottomLeftRadius={2}
                >
                {quantities[index]}
                </Text>
                <Button backgroundColor={"transparent"}
                  p={1}
                  h={8}
                  w={7}
                  onPress={handleIncrement}>
                  <Text fontSize={12} paddingBottom={2} color={"black"}>+</Text>
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </VStack>
    );
  };

  const totalItems = quantities.reduce((a, b) => a + b, 0);
  const totalPrice = quantities.reduce((total, quantity, index) => total + quantity * DataCuciBasah[index].price, 0);

  const handleOrder = () => {
    const orderItems = quantities.map((quantity, index) => ({
      ...DataCuciBasah[index],
      quantity,
      jenisCuci: 'Cuci Basah',
    }));

    navigation.navigate('Checkout', {orderItems, totalPrice, alamatTerpilih:''})
  }

  return (
    <>
      <Header title={"Cuci Basah"} withBack="True" />
      <FlatList
        data={DataCuciBasah}
        renderItem={({ item, index }) => <Item item={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <VStack py={2}> 
        <HStack paddingBottom={2} px={10} justifyContent={"space-between"}>
          <Text bold>{totalItems} Items</Text>
          <Text bold color={"green.400"}>Rp {totalPrice.toLocaleString()} </Text>
        </HStack>
        <Button bg={"#EBDF64"} alignSelf={"center"} h={12} w={350} onPress={handleOrder}>
          <Text bold>
          PESAN SEKARANG
          </Text>
        </Button>
      </VStack>
    </>
  );
};

export default CuciBasahScreen;
