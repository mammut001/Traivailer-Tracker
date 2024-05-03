import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { useModalStatusStore,useSliderStore } from "../store/useModalStore"

import {Slider} from '@miblanchard/react-native-slider';
import DualThumbSlider from './Slider';
const AddModal = () =>{

    const status = useModalStatusStore(state =>state.OnDisplay)
    const setModalVisible = useModalStatusStore(state => state.updateModalStatus)


    return(
        <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={status}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible();
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            
              {/* <Text style={styles.modalText}>Please Input your hours</Text> */}
              <DualThumbSlider/>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible()}>
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </View>

    )
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      width:'75%',
      height:'30%',
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