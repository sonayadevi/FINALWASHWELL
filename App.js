import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
import NotificationScreen from './screens/NotificationScreen';
import RatingScreen from './screens/RatingScreen';
import SplashScreen from './screens/SplashScreen';
import AfterSplashScreen from './screens/AfterSplashScreen';
import RegisterScreen from './screens/RegisterScreen';
import { NativeBaseProvider } from 'native-base';
import CuciKeringScreen from './screens/CuciScreens/CuciKeringScreen';
import CuciBasahScreen from './screens/CuciScreens/CuciBasahScreen';
import CuciVIPScreen from './screens/CuciScreens/CuciVIPScreen';
import CuciExpressScreen from './screens/CuciScreens/CuciExpressScreen';
import VoucherScreen from './screens/VoucherScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import AlamatScreen from './screens/AlamatScreen';
import AlamatTambahScreen from './screens/AlamatTambahScreen';
import CheckoutBerhasilScreen from './screens/CheckoutBerhasilScreen';
import DetailPesanan from './screens/DetailPesananScreen';
import PesananScreen from './screens/PesananScreen';
import RiwayatPesananScreen from './screens/RiwayatPesananScreen';
import ProfileScreen from './screens/ProfileScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const noHead = { headerShown: false };

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Pesanan":
              iconName = "cart";
              break;
            case "Riwayat":
              iconName = "time";
              break;
            case "Chat":
              iconName = "chatbubble-ellipses";
              break;
            case "Profile":
              iconName = "person-circle-outline";
              break;
          }
          return (
            <Ionicons
              name={iconName}
              size={28}
              color={focused ? "black" : color}
            />
          );
        },
        tabBarIconStyle: { marginTop: 5 },
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
          backgroundColor: 'white',
        },
        tabBarLabel: ({ children, color, focused }) => {
          return (
            <Text color={focused ? "black" : color} mb={2}>
              {children}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={noHead} />
      <Tab.Screen name="Pesanan" component={PesananScreen} options={noHead} />
      <Tab.Screen name="Riwayat" component={RiwayatPesananScreen} options={noHead} />
      <Tab.Screen name="Chat" component={ChatScreen} options={noHead} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={noHead} />
    </Tab.Navigator>
  );
};


export default function App() {
  return (
    <NativeBaseProvider>

      <NavigationContainer >
        <Stack.Navigator >
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AfterSplash" component={AfterSplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="Rating" component={RatingScreen} options={{ headerShown: false, animation: 'slide_from_right'}}/>
          <Stack.Screen name="CuciBasah" component={CuciBasahScreen} options={{ headerShown: false, animation: 'slide_from_right'}} />
          <Stack.Screen name="CuciKering" component={CuciKeringScreen} options={{ headerShown: false, animation: 'slide_from_right'}} />
          <Stack.Screen name="CuciExpress" component={CuciExpressScreen} options={{ headerShown: false, animation: 'slide_from_right'}} />
          <Stack.Screen name="CuciVIP" component={CuciVIPScreen} options={{ headerShown: false, animation: 'slide_from_right'}} />
          <Stack.Screen name="Voucher" component={VoucherScreen} options={{ headerShown: false, animation: 'slide_from_right'}} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false, animation: 'slide_from_right'}} />
          <Stack.Screen name="Alamat" component={AlamatScreen} options={{ headerShown: false, animation: 'slide_from_right'}} />
          <Stack.Screen name="TambahAlamat" component={AlamatTambahScreen} options={{ headerShown: false, animation: 'slide_from_right'}} />
          <Stack.Screen name="Berhasil" component={CheckoutBerhasilScreen} options={{ headerShown: false, animation: 'slide_from_right'}} />
          <Stack.Screen name="DetailPesanan" component={DetailPesanan} options={{ headerShown: false, animation: 'slide_from_right'}} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>


    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
