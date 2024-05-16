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

    const handleClean = () =>{
      clean()
      console.log(list)
    }
    return (
      <View style={styles.selectedDate}>



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