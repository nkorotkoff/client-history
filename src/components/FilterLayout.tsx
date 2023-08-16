import FilterButton from "./FilterButton";
import Filter from "./Filter";
import {useState} from "react";
import {View} from "react-native";

const FilterLayout = () => {
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const toggleFilter = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    return (
        <View>
            <FilterButton onPress={toggleFilter}></FilterButton>
            <Filter toggleFilter={toggleFilter} isFilterVisible={isFilterVisible}></Filter>
        </View>
    )
}

export default FilterLayout