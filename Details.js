import { StyleSheet, Text, SafeAreaView, Pressable, Image, View, FlatList } from "react-native";
import Colors from "./Themes/colors";
import Images from "./Themes/images";
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

export default function Details({ route }) {

  const link = route.params;

  return (
	<WebView source={{ uri: link.url }} />
  )
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

})