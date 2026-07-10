import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import Button from '../Misc/Button'
import ProgressBar from './ProgressBar'
import { colors, space, fontSize, font } from '../../styles/theme'

type OnboardingScaffoldProps = {
    step: number // 1-based
    total?: number
    title: string
    subtitle?: string
    children: React.ReactNode
    ctaLabel: string
    onCta: () => void
    ctaDisabled?: boolean
    ctaLoading?: boolean
    onBack?: () => void
    footer?: React.ReactNode
}

export default function OnboardingScaffold({
    step,
    total = 4,
    title,
    subtitle,
    children,
    ctaLabel,
    onCta,
    ctaDisabled,
    ctaLoading,
    onBack,
    footer,
}: OnboardingScaffoldProps) {
    const insets = useSafeAreaInsets()

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={[styles.container, { paddingTop: insets.top + space.sm }]}>
                {/* Header */}
                <View style={styles.header}>
                    {onBack && (
                        <Pressable onPress={onBack} hitSlop={12} style={styles.back}>
                            <MaterialIcons name="chevron-left" size={26} color={colors.textTertiary} />
                        </Pressable>
                    )}
                    <ProgressBar current={step} total={total} />
                </View>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <ScrollView
                        style={styles.flex}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.title}>{title}</Text>
                        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
                        <View style={styles.body}>{children}</View>
                    </ScrollView>
                </TouchableWithoutFeedback>

                {/* Pinned footer */}
                <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, space.lg) }]}>
                    <Button onClick={onCta} disabled={ctaDisabled} loading={ctaLoading} size="lg">
                        {ctaLabel}
                    </Button>
                    {footer}
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    container: { flex: 1, backgroundColor: colors.canvas },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: space.gutter,
        gap: space.md,
        marginBottom: space.xl,
    },
    back: { marginLeft: -6 },
    scrollContent: {
        paddingHorizontal: space.gutter,
        paddingBottom: space.xl,
        flexGrow: 1,
    },
    title: {
        fontFamily: font.bold,
        fontWeight: '800',
        fontSize: fontSize.title1,
        color: colors.textPrimary,
        letterSpacing: -0.3,
    },
    subtitle: {
        fontFamily: font.regular,
        fontSize: fontSize.body,
        lineHeight: fontSize.body * 1.5,
        color: colors.textSecondary,
        marginTop: space.sm,
    },
    body: { marginTop: space.xxl },
    footer: {
        paddingHorizontal: space.gutter,
        paddingTop: space.sm,
        backgroundColor: colors.canvas,
    },
})
