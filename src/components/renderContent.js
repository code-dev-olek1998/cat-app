import React from 'react';
import { Image, Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

const RenderContent = ({url}) => (
    <Image source={{uri: url}} style={styles.image}/>
)

const styles = StyleSheet.create({
    image: {
        width,
        height,
        resizeMode: 'contain'
    }
});

export default RenderContent