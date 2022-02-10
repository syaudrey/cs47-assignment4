import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import millisToMinuteSeconds from "./utils/millisToMinuteSeconds";
import Colors from "./Themes/colors";
import Images from "./Themes/images";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Song({ index, cover, title, artist, album, duration, external_url, preview_url }) {

  const navigation = useNavigation();

  return (
    <Pressable onPress={() => {navigation.navigate("Details", {url: external_url})}}>
      <View style={styles.container}>
        
        <View style={styles.index}>
          <Pressable onPress={() => {navigation.navigate("Preview", {url: preview_url})}}>
            <Ionicons name="play-circle" size={16} color={Colors.spotify} />
          </Pressable>
        </View>

        <View style={styles.cover}>
          <Image source={{uri: cover}} style={styles.cover_image}/>
        </View>

        <View style={styles.track}>
          <Text style={styles.text} numberOfLines={1}>{ title }</Text>
          <Text style={styles.subtext} numberOfLines={1}>{ artist }</Text>
        </View>

        <View style={styles.album}>
          <Text style={styles.text} numberOfLines={1}>{ album }</Text>
        </View>

        <View style={styles.duration}>
          <Text style={styles.subtext}>{ millisToMinuteSeconds(duration) }</Text>
        </View>
        
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: Colors.background,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 67,
    padding: '3%',
  },

  index: {
    width: '5%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 2,
  },

  cover: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  cover_image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },

  track: {
    width: '36%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '2%',
  },

  album: {
    width: '36%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '2%',
  },

  duration: {
    width: '8%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  text: {
    color: 'white',
    fontSize: 12,
  },

  subtext: {
    color: 'grey',
    fontSize: 12,
  },

});
