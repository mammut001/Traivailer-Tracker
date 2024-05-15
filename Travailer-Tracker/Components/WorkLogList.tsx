

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { useDataListStore,} from "../store/useLogsStore"
import { SwipeListView } from 'react-native-swipe-list-view';
import {Item} from "../store/useLogsStore";

const WorkLogList = () =>{
    const data = useDataListStore(state =>state.dataList)
    const deleteAction = useDataListStore(state => state.deteleItem)


    const handleDelete = (item:Item) => {
        const key = item.date
        deleteAction(key)
    };

    const renderItem = ({ item }: { item: Item }) => (
        <View style={styles.rowFront}>
            <Text>{item.date} - {item.hours} hrs</Text>
        </View>
    );
    const renderHiddenItem = ({ item }: { item: Item }) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => handleDelete(item)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );


    return(
        <View style={styles.container}>
            <SwipeListView
                data={data}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-75}
                />

        </View>
    )
}

export default WorkLogList

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height:'100%',
        marginBottom:30
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    backTextWhite: {
        color: '#FFF',
    }

});

