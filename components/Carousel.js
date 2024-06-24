import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';

const Carousel = () => {

    const images = [
        require('../img/carousel1.jpeg'),
        require('../img/carousel2.jpeg'),
        require('../img/carousel3.jpeg'),
    ];

    return (
        <View>
            <SliderBox
                images={images}
                autoPlay
                circleLoop
                dotColor="#003314"
                inactiveDotColor="#450504"
                ImageComponentStyle={{
                    borderRadius: 6, 
                    width: '94%',
                }}
            />
        </View>
    )
}

export default Carousel;

const styles = StyleSheet.create({});
