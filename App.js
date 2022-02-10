import 'react-native-gesture-handler';
import { StyleSheet, Text, SafeAreaView, Pressable, Image, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors";
import Images from "./Themes/images";
import Song from './Song';
import Details from './Details';
import Preview from './Preview';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

export default function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint, this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      myTopTracks(setTracks, token);
      // albumTracks(ALBUM_ID, setTracks, token);
    }
  }, [token]);


  function AuthButton() {
  	return (
  	  <Pressable onPress={promptAsync} style={styles.button}>
  		<Image source={Images.spotify} style={styles.button_logo} />
	      <Text style={styles.button_text}>CONNECT WITH SPOTIFY</Text>
	  </Pressable>
  	);
  }

  const renderItem = (item, index) => (
  	<Song 
  	  index={index+1}
  	  cover={item.album.images[0].url}
  	  title={item.name}
  	  artist={item.artists[0].name}
  	  album={item.album.name}
  	  duration={item.duration_ms}
  	  external_url={item.external_urls.spotify}
  	  preview_url={item.preview_url} />
  );

  function SongList() {
  	return (
	  <View style={styles.songlist}>
	    <View style={styles.header}>
	      <Image source={Images.spotify} style={styles.header_logo} />
	      <Text style={styles.header_text}>My Top Tracks</Text>
	    </View>
		<View style={styles.details}>
	      <FlatList
	        data={tracks} 
	        renderItem={({item, index}) => renderItem(item, index)} 
	        keyExtractor={(item) => item.id}
	      />
	    </View>
	  </View>
    );
  }

  let contentDisplayed = null;
  if (token) {
  	contentDisplayed = <SongList/>
  } else {
  	contentDisplayed = <AuthButton/>
  }

  function Main() {
  	return (
  	  <SafeAreaView style={styles.container}>
        {contentDisplayed}
      </SafeAreaView>
  	)
  }

  const Stack = createStackNavigator();

  return (
  	<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
        <Stack.Screen name="Details" component={Details} options={{headerStyle: {backgroundColor: Colors.background}, headerTitleStyle: {color: 'white'}}} />
        <Stack.Screen name="Preview" component={Preview} options={{headerStyle: {backgroundColor: Colors.background}, headerTitleStyle: {color: 'white'}}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },


  button: {
    backgroundColor: Colors.spotify,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  	height: '6%',
  	padding: '3%',
  	borderRadius: 9999,
  },

  button_logo: {
  	width: '6%',
  	resizeMode: 'contain',
  	marginRight: '2%',
  },

  button_text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  songlist: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  header_logo: {
    width: '8%',
    resizeMode: 'contain',
    marginRight: '4%',
  },

  header_text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },

  details: {
    flex: 10,
  },

});
