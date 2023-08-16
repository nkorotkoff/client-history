import {View, StyleSheet, Image} from "react-native";



const Loader = () => {
    return <View style={styles.container}>
        <Image
            source={require('../../assets/loader.gif')}
            style={styles.gifImage}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gifImage: {
        width: 200,
        height: 200,
        opacity: 0.8
    },
});

export default Loader