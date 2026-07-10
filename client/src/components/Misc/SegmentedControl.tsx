import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { colors, radius, space, fontSize, font } from '../../styles/theme'

type Option = { label: string; value: string }

type SegmentedControlProps = {
    label?: string
    options: Option[]
    value: string
    onChange: (value: string) => void
}

export default function SegmentedControl({ label, options, value, onChange }: SegmentedControlProps) {
    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.track}>
                {options.map((opt) => {
                    const selected = opt.value === value
                    return (
                        <Pressable
                            key={opt.value}
                            onPress={() => onChange(opt.value)}
                            style={[styles.segment, selected && styles.segmentSelected]}
                        >
                            <Text style={[styles.segmentText, selected && styles.segmentTextSelected]}>
                                {opt.label}
                            </Text>
                        </Pressable>
                    )
                })}
            </View>
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
    track: {
        flexDirection: 'row',
        backgroundColor: colors.surfaceMuted,
        borderRadius: radius.md,
        padding: 4,
        gap: 4,
    },
    segment: {
        flex: 1,
        height: 44,
        borderRadius: radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    segmentSelected: {
        backgroundColor: colors.surface,
        shadowColor: '#18242A',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    segmentText: {
        fontFamily: font.regular,
        fontSize: fontSize.body,
        color: colors.textSecondary,
    },
    segmentTextSelected: {
        fontFamily: font.bold,
        fontWeight: '700',
        color: colors.textPrimary,
    },
})
