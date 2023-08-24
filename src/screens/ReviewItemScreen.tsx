import React, {useEffect, useState} from "react";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {Picker} from "@react-native-picker/picker";
import {Review} from "../interfaces/review";
import {RouteProp} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import reviewItemStore from "../store/reviewItemStore";
import ModalWindow from "../components/ModalWindow";




type FormValues = {
    name: string,
    author: string
    rating: string,
    review: string,
    whereStay: string,
}


type RootStackParamList = {
    Review : Review
};

type ReviewItemScreenRouteProp = RouteProp<RootStackParamList>;

type ReviewItemScreenNavigationProp = NativeStackNavigationProp <
    RootStackParamList
>;

type Props = {
    route: ReviewItemScreenRouteProp;
    navigation: ReviewItemScreenNavigationProp;
};


const ReviewItemScreen: React.FC<Props> = ({route, navigation})  => {
    const Review  = route.params;
    navigation.setOptions({
        title: Review.name
    })
    const {control, handleSubmit, setValue, formState: {errors}, reset} = useForm<FormValues>({

    });

    useEffect(() => {
        setValue("name", Review.name)
        setValue("author", Review.author ?? '')
        setValue("rating", Review.rating.toString())
        setValue("review", Review.review ?? '')
        setValue("whereStay", Review.whereStay ?? '')
        setReviewType(Review.type)
    }, [route.params])

    const [type, setReviewType] = useState(Review.type);
    const [isDeletePressed, sedDeletePressed] = useState(false)

    const useReviewItemStore = reviewItemStore()

    const hideModal = () => {
        useReviewItemStore.hideModalWindow()
        if (isDeletePressed) {
            navigation.goBack()
        }
        sedDeletePressed(false)
    }

    const deleteReview = () => {
        sedDeletePressed(true)
        useReviewItemStore.deleteReview(Review.id)
    }

    const typesForWhereStay = [
        'serial',
        'anime',
        'book'
    ]

    const updateReview = (values: FormValues) => {
        useReviewItemStore.updateReview({
            ...values, id: Review.id, type: type
        })
    }

    return (
        <View style={styles.container}>
            <ModalWindow isVisible={useReviewItemStore.showMessage} setVisible={hideModal} message={useReviewItemStore.message}/>
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
            />}

            {typesForWhereStay.includes(type) && <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Где остановился"
                    />
                )}
                name="whereStay"
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
            />
            <Button onPress={handleSubmit(updateReview)} title="Обновить"/>
            <View style={styles.actionDelete}>
            <Button onPress={() => deleteReview()} color={'red'}   title="Удалить"/>
            </View>
        </View>
    )

}

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
    actionDelete: {
        marginTop:20
    }

});

export default ReviewItemScreen