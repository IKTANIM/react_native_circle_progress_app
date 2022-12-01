import * as React from 'react';
import {Text, View, StyleSheet, Button, Image, TouchableOpacity, PixelRatio, Pressable, Alert} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {Easing, runTiming, useFont, useValue} from '@shopify/react-native-skia';
import {DonutChart} from './DonutChart';

const radius = PixelRatio.roundToNearestPixel(40);
const STROKE_WIDTH = 4;

export default function CircleProgressComponent({data}: any) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);
  const [isFullProcessComplete, setIsFullProcessComplete] = React.useState(false);
  const [color, setColor] = React.useState('red');


  const targetPercentage = 100 / 100;
  const animationState = useValue(0);

  const animateChart = () => {
    if(!isComplete){
      animationState.current = 0;
      runTiming(animationState, targetPercentage, {
        duration: 700,
        easing: Easing.inOut(Easing.exp),
      })
    }
  };

  // useEffect that listens to the value going over 1 and then resets value and applies some state updates 
  React.useEffect(() => {
  const unsubscribe = animationState.addListener((value) => {
    console.log('value', value);
    if (value > 0.999) {
      // Alert.alert('Done!!!');
      animateChart();
      setColor('green')
      setIsComplete(true);
    }
  })
  return () => {
    unsubscribe()
  }
}, [animationState, isComplete])

  return (
    <TouchableOpacity onPress={()=>setIsPlaying(!isPlaying)}>

      <Pressable onPress={animateChart} >
        <View style={styles.ringChartContainer}>
          <DonutChart
            backgroundColor="purple"
            radius={radius}
            strokeWidth={STROKE_WIDTH}
            percentageComplete={animationState}
            targetPercentage={targetPercentage}
            strokeColor={color}
            image={data.image}
          />
        </View>
      </Pressable>

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
  },
  ringChartContainer: {
    width: radius * 2,
    height: radius * 2,
  },
  button: {
    marginTop: 40,
    backgroundColor: 'orange',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
