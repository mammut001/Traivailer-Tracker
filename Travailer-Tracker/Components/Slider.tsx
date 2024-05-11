import React, { useState } from 'react';
import { View, Text, StyleSheet,Platform, Button } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
const DualThumbSlider = () => {
    const [sliderValue, setSliderValue] = useState([6]);

    const handleValueChange = (newVal: number[]) => {
        setSliderValue(newVal)
    };



    return (
        <View style={styles.container}>
            <Text></Text>
            <View style={styles.text}>
            </View>
            <Slider
                    value={sliderValue}
                    minimumValue={1}
                    maximumValue={5}
                    step={1}
                    trackClickable={true}
                    onValueChange={handleValueChange}
            />

            <Text style={{justifyContent:'space-between'}}>Break Time: {sliderValue} hr</Text>
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