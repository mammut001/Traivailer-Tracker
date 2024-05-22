  import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Platform,Vibration} from 'react-native';
  import {
      useModalStatusStore,
      useOnFocusStore,
      useSliderValueStore,
      useValidationCheckStatusStore
  } from "../store/useModalStore"
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

      const [errorMsg, setErrorMsg] = React.useState('');


      const sliderValue = useSliderValueStore(state => state.sliderValue)

      const [updatedHour, setUpdatedHour] = React.useState(-1)
      const [updatedMinute, setUpdatedMinute] = React.useState(-1)



      const validateTest = () => {
        console.log("Executing checks!")
        const regex = /^(\d{4})-(\d{4})$/
        const match = text.match(regex)
        if (match) {
          const [start, end] = text.split("-")
          console.log("Start is "+start+" end is "+ end)
          setSelectedTime([start, end])

          if (Number(start.slice(0,2)) >= 0 && Number(start.slice(0,2)) <= 23 &&
              Number(start.slice(2,4)) >= 0 && Number(start.slice(2,4)) <= 59 &&
              Number(end.slice(0,2)) >= 0 && Number(end.slice(0,2)) <= 23 &&
              Number(end.slice(2,4)) >= 0 && Number(end.slice(2,4)) <= 59)
          {


            const startHour:number = Number(start.substring(0,2))
            const startMinute:number = Number(start.substring(2,4))

            const endHour:number = Number(end.substring(0,2))
            const endMinute:number = Number(end.substring(2,4))

            let newUpdatedHour = endHour - startHour
            let newUpdatedMinute = endMinute - startMinute
            console.log("Updated Hour is "+ newUpdatedHour + " Updated Minute "+newUpdatedMinute)
            if(newUpdatedHour < 0){
            // if is negative, subtract one hour from updatedHour
              newUpdatedHour -= 1
              newUpdatedMinute += 60

            }
            if(newUpdatedHour > 60){
              newUpdatedHour += 1
              newUpdatedMinute -= 60
            }

            setUpdatedHour(newUpdatedHour)
            setUpdatedMinute(newUpdatedMinute)

            if(newUpdatedHour - sliderValue[0] < 0){
              setErrorMsg("Sorry, rest hour is bigger than actual work hour.")
              setValidationStatus(false)
            }
            else{
              setValidationStatus(true)
              setErrorMsg("")

            }

          } else {
            setErrorMsg("Sorry, please retry.")
            setValidationStatus(false)
            console.log("Time validation failed")
          }
        } else {
          setValidationStatus(false)
          console.log("Regex match failed")
        }
      };

      useEffect(() => {
        console.log("Modal will close. Current validationCheck:", validationCheck);
        if (validationCheck) {
          console.log("Adding item with selected time:", selectedTime);

          let item:Item = {
            date: selected_date,
            hours: updatedHour.toString(),
            minute: updatedMinute.toString()
          }
          addItem(item)
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
        setErrorMsg("")
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
      const handleClose = () =>{
        setModalVisible(false)
        Vibration.vibrate()
      }

      const modalStyle = Platform.OS === 'ios'? ModalStyles.IOSModalView: androidModalStyle()

      return(

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


                <Pressable onPress={handleClose} style={styles.closeButton}>
                  <View>
                    <Text style={styles.closeModal}>
                      x
                    </Text>
                  </View>
                </Pressable>


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
      closeModal: {
        color: 'red',
        textAlign: "right",
      },
      closeButton: {
        width: '100%',
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