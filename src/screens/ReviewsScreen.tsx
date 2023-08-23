import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View, ImageSourcePropType} from 'react-native';
import reviewStore from "../store/reviewStore";
import {Review} from "../interfaces/review";
import {translate} from "../utils/translateUtil";
import Loader from "../components/Loader";
import {NavigationProps} from "../interfaces/auth";
import reviewItemStore from "../store/reviewItemStore";

interface IData {
    id: string;
    title: string;
    rating: number;
    date: string;
    type: string;
    image: ImageSourcePropType;
}

interface IItemProps {
    item: Review;
    onPress: () => void;
}

function formatDateFromTimestamp(timestamp: number) {
    const date = new Date(timestamp * 1000);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    return `${day}.${month}.${year}`;
}

const Item = React.memo(({ item, onPress }: IItemProps) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
        {/*<Image source={item.image} style={styles.image} />*/}
        <View style={styles.details}>
            <View style={styles.item_header}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
            <Text style={styles.rating}>Оценка: {item.rating}</Text>
            <Text style={styles.date}>Время создания: {formatDateFromTimestamp(item.created_at)}</Text>
            <Text style={styles.type}>Тип: {translate('base', item.type)}</Text>
        </View>
    </TouchableOpacity>
));

const ReviewsScreen:React.FC<NavigationProps> = ({navigation}) => {
    const [filter, setFilter] = useState<string>('');

    const useReview = reviewStore()
    const useReviewItemStore = reviewItemStore()

    useEffect(() => {
        useReview.setUpType(filter)
    }, [filter])

    useEffect(() => {
        useReview.getReviewsList()
    }, [])

    const renderItem = ({ item }: { item: Review }) => {
        if (filter && item.type !== filter) {
            return null;
        }
        return (
            <Item
                item={item}
                onPress={() => openReviewItem(item.id)}
            />
        );
    };

    const openReviewItem = (reviewId: string) => {
        const Review = useReviewItemStore.getReview(reviewId)
        navigation.navigate('reviewItem', Review)
    }

    const handleFilter = (type: string) => {
        setFilter(type);
    };


    return (
        <View style={styles.container}>
            <>
                {useReview.isLoading && <Loader/>}
            </>
            <View style={styles.filter}>
                <TouchableOpacity onPress={() => handleFilter('')}>
                    <Text style={[styles.filterText, !filter && styles.filterActive]}>Все</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilter('film')}>
                    <Text style={[styles.filterText, filter === 'film' && styles.filterActive]}>Фильмы</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilter('serial')}>
                    <Text style={[styles.filterText, filter === 'serial' && styles.filterActive]}>Сериалы</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilter('anime')}>
                    <Text style={[styles.filterText, filter === 'Аниме' && styles.filterActive]}>Аниме</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilter('book')}>
                    <Text style={[styles.filterText, filter === 'book' && styles.filterActive]}>Книги</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={useReview.reviews}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id}
                onEndReached={() => {useReview.updatePage() }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    image: {
        width: 80,
        height: 120,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    rating: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 5,
    },
    date: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 5,
    },
    type: {
        fontSize: 16,
        color: 'gray',
    },
    filter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
        marginTop:10
    },
    filterText: {
        fontSize: 16,
        color: 'gray',
        marginRight: 10,
    },
    filterActive: {
        fontWeight: 'bold',
        color: 'black',
    },
    item_header: {
        flexDirection: "row",
        justifyContent:"space-between"
    },
});

export default ReviewsScreen