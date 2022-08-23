import { StyleSheet, Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    image: {
        width: width / 2,
        height: width / 2
    },
    listView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})