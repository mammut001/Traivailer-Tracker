import { StyleSheet, Text, View, Button} from 'react-native';
import { useSelectedDateStore } from '../store/useSelectedDateStore';
import { useDataListStore, Item } from "../store/useLogsStore"
import React, {useCallback, useMemo, useRef} from 'react';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';


const SelectedDate = () =>{

    const date = useSelectedDateStore(state => state.date)
    const updateDate = useSelectedDateStore(state => state.updateDate)

    const addItem = useDataListStore(state => state.addItem)
    const clean = useDataListStore(state => state.cleanList)

    const list = useDataListStore(state => state.dataList)
    const handleAdd = ()=>{
      const item1:Item = {
        date: `2022-01-${Math.floor(Math.random() * 30) + 1}`,
        hours: '8.9'
      }
      addItem(item1)
      console.log("Add Handled")
    }
    const handleClean = () =>{
      clean()
      console.log(list)
    }
    return (
      <View style={styles.selectedDate}>
      <Text>Selected Date: {date} </Text>
      <Button
      
      onPress={handleClean}
      title="Clean"
      color="#dddddd"
      accessibilityLabel="Add"
    />

      <Button
      
        onPress={handleAdd}
        title="Add"
        color="#dddddd"
        accessibilityLabel="Add"
      />

      </View>
    )

}

const styles = StyleSheet.create({
    selectedDate:{
      marginLeft: 20,
      marginTop: 30,
      marginRight:20,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
  });


export default SelectedDate