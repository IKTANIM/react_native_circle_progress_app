import * as React from 'react';
import {Text, View, StyleSheet, Button, Image} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

export default function CountdownCircleTimerComponent() {
  const [isPlaying, setIsPlaying] = React.useState(true);

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={4}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => ({shouldRepeat: false, delay: 2})}
        size={100}
        strokeLinecap={'butt'}
        strokeWidth={4}>
        {({remainingTime, color}) => (
          // <Text style={{ color, fontSize: 40 }}>
          //   {remainingTime}
          // </Text>
            <View style={{}}>
              <Image
              source={{uri: 'https://ssl.gstatic.com/onebox/media/sports/logos/1xBWyjjkA6vEWopPK3lIPA_48x48.png'}}
              style={{width: 90,height:90, borderRadius:100}}
              resizeMode="contain"
            />
            </View>
        )}
      </CountdownCircleTimer>
      <Button title="Toggle Playing" onPress={() => setIsPlaying(prev => !prev)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
