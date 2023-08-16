import React from 'react';
import { Button, View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import authStore from "../store/auth";
import {USER_ALREADY_EXISTS} from "../store/requests/requestCodes";

type FormValues = {
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const RegisterScreen: React.FC = () => {

    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            login: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const { registerError, register} = authStore((state) => ({ registerError: state.registerError, register: state.register}));

    const handleRegister = async (values: FormValues) => {
        try {
            console.log('Trying to register with values:' + values)
            await register({login:values.login, password:values.password, email:values.email});
        } catch (error) {
            alert(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                {registerError?.code === USER_ALREADY_EXISTS && <Text style={styles.errorText}>Пользователь с таким email уже существует</Text>}
                {errors.login && <Text style={styles.errorText}>Введите логин</Text>}
                <Controller
                    control={control}
                    name="login"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Логин"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style={styles.input}
                        />
                    )}
                />
                {errors.email && errors.email.type === 'required' && (
                    <Text style={styles.errorText}>Введите Email</Text>
                )}
                {errors.email && errors.email.type === 'pattern' && (
                    <Text style={styles.errorText}>Введите корректный email</Text>
                )}
                <Controller
                    control={control}
                    name="email"
                    rules={{ required: true, pattern: /^\S+@\S+$/i }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style={styles.input}
                        />
                    )}
                />
                {errors.password && errors.password.type === 'required' && (
                    <Text style={styles.errorText}>Введите пароль</Text>
                )}
                {errors.password && errors.password.type === 'minLength' && (
                    <Text style={styles.errorText}>Пароль должен содержать минимум 6 символов</Text>
                )}
                <Controller
                    control={control}
                    name="password"
                    rules={{ required: true, minLength: 6 }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Пароль"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                            style={styles.input}
                        />
                    )}
                />
                {errors.confirmPassword && errors.confirmPassword.type === 'required' && (
                    <Text style={styles.errorText}>Подтвердите пароль</Text>
                )}
                {errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
                    <Text style={styles.errorText}>Пароли не совпадают</Text>
                )}
                <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{ required: true, validate: (value) => value === control._formValues['password'] }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Подтвердите пароль"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                            style={styles.input}
                        />
                    )}
                />
                <TouchableOpacity onPress={handleSubmit(handleRegister)} style={styles.button}>
                    <Text style={styles.buttonText}>Зарегистрироваться</Text>
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
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
});

export default RegisterScreen;