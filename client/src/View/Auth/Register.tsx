import { useState } from 'react';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';

// Components
import Button from '../../components/Misc/Button';
import FormInput from '../../components/Misc/FormInput';


export default function Register({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    return (
        <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Shad</Text>
                        <Text style={styles.caption}>become your better version</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <FormInput
                            label='Email'
                            input={{
                                placeholder: "Email",
                                value: email,
                                onChange: setEmail,
                                keyboardType: "email-address",
                                autoCapitalize: "none"
                            }}
                        />
                        <FormInput
                            label='Password'
                            input={{
                                placeholder: "Password",
                                value: password,
                                onChange: setPassword,
                                keyboardType: "default",
                                autoCapitalize: "none"
                            }}
                        />
                        <FormInput
                            label='Password confirmation'
                            input={{
                                placeholder: "Password confirmation",
                                value: passwordConfirmation,
                                onChange: setPasswordConfirmation,
                                keyboardType: "default",
                                autoCapitalize: "none"
                            }}
                        />
                        <Button
                            onClick={() => navigation.navigate('Onboarding', { screen: Platform.OS === 'ios' ? 'StepOneIOS' : 'StepOneAndroid' })}
                        >
                            Sign up
                        </Button>
                        {/* horizontal line */}
                        <View style={{ width: '100%', height: 1, backgroundColor: 'black', marginVertical: 20 }} />
                        <View style={styles.loginContainer}>
                            <Text style={{ opacity: 0.3, marginBottom: 10 }}>Already have an account?</Text>
                            <Button
                                primary={false}
                                onClick={() => navigation.navigate('Auth', { screen: "Login" })}
                            >
                                Sign in
                            </Button>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        width: '90%',
        height: '90%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 30,
        marginBottom: 20,
    },
    caption: {
        fontFamily: 'Roboto-Light',
        fontSize: 15,
        marginBottom: 20,
        opacity: 0.3,
        textTransform: 'uppercase',
    },
    titleContainer: {
        alignItems: 'center',
    },
    loginContainer: {
        width: '100%',
        alignItems: 'center',
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
    }
});
