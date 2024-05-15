import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,Pressable} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { useSelectedDateStore } from './store/useSelectedDateStore';
import SelectedDate from './Components/SelectedDate';
import WorkLogList from './Components/WorkLogList';
import { useModalStatusStore } from './store/useModalStore';
import React, {useEffect, useState} from 'react';
import AddModal from './Components/AddModal';
import { useDataListStore } from './store/useLogsStore';
import { Item } from './store/useLogsStore';

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


  const handleTurnOnModal = ()=>{
    console.log("Day String is" + dayString)
    if(dayString.length === 0){
      const todayDateString = new Date().toISOString().split('T')[0]
      setDayString(todayDateString)
      updateDate(todayDateString)
    }
    setModalVisible()
  }
  return (
    <View style={styles.calendars}>
      <Calendar
        onDayPress={(day) => {
          console.log('selected day', day);
          updateDate(String(day.dateString))
          setDayString(String(day.dateString))
        }}
        markedDates={{
          [dayString]: {selected: true, marked: true, selectedColor: 'pink',},
          ...selectedDates
        }}
      />
      <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={handleTurnOnModal}>
          <Text style={styles.textStyle}>Add</Text>
        </Pressable>

      <SelectedDate/>
      <WorkLogList/>
      <AddModal/>
    </View>
  );
}

const styles = StyleSheet.create({
  calendars: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});