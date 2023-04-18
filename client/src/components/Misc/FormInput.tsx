import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Input, { InputProps } from './Input'

type FormInput = {
    input: InputProps
    label: string
}

export default function FormInput(
    {
        input,
        label,
        ...props
    }: FormInput) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Input
                {...input}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        marginBottom: 10,
    }
});