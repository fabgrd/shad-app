import { View, StyleSheet } from 'react-native'
import React from 'react'
import Input, { InputProps } from './Input'
import { space } from '../../styles/theme'

type FormInputProps = {
    input: InputProps
    label: string
    error?: string
}

export default function FormInput({ input, label, error }: FormInputProps) {
    return (
        <View style={styles.container}>
            <Input {...input} label={label} error={error ?? input.error} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: space.xl,
    },
})
