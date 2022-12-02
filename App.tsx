import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Platform, PixelRatio } from 'react-native'
import React, { useEffect, useState } from 'react'
import CircleProgressComponent from './CircleProgressComponent'
import Toast from 'react-native-toast-message'
import ToastConfigCustomComponent from './src/components/ToastConfigCustomComponent'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native'
const backupData = [
  {name:'goal1', image:require('./resources/images/Goal1.png'), fromStatus: "inProgress", toStatus: "completed"},
  {name:'goal2', image:require('./resources/images/Goal2.png'), fromStatus: "locked", toStatus: "inProgress"},
  {name:'goal3', image:require('./resources/images/Goal3.png'), fromStatus: "locked", toStatus: "locked"},
  {name:'goal4', image:require('./resources/images/Goal4.png'), fromStatus: "locked", toStatus: "locked"},
  {name:'PopQuiz', image:require('./resources/images/PopQuiz.png'), fromStatus: "locked", toStatus: "locked"},
]
const size = 80;

const App = () => {
  const [data, setData] = useState(backupData)
  const [uniqueValue, setUniqueValue] = useState(1)

  useEffect(() => {
    
  }, [])
  // const size = PixelRatio.getPixelSizeForLayoutSize(40);
  return (  
    <SafeAreaView key={uniqueValue}>
      <View style={{flexDirection:'row'}}>
        <View style={{height:size, width: size, marginLeft: 12,marginRight: 4,marginTop:4}}>
          <View 
            style={styles.headerContainer}>
            <Text style={styles.headerText}>GETTING STARTED</Text>
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.headerText}>1/5</Text>
          </View>
        </View>
        <FlatList
          data={data}
          contentContainerStyle={{paddingRight:12}}
          renderItem={({item, index})=>
            <View style={{marginHorizontal:4}}>
              {/* <CircleProgressComponent data={item} animate={item.fromStatus != item.toStatus}/> */}
              <CircleProgressComponent data={item}/>
            </View>
          }
          horizontal
          keyExtractor={(item, index)=>index.toString()}
        />
      </View>
      <TouchableOpacity onPress={() => {
        // setData(backupData); setUniqueValue(prevUniqueValue => prevUniqueValue+1)
        Toast.show({
          text1:'Goal Complete',
          type:'success'
        })
      }} style={{height: 40, width: 80, backgroundColor: 'red', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginTop: 40}}>
        <Text>Restart</Text>
      </TouchableOpacity>
      <Toast config={ToastConfigCustomComponent} topOffset={Platform.OS == 'android' ? 0 : 50} visibilityTime={2000} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    width: size-8,
    height: size-8,
    backgroundColor: '#FFF4E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  headerText: {
    fontSize: 12,
    color: '#E6B270',
    fontWeight: '800',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    right: -6,
    backgroundColor: '#FFF4E2',
    height: 24,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderColor:'#fff',
    borderRadius:10, 
    marginTop:-12,
  },
});
export default App;