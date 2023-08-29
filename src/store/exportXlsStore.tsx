import {create} from "zustand";
import {ExportXlsStore} from "../interfaces/exportXls";
import {actionExportXls} from "./requests/reviewRequests";
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher'


const exportXlsStore = create<ExportXlsStore>((set, get) => ({
    list: [],
    async exportXls(type) {
        try {
            const {data} = await actionExportXls(type)
            await saveExcelFile(data, generateFileName())
            await get().getSavedXlsFiles()
        } catch (e) {
            console.log(e)
        }
    },

    async getSavedXlsFiles() {
        try {
            const directory = FileSystem.documentDirectory;

            if (directory != null) {
                const files = await FileSystem.readDirectoryAsync(directory);
                const data = files.filter(file => file.endsWith('.xlsx'))
                set({list: data})
                return data
            }
        } catch (error) {
            console.error('Error listing files:', error);
            return [];
        }
    },
    async deleteFile(file: string) {
        const path = `${FileSystem.documentDirectory}${file}`;
        try {
            await FileSystem.deleteAsync(path)
            await get().getSavedXlsFiles()
        } catch (e) {
            console.log(e)
        }

    },
    async openFile(file) {
        try {
            const savedFilePath = `${FileSystem.documentDirectory}${file}`;
            const mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

            const uri = await FileSystem.getContentUriAsync(savedFilePath);
            await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                data: uri,
                type: mimeType,
                flags: 1
            });
            return true
        } catch (error) {
            console.error('Error opening saved file:', error);
            return false
        }
    }
}))

const saveExcelFile = async (fileData: string, filename: string) => {
    try {
        const path = `${FileSystem.documentDirectory}${filename}.xlsx`;

        await FileSystem.writeAsStringAsync(path, fileData, {
            encoding: FileSystem.EncodingType.Base64,
        });

        console.log('File saved successfully');
    } catch (error) {
        console.log('Error saving file:', error);
    }
};


function generateFileName() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return `${timestamp}_${random}`;
}

export default exportXlsStore