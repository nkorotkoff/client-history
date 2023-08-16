import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import reviewStore from "../store/reviewStore";
import ModalWindow from "../components/ModalWindow";


type FormValues = {
    name: string,
    author: string,
    rating: string,
    review: string
}

const AddReviewScreen = () => {
    const {control, handleSubmit, formState: {errors}, reset} = useForm<FormValues>();

    const [type, setReviewType] = useState('film');

    const [isVisibleModal, setVisibleModal] = useState(false)

    const [message, setMessage] = useState('')

    const useReviewStore = reviewStore()

    const onSubmit = (data: FormValues) => {
        useReviewStore.createReview({
            ...data, type: type
        })
    };

    useEffect(() => {
        reset()
        if (useReviewStore.reviewCreatedSuccessful !== null) {
            if (useReviewStore.reviewCreatedSuccessful) {
                setMessage('Отзыв успешно создан')
            } else {
                setMessage('Не удалось создать отзыв')
            }
            setVisibleModal(true)
        }

        useReviewStore.clearStatusCreate()


    }, [useReviewStore.reviewCreatedSuccessful])

    return (
        <View style={styles.container}>
                <ModalWindow isVisible={isVisibleModal} setVisible={setVisibleModal} message={message}/>
            <Picker
                selectedValue={type}
                onValueChange={(itemValue, itemIndex) => {
                    setReviewType(itemValue)
                    }
                }
            >
                <Picker.Item label="Фильм" value="film"/>
                <Picker.Item label="Сериал" value="serial"/>
                <Picker.Item label="Аниме" value="anime"/>
                <Picker.Item label="Книга" value="book"/>
            </Picker>
            <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Название"
                    />
                )}
                name="name"
                defaultValue=""
            />
            {errors.name && <Text style={styles.error}>Поле обязательно для заполнения</Text>}

            {type === 'book' && <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Автор"
                    />
                )}
                name="author"
                defaultValue=""
            />}
            <Controller
                control={control}
                rules={{
                    required: false,
                    validate: {
                        validRating: (value) => parseInt(value) >= 1 && parseInt(value) <= 5
                    }
                }}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Рейтинг (1-5)"
                        keyboardType="numeric"
                    />
                )}
                name="rating"
                defaultValue=""
            />
            {errors.rating && errors.rating.type === 'required' && (
                <Text style={styles.error}>Поле обязательно для заполнения</Text>
            )}
            {errors.rating && errors.rating.type === 'validRating' && (
                <Text style={styles.error}>Рейтинг должен быть от 1 до 5</Text>
            )}
            <Controller
                control={control}
                rules={{required: false}}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        style={styles.textArea}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Отзыв"
                        multiline
                        textAlignVertical="top"
                    />
                )}
                name="review"
                defaultValue=""
            />
            <Button onPress={handleSubmit(onSubmit)} title="Отправить"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
        height: 120,
    },
    error: {
        color: 'red',
        marginBottom: 16,
    },


});

export default AddReviewScreen;