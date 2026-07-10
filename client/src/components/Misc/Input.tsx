// React
import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Text, KeyboardTypeOptions } from 'react-native'

// Icons
import { Feather } from '@expo/vector-icons'

// Date field
import DateField from './DateField'
import { colors, radius, space, fontSize, font } from '../../styles/theme'

export type InputProps = {
    onChange: (value: any) => void
    value: string | Date
    placeholder: string
    keyboardType?: KeyboardTypeOptions
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
    date?: boolean
    dateMode?: 'date' | 'time'
    isPassword?: boolean
    label?: string
    error?: string
    minimumDate?: Date
    maximumDate?: Date
}

export default function Input({
    onChange,
    value,
    placeholder,
    keyboardType = 'default',
    autoCapitalize = 'none',
    date,
    dateMode,
    isPassword = false,
    label,
    error,
    minimumDate,
    maximumDate,
}: InputProps) {
    const [show, setShow] = useState(false)
    const [focused, setFocused] = useState(false)

    if (date) {
        return (
            <DateField
                value={value instanceof Date ? value : undefined}
                onChange={onChange}
                label={label}
                placeholder={placeholder}
                mode={dateMode}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                error={error}
            />
        )
    }

    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View
                style={[
                    styles.field,
                    focused && styles.fieldFocused,
                    error ? styles.fieldError : null,
                ]}
            >
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={colors.textTertiary}
                    onChangeText={onChange}
                    value={value as string}
                    secureTextEntry={isPassword && !show}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={styles.input}
                />
                {isPassword && (
                    <Feather
                        name={show ? 'eye-off' : 'eye'}
                        size={20}
                        color={colors.textTertiary}
                        onPress={() => setShow(!show)}
                        style={styles.eye}
                    />
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: { width: '100%' },
    label: {
        fontFamily: font.bold,
        fontWeight: '600',
        fontSize: fontSize.label,
        color: colors.textPrimary,
        marginBottom: space.sm,
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        borderWidth: 1.5,
        borderColor: colors.border,
        paddingHorizontal: space.lg,
    },
    fieldFocused: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
    fieldError: { borderColor: colors.danger },
    input: {
        flex: 1,
        fontFamily: font.regular,
        fontSize: fontSize.body,
        color: colors.textPrimary,
        height: '100%',
    },
    eye: { paddingLeft: space.sm },
    errorText: {
        fontFamily: font.regular,
        fontSize: fontSize.caption,
        color: colors.danger,
        marginTop: space.xs,
    },
})
