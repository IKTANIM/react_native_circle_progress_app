import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CircleProgressComponentFromInProgessToComplete from '../components/CircleProgressComponentFromInProgessToComplete'
import CircleProgressComponentFromLockedToInProgress from '../components/CircleProgressComponentFromLockedToInProgress'
import CircleProgressComponentLocked from '../components/CircleProgressComponentLocked'

const getBackupData = () => [
  {name:'goal1', image:require('../../resources/images/Goal1.png'), fromStatus: "inProgress", toStatus: "complete"},
  {name:'goal2', image:require('../../resources/images/Goal2.png'), fromStatus: "locked", toStatus: "inProgress"},
  {name:'goal3', image:require('../../resources/images/Goal3.png'), fromStatus: "locked", toStatus: "locked"},
  {name:'goal4', image:require('../../resources/images/Goal4.png'), fromStatus: "locked", toStatus: "locked"},
  {name:'PopQuiz', image:require('../../resources/images/PopQuiz.png'), fromStatus: "locked", toStatus: "locked"},
]

export default function Home() {
  const [data, setData] = useState(getBackupData())
  const [uniqueValue, setUniqueValue] = useState(1)
  const flatListRef = useRef(null)
  const [secondAnimation, setSecondAnimation] = useState(false)

  const onAnimateComplete = (_data: any) => {
    if(_data?.fromStatus == "inProgress" && _data?.toStatus == "complete"){
      setSecondAnimation(true)
    }
  }

  const restart = () => {
    setData(getBackupData());
    setSecondAnimation(false);
    setUniqueValue(prevUniqueValue => prevUniqueValue+1)
    // console.log('dsvfsd',  flatListRef.current.index)
    // flatListRef.current.scrollToIndex({animated: true, index: 4})
  }

  return (
    <SafeAreaView key={uniqueValue} style={{backgroundColor: 'white'}}>
      <FlatList
        ref={flatListRef}
        style={{marginTop:20}}
        data={data}
        renderItem={({item, index})=>
          <View style={{marginHorizontal:4}}>
            {item.fromStatus == "inProgress" &&  item.toStatus == "complete" &&
              <CircleProgressComponentFromInProgessToComplete data={item} animate={true} onAnimateComplete={onAnimateComplete}/>
            }
            {item.fromStatus == "locked" &&  item.toStatus == "inProgress" &&
              <CircleProgressComponentFromLockedToInProgress data={item} animate={secondAnimation} onAnimateComplete={onAnimateComplete}/>
            }
            {item.fromStatus == "locked" &&  item.toStatus == "locked" &&
              <CircleProgressComponentLocked data={item} animate={false} onAnimateComplete={onAnimateComplete}/>
            }
          </View>
        }
        horizontal
        keyExtractor={(item, index)=>index.toString()}
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity onPress={restart} style={{height: 40, width: 80, backgroundColor: 'red', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginTop: 40}}>
        <Text>Restart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}