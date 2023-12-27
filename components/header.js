import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Box, HStack, Image, Heading } from "native-base";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useNavigationState } from "@react-navigation/native";


const Header = ({ title, withBack = false }) => {
  const trueGray900 = "#EBDF64";
  const navigation = useNavigation();
  const previousRoute = useNavigationState((state) => state.routes[state.index - 1]);
  return (
    <SafeAreaView>
      <StatusBar barStyle="light" backgroundColor={trueGray900} />
      <Box bg={"#EBDF64"} p={"4"}>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
            {!withBack ? (
              <>
                <Image
                  source={require("../assets/logo.png")}
                  w="12"
                  h="12"
                  alt="Washwell Logo"
                  mr={"3"}
                />
              </>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  if (navigation.canGoBack()) {
                    console.log(previousRoute.name);
                    if (navigation.canGoBack()) {
                      if (previousRoute.name === 'Berhasil') {
                        // reset all stack and go to home
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'Tabs' }],
                        });
                      } else {
                        navigation.goBack();
                      }
                    }
                  }
                }}
              >
                <Box mr={"3"}>
                  <Ionicons name="arrow-back-outline" size={32} color="black" />
                </Box>
              </TouchableOpacity>
            )}
            <Heading color={"black"}>{title}</Heading>
          </HStack>

          <HStack space={"2xl"}>
          </HStack>
        </HStack>
      </Box>
    </SafeAreaView>
  );
};

export default Header;