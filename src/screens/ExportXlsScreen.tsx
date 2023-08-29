import {Alert, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import React, {useEffect, useState} from "react";
import exportXlsStore from "../store/exportXlsStore";
import {ExportedItemProps} from "../interfaces/exportXls";


const ExportXlsScreen = () => {

    const [type, setReviewType] = useState('');

    const [savedFiles, setSavedFiles] = useState<string[]>([])

    const useExportXlsStore = exportXlsStore()

    const updateDownloadList = async () => {
        const savedFiles = await useExportXlsStore.getSavedXlsFiles()
        // @ts-ignore
        setSavedFiles(savedFiles)
    }

    useEffect(() => {
        (async () => {
            await updateDownloadList()
        })()

    }, [])

    useEffect(() => {
        (async () => {
            setSavedFiles(useExportXlsStore.list)
        })()

    }, [useExportXlsStore.list])

    const openFile = async (item: string) => {
       const isSuccess = await useExportXlsStore.openFile(item)
        if (!isSuccess) {
            Alert.alert('Ошибка', 'Не найденно подходящее приложения для открытия файла')
        }
    }

    const ExportedItem: React.FC<ExportedItemProps> = ({item}) => {
        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={() => openFile(item)}>
                        <Text style={styles.text}>{item}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => useExportXlsStore.deleteFile(item)}>
                        <Text style={styles.textDelete}>Удалить</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View>
            <Text style={styles.type}>Выберите тип</Text>
            <Picker
                selectedValue={type}
                onValueChange={(itemValue, itemIndex) => {
                    setReviewType(itemValue)
                }
                }
            >
                <Picker.Item label="Все" value=""/>
                <Picker.Item label="Фильм" value="film"/>
                <Picker.Item label="Сериал" value="serial"/>
                <Picker.Item label="Аниме" value="anime"/>
                <Picker.Item label="Книга" value="book"/>
            </Picker>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={() => useExportXlsStore.exportXls(type)}>
                    <Text style={styles.exportButton}>Экспортировать</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList data={savedFiles} renderItem={ExportedItem}>

                </FlatList>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    type: {
        marginLeft: '4%',
        marginTop: 10,
        fontSize: 16
    },
    exportButton: {
        fontSize: 20,
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10,
    },
    buttonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection:'row',
        justifyContent:'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 16,
    },
    textDelete: {
        fontSize: 14,
        color:'red'
    },
})

export default ExportXlsScreen