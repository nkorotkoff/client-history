import 'react-native-gesture-handler';
import React, {useEffect, useLayoutEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator} from '@react-navigation/drawer';

import RegisterScreen from "./src/screens/RegisterScreen";
import AddReviewScreen from "./src/screens/AddReviewScreen";
import ReviewsScreen from "./src/screens/ReviewsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import FilterLayout from "./src/components/FilterLayout";
import authStore from "./src/store/auth";
import {NavigationProps} from "./src/interfaces/auth";
import LogoutScreen from "./src/screens/LogoutScreen";


const App = () => {
    const Stack = createNativeStackNavigator();

    const DrawStack = createDrawerNavigator()

    const {isAuthenticated, checkAuth} = authStore((state) => ({isAuthenticated: state.isAuthenticated, checkAuth: state.checkAuth}));

    useLayoutEffect(() => {
            checkAuth()
    }, [])


    return (
        <NavigationContainer>
            {isAuthenticated ?
                <DrawStack.Navigator>
                    <DrawStack.Screen options={{
                        title: 'Список отзывов', headerRight: () => (
                            <FilterLayout/>
                        ),
                    }} name="listOfReviews" component={ReviewsScreen}/>
                    <DrawStack.Screen options={{title: 'Добавить отзыв'}} name="addReview"
                                      component={AddReviewScreen}/>
                    <DrawStack.Screen options={{title: 'Выйти'}} name="logout"
                                      component={LogoutScreen}/>
                </DrawStack.Navigator>
                : <Stack.Navigator>
                    <Stack.Screen options={{title: 'Войти'}} name="Login" component={LoginScreen}/>
                    <Stack.Screen
                        options={{title: 'Зарегистрироваться'}} name="Register" component={RegisterScreen}/>
                </Stack.Navigator>
            }
        </NavigationContainer>
    );
}

export default App;