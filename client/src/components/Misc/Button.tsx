import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator, ViewStyle } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors, radius, space, fontSize, font, shadow } from '../../styles/theme'

type Variant = 'accent' | 'ink' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

type ButtonProps = {
    onClick: () => void
    children: React.ReactNode
    /** Legacy prop: primary=true → accent fill, primary=false → secondary outline. */
    primary?: boolean
    /** Overrides `primary` when set. */
    variant?: Variant
    size?: Size
    fullWidth?: boolean
    style?: ViewStyle | ViewStyle[]
    disabled?: boolean
    loading?: boolean
    icon?: keyof typeof MaterialIcons.glyphMap
    isAddButton?: boolean
}

export default function Button({
    onClick,
    children,
    primary = true,
    variant,
    size = 'lg',
    fullWidth = true,
    style,
    disabled = false,
    loading = false,
    icon,
    isAddButton = false,
}: ButtonProps) {
    const resolved: Variant = variant ?? (primary ? 'accent' : 'secondary')
    const v = VARIANTS[resolved]
    const iconName = isAddButton ? 'add' : icon
    const isDisabled = disabled || loading

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onClick}
            disabled={isDisabled}
            style={[
                styles.base,
                size === 'lg' ? styles.lg : styles.md,
                fullWidth && styles.fullWidth,
                { backgroundColor: v.bg, borderColor: v.border, borderWidth: v.border ? 1.5 : 0 },
                v.shadow && !isDisabled ? shadow.sm : null,
                isDisabled && styles.disabled,
                style as ViewStyle,
            ]}
        >
            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator color={v.fg} />
                ) : (
                    <>
                        {iconName && (
                            <MaterialIcons name={iconName} size={size === 'lg' ? 22 : 20} color={v.fg} style={styles.icon} />
                        )}
                        <Text style={[styles.label, { color: v.fg, fontSize: size === 'lg' ? fontSize.bodyLg : fontSize.body }]}>
                            {children}
                        </Text>
                    </>
                )}
            </View>
        </TouchableOpacity>
    )
}

const VARIANTS: Record<Variant, { bg: string; fg: string; border?: string; shadow?: boolean }> = {
    accent: { bg: colors.accent, fg: colors.textOnAccent, shadow: true },
    ink: { bg: colors.ink, fg: colors.textOnAccent, shadow: true },
    secondary: { bg: colors.surface, fg: colors.textPrimary, border: colors.border },
    ghost: { bg: 'transparent', fg: colors.accentText },
}

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.lg,
        paddingHorizontal: space.xxl,
    },
    md: { height: 46 },
    lg: { height: 54 },
    fullWidth: { width: '100%', alignSelf: 'stretch' },
    content: { flexDirection: 'row', alignItems: 'center' },
    icon: { marginRight: space.sm },
    label: { fontFamily: font.bold, fontWeight: '700', letterSpacing: 0.1 },
    disabled: { opacity: 0.45 },
})
