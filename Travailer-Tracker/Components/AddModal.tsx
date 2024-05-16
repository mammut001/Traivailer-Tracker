import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Platform} from 'react-native';
import { useModalStatusStore,useOnFocusStore, useValidationCheckStatusStore } from "../store/useModalStore"
import React,{useEffect} from 'react';
import DualThumbSlider from './Slider';
import { useDataListStore } from '../store/useLogsStore';
import { useSelectedDateStore } from '../store/useSelectedDateStore';
import { Item } from '../store/useLogsStore';

const AddModal = () =>{
    const selected_date = useSelectedDateStore(state => state.date)
    const addItem = useDataListStore(state => state.addItem)

    const status = useModalStatusStore(state =>state.OnDisplay)
    const setModalVisible = useModalStatusStore(state => state.updateModalStatus)
    const resetMaodalStatus = useModalStatusStore(state => state.resetModalStatus)
    const [text, onChangeText] = React.useState('');

    const [selectedTime, setSelectedTime] = React.useState(['','']) //0: start, 1:end
    const onFocus = useOnFocusStore(state =>state.onFocus)
    const setOnFocus = useOnFocusStore(state => state.setOnFocus)

    const validationCheck = useValidationCheckStatusStore(state => state.validationCheck)
    const setValidationStatus = useValidationCheckStatusStore(state => state.setValidationCheckStatus)
    // var errorMsg = ""
    const [errorMsg, setErrorMsg] = React.useState('');

    const validateTest = () => {
      console.log("Executing checks!")
      const regex = /^(\d{4})-(\d{4})$/
      const match = text.match(regex)
      if (match) {
        const [start, end] = text.split("-")
        setSelectedTime([start, end])

        if (Number(start.slice(0,2)) >= 0 && Number(start.slice(0,2)) <= 23 &&
            Number(start.slice(2,4)) >= 0 && Number(start.slice(2,4)) <= 59 &&
            Number(end.slice(0,2)) >= 0 && Number(end.slice(0,2)) <= 23 &&
            Number(end.slice(2,4)) >= 0 && Number(end.slice(2,4)) <= 59) {
          console.log("Time validation passed")
          setValidationStatus(true)
        } else {
          setErrorMsg("Sorry, please retry.")
          setValidationStatus(false)
          console.log("Time validation failed")
        }
      } else {
        setErrorMsg("Pattern is wrong.")
        setValidationStatus(false)
        console.log("Regex match failed")
      }
    };

    useEffect(() => {
      console.log("Modal will close. Current validationCheck:", validationCheck);
      if (validationCheck) {
        console.log("Adding item with selected time:", selectedTime);
        let item = {
          date: selected_date,
          hours: selectedTime.toString()
        };
        addItem(item);
        reset()
      }
}, [validationCheck, addItem, selectedTime, selected_date, setModalVisible, setOnFocus, resetMaodalStatus]);

    //
    const reset = () => {
      setModalVisible(false)
      setOnFocus(false)
      resetMaodalStatus()
      if (selectedTime[0] !== '' || selectedTime[1] !== '') {
      setSelectedTime(['', ''])
      }
      setValidationStatus(false)
      onChangeText('')
    }
    const handleOnChangeInputText = (newText:string) =>{
      if (newText.length < 10){
        if(newText.length < text.length){
          onChangeText(newText)

        }
        else{
          if(text.length === 3 && newText.length === 4){
            newText += '-'
          }
          onChangeText(newText)
        }
      }

    }



    const androidModalStyle = ()=>{
      if(!onFocus){
        return ModalStyles.AndroidModalViewModalOff
      }
      else{
        return ModalStyles.AndroidModalViewModalOn
      }
    }

    const modalStyle = Platform.OS === 'ios'? ModalStyles.IOSModalView: androidModalStyle()

    return(
        <View style={styles.centeredView}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={status}
          onRequestClose={() => {
            // theoretically, user should not request to close, but if they do, call setOnFocus to resize the modals.
            Alert.alert('Modal has been closed.')
            setModalVisible(false)
            setOnFocus(false)
          }}>
          <View style={styles.centeredView}>
            <View style={modalStyle}>
            {/* <Text style={styles.warning}>Enter time range, eg: 1200-2130</Text> */}
            <TextInput

              style={styles.inputTextField}
              onChangeText={handleOnChangeInputText}
              value={text}
              onFocus={()=>setOnFocus(true)}
              placeholder='Enter range eg. 1200-1600'
              keyboardType='numeric'
            />
            {!validationCheck && <Text style={styles.warning}>{errorMsg}</Text>}

              <DualThumbSlider/>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  validateTest()

                }}>
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </View>

    )
}
const ModalStyles = StyleSheet.create({
  AndroidModalViewModalOff: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width:'75%',
    height:'35%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  AndroidModalViewModalOn: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width:'75%',
    height:'65%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },


  IOSModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width:'75%',
    height:'35%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

})
const styles = StyleSheet.create({
    warning:{
      fontSize:15,
      color:'red'

    },
    inputTextField: {
        height: 35,
        borderWidth: 1,
        padding: 10,
        fontSize:10,
        width:'95%',
        marginTop:10
      },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
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
      backgroundColor: '#228B22',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });



export default AddModal