import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'

type ButtonProps = {
    onClick: () => void
    primary?: boolean
    children: React.ReactNode,
    style?: any,
    disabled?: boolean,
}

export default function Button(
    {
        onClick,
        children,
        primary = true,
        style,
        disabled = false,
        ...props
    }: ButtonProps) {
    return (
        <TouchableOpacity
            {...props}
            onPress={onClick}
            disabled={disabled}
            style={[
                styles.button,
                disabled ? styles.disabled : {},
                style,
                primary ? { backgroundColor: 'black' } : { backgroundColor: 'white', borderColor: 'black', borderWidth: 1 },
            ]}
        >
            <Text style={[
                styles.labelText,
                primary ? { color: 'white' } : { color: 'black' },
            ]}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 100,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabled: {
        opacity: 0.5,
    }
});