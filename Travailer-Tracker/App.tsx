import {StyleSheet, View, StatusBar, SafeAreaView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import { useSelectedDateStore } from './store/useSelectedDateStore';
import WorkLogList from './Components/WorkLogList';
import { useModalStatusStore } from './store/useModalStore';
import React, {useEffect, useState} from 'react';
import AddModal from './Components/AddModal';
import { useDataListStore } from './store/useLogsStore';


export default function App() {
  interface MarkedDateInfo {
    selected: boolean;
    marked: boolean;
    dotColor: string;
    selectedColor: string;
  }

  const updateDate = useSelectedDateStore(state => state.updateDate)
  const setModalVisible = useModalStatusStore(state => state.updateModalStatus)
  const [dayString, setDayString] = useState('')

  const status = useModalStatusStore(state => state.OnDisplay)
  const dates = useDataListStore(state => state.dataList)


  const [selectedDates, setSelectedDates] = useState({})
  useEffect(()=>{

    const newMarkedDates:{[key:string]:MarkedDateInfo} = {}

    dates.forEach(item =>{
      newMarkedDates[item.date] ={
        selected: true,
        marked: true,
        dotColor: 'black',
        selectedColor: 'cyan'
      }
    })
    setSelectedDates(newMarkedDates);
  },[dates])


  const handleTurnOnModal = (dayString: string)=>{
    console.log("Day String is" + dayString)
    if(dayString.length === 0){
      const todayDateString = new Date().toISOString().split('T')[0]
      setDayString(todayDateString)
      updateDate(todayDateString)
    }
    else{
      setDayString(dayString)
      updateDate(dayString)
    }
    setModalVisible(true)
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.calendars}>
        <Calendar
          onDayPress={(day) => {
            console.log('selected day', day);

            handleTurnOnModal(day.dateString)
          }}
          markedDates={{
            [dayString]: {selected: true, marked: true, selectedColor: 'pink',},
            ...selectedDates
          }}
        />

        <WorkLogList/>
        <AddModal/>
      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  calendars: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:40
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});