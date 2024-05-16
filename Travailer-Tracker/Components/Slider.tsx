import React, { useState } from 'react';
import { View, Text, StyleSheet,Platform, Button } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import {useModalStatusStore, useSliderValueStore} from "../store/useModalStore";
const DualThumbSlider = () => {
    const [sliderValue, setSliderValue] = useState([6]);
    const sliderVal = useSliderValueStore(state => state.sliderValue)
    const setSliderVal = useSliderValueStore(state => state.updateSliderValue)


    const handleValueChange = (newVal: number[]) => {
        setSliderVal(newVal)
    };

    return (
        <View style={styles.container}>
            <Text></Text>
            <View style={styles.text}>
            </View>
            <Slider
                    value={sliderVal}
                    minimumValue={1}
                    maximumValue={6}
                    step={1}
                    trackClickable={true}
                    onValueChange={handleValueChange}
            />

            <Text style={{justifyContent:'space-between'}}>Break Time: {sliderVal} hr</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 20,
        width: '100%'
    },
    text:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
});

export default DualThumbSlider;