import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CircleProgressComponent from './CircleProgressComponent'
const backupData = [
  {name:'goal1', image:require('./resources/images/Goal1.png'), fromStatus: "inProgress", toStatus: "completed"},
  {name:'goal2', image:require('./resources/images/Goal2.png'), fromStatus: "locked", toStatus: "inProgress"},
  {name:'goal3', image:require('./resources/images/Goal3.png'), fromStatus: "locked", toStatus: "locked"},
  {name:'goal4', image:require('./resources/images/Goal4.png'), fromStatus: "locked", toStatus: "locked"},
  {name:'PopQuiz', image:require('./resources/images/PopQuiz.png'), fromStatus: "locked", toStatus: "locked"},
]

export default function App() {
  const [data, setData] = useState(backupData)
  const [uniqueValue, setUniqueValue] = useState(1)

  useEffect(() => {
    
  }, [])
  

  return (
    <SafeAreaView key={uniqueValue}>
      <FlatList
        style={{marginTop:20}}
        data={data}
        renderItem={({item, index})=>
          <View style={{marginHorizontal:4}}>
            {/* <CircleProgressComponent data={item} animate={item.fromStatus != item.toStatus}/> */}
            <CircleProgressComponent data={item}/>
          </View>
        }
        horizontal
        keyExtractor={(item, index)=>index.toString()}
      />
      <TouchableOpacity onPress={() => {setData(backupData); setUniqueValue(prevUniqueValue => prevUniqueValue+1)}} style={{height: 40, width: 80, backgroundColor: 'red', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginTop: 40}}>
        <Text>Restart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}