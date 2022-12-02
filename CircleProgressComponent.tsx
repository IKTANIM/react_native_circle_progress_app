import * as React from 'react';
import {Text, View, StyleSheet, Button, Image, TouchableOpacity, PixelRatio, Pressable, Alert} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {Easing, runTiming, useFont, useValue} from '@shopify/react-native-skia';
import {DonutChart} from './DonutChart';

const radius = PixelRatio.roundToNearestPixel(40);
const STROKE_WIDTH = 4;

export default function CircleProgressComponent({data, animate}: any) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);
  const [isFullProcessComplete, setIsFullProcessComplete] = React.useState(false);
  const [borderRadius, setBorderRadius] = React.useState('solid');

  const [type, setType] = React.useState(
    data?.fromStatus == "inProgress" && data?.toStatus == "completed" ? "inProgressToCompleted"
    :
    (data?.fromStatus == "locked" && data?.toStatus == "inProgress" ? "lockedToInProgress" : "lockedToLocked")
  );
  const [localDashed, setLocalDashed] = React.useState(type == "inProgressToCompleted" ? false : true);
  const [localColor, setLocalColor] = React.useState(type == "inProgressToCompleted" ? "purple" : "#D3D3D3");
  const [color, setColor] = React.useState(type == "inProgressToCompleted" ? "#D3D3D3" : "red");
  const [dashed, setDashed] = React.useState(type == "inProgressToCompleted" ? true : false);
  

  const targetPercentage = 100 / 100;
  const animationState = useValue(0);

  const animateChart = () => {
    if(!isComplete){
      // setLocalColor("white");
      // setLocalDashed(true);
      animationState.current = 0;
      runTiming(animationState, targetPercentage, {
        duration: 800,
        easing: Easing.inOut(Easing.exp),
      })
    }
  };

  React.useEffect(() => {
    if(animate){
      animateChart();
    }
    // if(type == "inProgressToCompleted"){
    //   setBorderRadius('solid');
    // }
  }, [animate, type]);
  

  // useEffect that listens to the value going over 1 and then resets value and applies some state updates 
  React.useEffect(() => {
  const unsubscribe = animationState.addListener((value) => {
    console.log('value', value);
    if (value > 0.9995) {
      // Alert.alert('Done!!!');
      setLocalColor('#D3D3D3')
      setLocalDashed(true)
      setColor('green')
      animateChart();
      setDashed(false)
      setIsComplete(true);
      setTimeout(() => {
        setIsFullProcessComplete(true);
      }, 900);
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
          {/* <View style={[styles.ringChartContainer, {
            borderStyle: localDashed ? 'dotted' : 'solid',
            borderWidth: 3,
            borderRadius: radius,
            borderColor: localColor,
            position: 'absolute',
          }]}/> */}
          <View style={[styles.ringChartContainer, {
            position: 'absolute',
          }]}>
            <DonutChart
              radius={radius}
              strokeWidth={STROKE_WIDTH}
              percentageComplete={useValue(1)}
              targetPercentage={1}
              strokeColor={localColor}
              image={null}
              dashed={localDashed ? true : false}
            />
          </View>
          <View style={[styles.ringChartContainer, {
            position: 'absolute'
          }]}>
            <DonutChart
              radius={radius}
              strokeWidth={STROKE_WIDTH}
              percentageComplete={animationState}
              targetPercentage={targetPercentage}
              strokeColor={'white'}
              image={null}
              dashed={false}
            />
          </View>
          <View style={[styles.ringChartContainer, {
            position: 'absolute'
          }]}>
            <DonutChart
              radius={radius}
              strokeWidth={STROKE_WIDTH}
              percentageComplete={animationState}
              targetPercentage={targetPercentage}
              strokeColor={color}
              image={data.image}
              showCheck={true}
              dashed={dashed}
            />

            {isFullProcessComplete &&
              <View
                style={[styles.imageContainer,{ backgroundColor: 'rgba(154,223,192,0.5)', position: 'absolute', 
                height: 64,
                width: 64,
                borderRadius:64,
                alignItems:'center',
                justifyContent:'center', marginTop: 8, marginLeft: 8}]}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <Image
                    source={require('./resources/images/Checkmark.png')}
                    style={[{position:'absolute', height:24,width:24}]}
                    resizeMode="cover"
                  />
                </View>
              </View>
            }
          

          {/* <View style={[styles.ringChartContainer, {
            position: 'absolute'
          }]}>
            <Image
              image={checkImage}
              x={15}
              y={15}
              width={radius * 2 - 30}
              height={radius * 2 - 30}
            />
          </View> */}
          </View>
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
