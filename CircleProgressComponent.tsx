import * as React from 'react';
import {Text, View, StyleSheet, Button, Image, TouchableOpacity} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

export default function CircleProgressComponent({data}) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);
  const [isFullProcessComplete, setIsFullProcessComplete] = React.useState(false);
  return (
    <TouchableOpacity onPress={()=>setIsPlaying(!isPlaying)}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={1}
        colors={isComplete?['#75CFAA', '#75CFAA']:['#9272D7', '#9272D7']}
        colorsTime={[1, 0]}
        // colors={['#9272D7','#9272D7']}
        // colorsTime={[10,0]}
        onComplete={() => {
          if(!isComplete){
            setIsComplete(true)
            return ({shouldRepeat: true, delay: 1})
          }
          setIsFullProcessComplete(true)
        }}
        size={80}
        strokeLinecap={'butt'}
        strokeWidth={4}>
        {({remainingTime, color}) => {
          return remainingTime == 0 ? (
            // <Text style={{ color, fontSize: 40 }}>
            //   {remainingTime}
            // </Text>
            <View
              style={[styles.imageContainer,{borderWidth: 3,borderStyle:isComplete?'solid':'dotted',borderColor:isComplete?'#75CFAA':'#D4D3D5', backgroundColor:isFullProcessComplete?'rgba(154,223,192,0.5)':'#fff'}]}>
              <View style={{justifyContent:'center', alignItems:'center'}}>
                <Image
                  source={data.image}
                  style={[styles.image, isFullProcessComplete&&{ opacity:0.4}]}
                  resizeMode="cover"
                />
                {isFullProcessComplete&&(
                  <Image
                    source={require('./resources/images/Checkmark.png')}
                    style={[{position:'absolute', height:24,width:24}]}
                    resizeMode="cover"
                  />
                )}
              </View>
            </View>
          ) : (
            <View style={styles.imageContainer}>
                <Image
                  source={data.image}
                  style={styles.image}
                  resizeMode="cover"
                />
            </View>
          );
        }}
      </CountdownCircleTimer>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  imageContainer:{
    height: 80,
    width: 80,
    borderRadius:80,
    alignItems:'center',
    justifyContent:'center',
  },
  image:{
    width: 60,
    height:60, 
    borderRadius:80,
    padding:4
  }
});
