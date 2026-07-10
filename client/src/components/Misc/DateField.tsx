import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, Modal, Platform, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { MaterialIcons } from '@expo/vector-icons'
import { colors, radius, space, fontSize, font } from '../../styles/theme'

type DateFieldProps = {
    value?: Date
    onChange: (date: Date) => void
    label?: string
    placeholder?: string
    mode?: 'date' | 'time'
    minimumDate?: Date
    maximumDate?: Date
    error?: string
}

function format(value: Date | undefined, mode: 'date' | 'time') {
    if (!value) return ''
    if (mode === 'time') {
        return value.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    }
    return value.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function DateField({
    value,
    onChange,
    label,
    placeholder = 'Select…',
    mode = 'date',
    minimumDate,
    maximumDate,
    error,
}: DateFieldProps) {
    const [show, setShow] = useState(false)
    const [draft, setDraft] = useState<Date>(value ?? new Date())

    const open = () => {
        setDraft(value ?? new Date())
        setShow(true)
    }

    // Android shows a native dialog and fires onChange directly on confirm.
    const onAndroidChange = (event: any, selected?: Date) => {
        setShow(false)
        if (event.type === 'set' && selected) onChange(selected)
    }

    const display = format(value, mode)

    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}
            <Pressable
                onPress={open}
                style={({ pressed }) => [
                    styles.field,
                    error ? styles.fieldError : null,
                    pressed && styles.fieldPressed,
                ]}
            >
                <Text style={[styles.value, !display && styles.placeholder]}>
                    {display || placeholder}
                </Text>
                <MaterialIcons
                    name={mode === 'time' ? 'schedule' : 'calendar-today'}
                    size={20}
                    color={colors.textTertiary}
                />
            </Pressable>
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Android: native dialog rendered inline while `show` is true */}
            {show && Platform.OS === 'android' && (
                <DateTimePicker
                    value={draft}
                    mode={mode}
                    display="default"
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    onChange={onAndroidChange}
                />
            )}

            {/* iOS: bottom-sheet modal with a spinner + Done */}
            {Platform.OS === 'ios' && (
                <Modal visible={show} transparent animationType="slide" onRequestClose={() => setShow(false)}>
                    <Pressable style={styles.backdrop} onPress={() => setShow(false)} />
                    <View style={styles.sheet}>
                        <View style={styles.sheetHeader}>
                            <TouchableOpacity onPress={() => setShow(false)}>
                                <Text style={styles.cancel}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    onChange(draft)
                                    setShow(false)
                                }}
                            >
                                <Text style={styles.done}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            value={draft}
                            mode={mode}
                            display="spinner"
                            themeVariant="light"
                            textColor={colors.textPrimary}
                            minimumDate={minimumDate}
                            maximumDate={maximumDate}
                            onChange={(_, selected) => selected && setDraft(selected)}
                            style={styles.iosPicker}
                        />
                    </View>
                </Modal>
            )}
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
        height: 52,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        borderWidth: 1.5,
        borderColor: colors.border,
        paddingHorizontal: space.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fieldPressed: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
    fieldError: { borderColor: colors.danger },
    value: { fontFamily: font.regular, fontSize: fontSize.body, color: colors.textPrimary },
    placeholder: { color: colors.textTertiary },
    errorText: {
        fontFamily: font.regular,
        fontSize: fontSize.caption,
        color: colors.danger,
        marginTop: space.xs,
    },
    backdrop: { flex: 1, backgroundColor: 'rgba(14,20,23,0.4)' },
    sheet: {
        backgroundColor: colors.surface,
        borderTopLeftRadius: radius.xxl,
        borderTopRightRadius: radius.xxl,
        paddingBottom: space.xxxl,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: space.xl,
        paddingVertical: space.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
    },
    cancel: { fontFamily: font.regular, fontSize: fontSize.bodyLg, color: colors.textTertiary },
    done: { fontFamily: font.bold, fontWeight: '700', fontSize: fontSize.bodyLg, color: colors.accentText },
    iosPicker: { alignSelf: 'center', height: 216, width: '100%' },
})
