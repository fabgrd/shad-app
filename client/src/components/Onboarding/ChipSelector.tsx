import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors, radius, space, fontSize, font } from '../../styles/theme'

type ChipSelectorProps = {
    chipList: string[]
    setChipList: (chipList: string[]) => void
    placeholder?: string
}

const Chip = ({ chip, onDelete }: { chip: string; onDelete: (c: string) => void }) => (
    <View style={styles.chip}>
        <Text style={styles.chipText}>{chip}</Text>
        <Pressable onPress={() => onDelete(chip)} hitSlop={8} style={styles.chipClose}>
            <MaterialIcons name="close" size={15} color={colors.accentText} />
        </Pressable>
    </View>
)

const ChipSelector = ({ chipList, setChipList, placeholder }: ChipSelectorProps) => {
    const [newChip, setNewChip] = useState('')
    const [focused, setFocused] = useState(false)

    const createChip = () => {
        const value = newChip.trim()
        if (!value || chipList.includes(value)) {
            setNewChip('')
            return
        }
        setChipList([...chipList, value])
        setNewChip('')
    }

    const deleteChip = (chip: string) => setChipList(chipList.filter((c) => c !== chip))

    return (
        <View>
            <View style={[styles.field, focused && styles.fieldFocused]}>
                <TextInput
                    placeholder={placeholder || 'Add an activity'}
                    placeholderTextColor={colors.textTertiary}
                    value={newChip}
                    onChangeText={setNewChip}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onSubmitEditing={createChip}
                    returnKeyType="done"
                    autoCapitalize="none"
                    style={styles.input}
                />
                <Pressable onPress={createChip} hitSlop={8} style={styles.add}>
                    <MaterialIcons name="add" size={22} color={colors.textOnAccent} />
                </Pressable>
            </View>

            {chipList.length > 0 && (
                <View style={styles.chipWrap}>
                    {chipList.map((chip) => (
                        <Chip chip={chip} onDelete={deleteChip} key={chip} />
                    ))}
                </View>
            )}
        </View>
    )
}

export default ChipSelector

const styles = StyleSheet.create({
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        borderWidth: 1.5,
        borderColor: colors.border,
        paddingLeft: space.lg,
        paddingRight: space.xs,
    },
    fieldFocused: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
    input: {
        flex: 1,
        fontFamily: font.regular,
        fontSize: fontSize.body,
        color: colors.textPrimary,
        height: '100%',
    },
    add: {
        width: 40,
        height: 40,
        borderRadius: radius.sm,
        backgroundColor: colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chipWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: space.sm,
        marginTop: space.lg,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.accentSoft,
        borderRadius: radius.pill,
        paddingVertical: space.sm,
        paddingLeft: space.lg,
        paddingRight: space.sm,
        gap: space.sm,
    },
    chipText: {
        fontFamily: font.bold,
        fontWeight: '600',
        fontSize: fontSize.label,
        color: colors.accentText,
    },
    chipClose: {
        width: 20,
        height: 20,
        borderRadius: radius.pill,
        backgroundColor: colors.accentSoft2,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
