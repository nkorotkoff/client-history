import {View, Modal, Text, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";

type Props = {
    isVisible: boolean,
    setVisible: (isVisible: boolean) => void,
    message: string
}

const ModalWindow: React.FC<Props> = ({ isVisible, setVisible, message }) => {
    return (
        <Modal visible={isVisible} onRequestClose={() => setVisible(false)} transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{message}</Text>
                    <TouchableOpacity style={styles.okButton} onPress={() => setVisible(false)}>
                        <Text style={styles.okButtonText}>ОК</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 300,
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    okButton: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
    },
    okButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ModalWindow