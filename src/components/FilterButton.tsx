import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";

type Props = {
    onPress: () => void;
};


const FilterButton: React.FC<Props> = ({onPress}) => {
    return (
        <TouchableOpacity onPress={() => {onPress()}} style={styles.menuButton}>
            <Text style={styles.menuButtonText}>Фильтр</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    menuButton: {
        backgroundColor: '#d7ded9',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    menuButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default FilterButton