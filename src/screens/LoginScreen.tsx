import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import {NavigationProps} from '../interfaces/auth';
import authStore from "../store/auth";
import {WRONG_USER_CREDENTIALS} from "../store/requests/requestCodes";

const LoginScreen: React.FC<NavigationProps> = ({navigation}) => {

    const [emailInput, setEmailInput] = useState('');
    const [password, setPassword] = useState('');
    const [showLabels, setShowLabels] = useState(false);

    const login = authStore((state) => state.login)

    const loginError = authStore((state) => state.loginError)

    const handleLogin = async () => {
        if (emailInput.trim() === '' || password.trim() === '') {
            setShowLabels(true);
            return;
        }

        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(emailInput.trim())) {
            Alert.alert('Ошибка','Введите корректный email');
            return;
        }

        try {
            login(emailInput, password)
        } catch (error) {
            alert(error);
        }
    };

    const handleExistingAccount = () => {
        navigation.navigate('Register', {});
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                {
                    loginError && loginError.code === WRONG_USER_CREDENTIALS && (
                        <>
                            <Text style={styles.label}>Неверный Email или пароль</Text>
                        </>
                    )
                }
                {showLabels && (
                    <>
                        <Text style={styles.label}>Email и пароль обязательны к заполнению</Text>
                    </>
                )}
                <TextInput
                    placeholder="Введите Email"
                    value={emailInput}
                    onChangeText={setEmailInput}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Введите пароль"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleExistingAccount} style={styles.link}>
                    <Text style={styles.linkText}>Нет аккаунта? Зарегистрироваться</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    formContainer: {
        width: '80%',
        alignItems: 'center',
    },
    input: {
        alignSelf: 'stretch',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    label: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 5,
        color: 'red',
    },
    button: {
        marginTop: 20,
        width: '100%',
        minHeight: 40,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 10,
    },
    linkText: {
        color: 'blue',
    },
});

export default LoginScreen;
