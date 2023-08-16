import {Modal, TextInput, TouchableOpacity, View, StyleSheet, Text} from "react-native";
import React, {useEffect, useState} from "react";
import reviewStore from "../store/reviewStore";


type Props = {
    toggleFilter: () => void;
    isFilterVisible: boolean
};

const LENGTH_OF_DATE = 12

const Filter: React.FC<Props> = ({toggleFilter, isFilterVisible}) => {
    const [searchText, setSearchText] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [code, setCode] = useState('');
    const [needUpdate, setNeedUpdate] = useState(false);

    const useReviewStore = reviewStore()

    useEffect(() => {
        useReviewStore.changeFilters({
            name: searchText,
            date: dateFilter,
            rating: ratingFilter,
        })

        if (needUpdate) {
            useReviewStore.setFirstPage()
            useReviewStore.getReviewsList(true, true)
            setNeedUpdate(false)
        }

    }, [searchText, ratingFilter, dateFilter]);

    const handleSearchTextChange = (text: string) => {
        setSearchText(text);
    };

    const handleRatingFilterChange = (rating: string) => {
        setRatingFilter(rating);
    };

    const formatDate = (text: string) => {

        const cleanedInput = text.replace(/[^\d]/g, '');

        const renderPoint8To10 = () => {
            if (cleanedInput.slice(8, 10).length === 2) {
                return '.'
            }
            return ''
        }

        const renderPoint10To12 = () => {
            if (cleanedInput.slice(10, 12).length === 2) {
                return '.'
            }
            return ''
        }

        const renderDefis = () => {
            if (cleanedInput.slice(4, 8).length === 4) {
                return ' - '
            }
            return ''
        }

            if (cleanedInput.length <= 2) {
                return cleanedInput;
            } else if (cleanedInput.length <= 4) {
                return `${cleanedInput.slice(0, 2)}.${cleanedInput.slice(2)}`;
            } else if (cleanedInput.length <= 6) {
                return `${cleanedInput.slice(0, 2)}.${cleanedInput.slice(2, 4)}.${cleanedInput.slice(4)}`;
            } else {
                return `${cleanedInput.slice(0, 2)}.${cleanedInput.slice(2, 4)}.${cleanedInput.slice(4, 8)}${renderDefis()}${cleanedInput.slice(
                    8,
                    10
                )}${renderPoint8To10()}${cleanedInput.slice(10, 12)}${renderPoint10To12()}${cleanedInput.slice(12, 16)}`;
            }

    };

    const handleDateFilterChange = (text: string) => {
        if (code !== "Backspace") {
            setDateFilter(formatDate(text))
        } else {
            setDateFilter(text)
        }
    }

    const clearFilter = () => {
        setSearchText('')
        setDateFilter('')
        setCode('')
        setRatingFilter('')
        setNeedUpdate(true)
    }

    const applyFilter = () => {
        useReviewStore.getReviewsList(true, true)
    }

    const handleDeleteDate = (text: string) => {
        setCode(text)
    }


    return (
        <View>
            <Modal transparent={true} visible={isFilterVisible} onRequestClose={toggleFilter}>
                <TouchableOpacity style={styles.closeModal} onPress={() => toggleFilter()}/>
                <View style={styles.modalContainerWrapper}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Фильтр</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Поиск по названию"
                            value={searchText}
                            onChangeText={handleSearchTextChange}
                        />
                        <View style={styles.ratingFilterContainer}>
                            <Text style={styles.ratingFilterTitle}>Оценка:</Text>
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <TouchableOpacity
                                    key={rating}
                                    style={[styles.ratingFilterButton, rating <= parseInt(ratingFilter) && styles.activeRatingFilterButton]}
                                    onPress={() => handleRatingFilterChange(rating.toString())}>
                                    <Text
                                        style={[styles.ratingFilterButtonText, rating <= parseInt(ratingFilter) && styles.activeRatingFilterButtonText]}>
                                        {rating}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TextInput
                            style={styles.dateFilterInput}
                            placeholder="Фильтр по дате"
                            value={dateFilter}
                            onChangeText={handleDateFilterChange}
                            keyboardType="numeric"
                            onKeyPress={({nativeEvent}) => {
                                handleDeleteDate(nativeEvent.key)
                            }}
                        />
                        <View
                        style={styles.buttonsLayout}
                        >
                            <TouchableOpacity onPress={applyFilter} style={[styles.button, styles.applyButton]}>
                                <Text style={styles.buttonText}>Применить</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={clearFilter} style={[styles.button, styles.resetButton]}>
                                <Text style={styles.buttonText}>Сбросить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    closeModal: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    filterButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    filterButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: "70%",
        borderColor: "#000",
        borderWidth: 0.5,
    },
    modalContainerWrapper: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: "14%",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchInput: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    ratingFilterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ratingFilterTitle: {
        marginRight: 10,
    },
    ratingFilterButton: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    activeRatingFilterButton: {
        backgroundColor: '#4CAF50',
    },
    ratingFilterButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
    activeRatingFilterButtonText: {
        color: '#fff',
    },
    dateFilterInput: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 5,
    },
    buttonsLayout: {
        flexDirection:'row',
        marginTop:15,
        justifyContent:'space-between'
    },
    button: {
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
    },
    applyButton: {
        backgroundColor: '#4CAF50',
    },
    resetButton: {
        backgroundColor: '#f44336',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Filter