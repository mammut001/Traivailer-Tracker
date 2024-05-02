import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useSelectedDateStore } from './store/useSelectedDateStore';
import SelectedDate from './Components/SelectedDate';
import WorkLogList from './Components/WorkLogList';
export default function App() {
  const updateDate = useSelectedDateStore(state => state.updateDate)

  return (
    <View style={styles.calendars}>
      <Calendar
        onDayPress={(day) => {
          console.log('selected day', day);
          updateDate(String(day.dateString))
        }}
      />
      <SelectedDate/>
      <WorkLogList/>
    </View>
  );
}

const styles = StyleSheet.create({
  calendars: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40
  },
});