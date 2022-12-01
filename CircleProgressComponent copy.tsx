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
          <View style={[styles.ringChartContainer, {
            borderStyle: 'dotted',
            borderWidth: 2.5,
            borderRadius: radius,
            borderColor: '#D4D3D5',
            position: 'absolute',
          }]}/>
          {/* <View style={[styles.ringChartContainer, {
            // borderStyle: 'dotted',
            borderWidth: 2.5,
            borderRadius: radius,
            borderColor: 'purple',
            position: 'absolute',
          }]}/> */}
          <DonutChart
            backgroundColor="purple"
            radius={radius}
            strokeWidth={STROKE_WIDTH}
            percentageComplete={animationState}
            targetPercentage={targetPercentage}
            strokeColor={color}
            image={data.image}
            dashed={true}
          />
        </View>
      </Pressable>
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
