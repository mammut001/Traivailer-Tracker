
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { View, Text, StyleSheet, FlatList, TouchableOpacity,useWindowDimensions } from "react-native"
import { useDataListStore,} from "../store/useLogsStore"
import { SwipeListView } from 'react-native-swipe-list-view';
import {Item} from "../store/useLogsStore";
import * as React from 'react';

import { TabView, SceneMap } from 'react-native-tab-view';


const WorkLogList = () =>{
    const data = useDataListStore(state =>state.dataList)
    const deleteAction = useDataListStore(state => state.deleteItem)

    const [hourString, setHourString] = React.useState('hr')

    const handleDelete = (item:Item) => {
        const key = item.date
        deleteAction(key)
    };

    const renderItem = ({ item }: { item: Item }) => {

        return(

            Number(item.hours) > 1  ?

            (<View style={styles.rowFront}>
                <Text>{item.date} - {item.hours} hrs, {item.minute} mins</Text>
            </View>):

              (<View style={styles.rowFront}>
                  <Text>{item.date} - {item.hours} hr, {item.minute} mins</Text>
              </View>)

            )

    };

    const handleItemPress = (item: Item) =>{
        console.log(item.date)
    }
    const renderHiddenItem = ({ item }: { item: Item }) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backLeftBtn, styles.backLeftBtnLeft]}
                onPress={() => handleDelete(item)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Days' },
        { key: 'second', title: 'Weeks' },
    ]);


    const FirstRoute = () => (
      <View style={styles.routeContainer} >
          <SwipeListView
            data={data}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={0}
          />
      </View>
    );

    const SecondRoute = () => (
      <View style={styles.routeContainer} >
          <Text>
              1
          </Text>
          <Text>
              1
          </Text>
          <Text>
              1
          </Text>
          <Text>
              1
          </Text>
          <Text>
              1
          </Text>
          <Text>
              1
          </Text>

      </View>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });


    return(
          <View style={styles.container}>

              <TabView
                style={styles.tabview}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
              />

          </View>


    )
}

export default WorkLogList

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    tabview:{
        flex:1,
        height:'100%'
    },
    routeContainer: {
        flex: 1,
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
    backLeftBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backLeftBtnLeft: {
        backgroundColor: 'red',
        left: 0,
    },
    backTextWhite: {
        color: '#FFF',
    }

});

