import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import CircleProgressComponent from './CircleProgressComponent'

export default function App() {
  const data=[
    {name:'goal1', image:require('./resources/images/Goal1.png')},
    {name:'goal2', image:require('./resources/images/Goal2.png')},
    {name:'goal3', image:require('./resources/images/Goal3.png')},
    {name:'goal4', image:require('./resources/images/Goal4.png')},
    {name:'PopQuiz', image:require('./resources/images/PopQuiz.png')},
  ]
  return (
    <SafeAreaView>
      <FlatList
      style={{marginTop:20}}
      data={data}
      renderItem={({item, index})=><View style={{marginHorizontal:4}}><CircleProgressComponent data={item}/></View>}
      horizontal
      keyExtractor={(item, index)=>index.toString()}
      />
    </SafeAreaView>
  )
}