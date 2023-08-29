export interface ExportXlsStore {
    list : string[]
    exportXls: (type: string) => void,
    getSavedXlsFiles: () => Promise<string[] | undefined>,
    deleteFile: (file: string) => void,
    openFile: (file: string) => Promise<boolean>
}

export interface ExportedItemProps {
    item: string;
}