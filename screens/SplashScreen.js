import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      // Redirect to the main screen or any other screen after the splash screen duration
      navigation.navigate("AfterSplash"); // Ganti "MainScreen" dengan nama screen tujuan Anda
    }, 3000); // 10000 milidetik (10 detik) adalah durasi tampilan splash screen
  }, []);

  return (
    <View style={styles.splashScreen}>
      <Image
        style={styles.image1Icon}
        resizeMode="cover"
        source={require("../assets/logo_washwell.png")}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1, // Mengatur flex menjadi 1
    justifyContent: 'center', // Mengatur posisi menjadi di tengah secara vertikal
    alignItems: 'center', // Mengatur posisi menjadi di tengah secara horizontal
    backgroundColor: '#fff', // Mengatur warna background menjadi putih
  },
  image1Icon: {
    position: 'absolute',
    width: 300, // Mengatur gambar menjadi penuh di kiri dan kanan serta ada di bagian atas tanpa batas
    height: 300,
    resizeMode: 'contain', // Mengatur gambar agar sesuai dengan ukuran yang diinginkan

  },
});

export default SplashScreen;
