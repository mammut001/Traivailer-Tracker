import React, { useState } from 'react';
import { View, Text, StyleSheet,Platform, Button } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import {useModalStatusStore, useSliderValueStore} from "../store/useModalStore";
const DualThumbSlider = () => {
    const sliderVal = useSliderValueStore(state => state.sliderValue)
    const setSliderVal = useSliderValueStore(state => state.updateSliderValue)


    const handleValueChange = (newVal: number[]) => {
        setSliderVal(newVal)
    };




    return (
        <View style={styles.container}>
            <Slider
                    value={sliderVal}
                    minimumValue={0}
                    maximumValue={5}
                    step={1}
                    trackClickable={true}
                    onValueChange={handleValueChange}
            />
            {sliderVal[0] > 1
                ?<Text style={styles.breakText}>Break Time: {sliderVal} hrs</Text>
                :<Text style={styles.breakText}>Break Time: {sliderVal} hr</Text>
            }

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
    breakText:{
        textAlign: 'center',
        marginTop: 20
    }
});

export default DualThumbSlider;