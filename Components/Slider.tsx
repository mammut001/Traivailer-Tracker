import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { useSliderStore } from '../store/useModalStore';

const DualThumbSlider = () => {
    const [sliderValue, setSliderValue] = useState([0, 24]);

    const handleValueChange = (newVal:number[]) => {
        console.log("original:" +sliderValue)
        console.log("newVal: "+ newVal.toString())
        const x0 = Math.round(sliderValue[0] * 10) / 10
        const x1 = Math.round(sliderValue[1] * 10) / 10
        const y0 = Math.round(newVal[0] * 10) / 10
        const y1 = Math.round(newVal[1] * 10) / 10 
        
        
        setSliderValue(newVal)

    };
    return (
        <View style={styles.container}>
            <Text></Text>
            <View style={styles.text}>
            <Text>Start</Text><Text>End</Text>
            </View>
            <Slider
                value={sliderValue}
                onValueChange={(newVal:number[]) => handleValueChange(newVal)}
                animateTransitions
                maximumTrackTintColor="#d3d3d3"
                maximumValue={24}
                minimumTrackTintColor="#1fb28a"
                minimumValue={0}
                step={0.1}
                thumbTintColor="#1a9274"
            />
            <Text>Time: {Math.round(sliderValue[0] * 10)/ 10}h - {Math.round(sliderValue[1] * 10) / 10}h</Text>
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