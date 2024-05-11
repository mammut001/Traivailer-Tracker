import { View, Text, StyleSheet, FlatList } from "react-native"
import { useDataListStore,} from "../store/useLogsStore"

const WorkLogList = () =>{
    const data = useDataListStore(state =>state.dataList)

    return(
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={item => item.date}
                renderItem={({ item }) => (
                    <View style={{padding: 10}}>
                        <Text>{item.date} : {item.hours}hrs</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default WorkLogList

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 40
    },
  });
