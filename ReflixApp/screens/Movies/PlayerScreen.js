import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import FabButton from '../../components/FabButton';

export default function PlayerScreen({route, navigation}) {
  const playerRef = useRef(null);
  const [playing] = useState(true);
  const [trailerKey, setTrailer] = useState();
  navigation.setOptions({
    title: '',
    headerTitleStyle: {color: '#fff'},
    headerTintColor: '#fff',
    headerTransparent: true,
    headerLeft: () => (
      <FabButton
        clickEvent={() => navigation.goBack()}
        iconName="keyboard-arrow-left"
        iconSize={40}
      />
    ),
  });
  useEffect(() => {
    if (route.params) {
      setTrailer(route.params.videoId);
    }
  }, []);
  return (
    <View style={styles.container}>
      {trailerKey ? (
        <YoutubePlayer
          ref={playerRef}
          height={300}
          width={400}
          videoId={trailerKey}
          play={playing}
          onChangeState={(event) => {}}
          onReady={() => {}}
          onError={(e) => {}}
          onPlaybackQualityChange={(q) => {}}
          volume={50}
          playbackRate={1}
          playerParams={{
            cc_lang_pref: 'us',
            showClosedCaptions: true,
          }}
        />
      ) : (
        <Text style={styles.text}>No trailer found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
});
