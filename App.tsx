import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,Pressable} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useSelectedDateStore } from './store/useSelectedDateStore';
import SelectedDate from './Components/SelectedDate';
import WorkLogList from './Components/WorkLogList';
import { useModalStatusStore } from './store/useModalStore';
import AddModal from './Components/AddModal';
export default function App() {
  const updateDate = useSelectedDateStore(state => state.updateDate)
  const setModalVisible = useModalStatusStore(state => state.updateModalStatus)

  return (
    <View style={styles.calendars}>
      <Calendar
        onDayPress={(day) => {
          console.log('selected day', day);
          updateDate(String(day.dateString))
        }}
      />
      <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible()}>
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