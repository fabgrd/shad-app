import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

import OnboardingScaffold from '../../components/Onboarding/OnboardingScaffold'
import ChipSelector from '../../components/Onboarding/ChipSelector'
import { useCreateRoutineMutation } from '../../redux/services/routine'
import { colors, radius, space, fontSize, font } from '../../styles/theme'

const TEMPLATES = [
    'Read 10 pages',
    'Meditate',
    'Run 20 min',
    'Learn something new',
    'Listen to a podcast',
    'No phone after 10pm',
]

export default function StepTwo({ navigation }: any) {
    const dispatch = useDispatch()
    const [createRoutine] = useCreateRoutineMutation()

    const [selected, setSelected] = useState<string[]>(['Read 10 pages', 'Meditate'])
    const [custom, setCustom] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const toggle = (t: string) =>
        setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))

    // Custom activities added via the input are always part of the checklist.
    const setCustomList = (list: string[]) => {
        setCustom(list)
        setSelected((s) => {
            const withoutOldCustom = s.filter((x) => TEMPLATES.includes(x) || list.includes(x))
            const added = list.filter((x) => !withoutOldCustom.includes(x))
            return [...withoutOldCustom, ...added]
        })
    }

    const activities = Array.from(new Set(selected))
    const canContinue = activities.length > 0

    const handleContinue = async () => {
        if (!canContinue) return

        dispatch({
            type: 'onboarding/updateStepTwoData',
            payload: { routineActivities: activities, routineDeadline: '', allowNotifications: false },
        })

        // Default the routine deadline to the end of today.
        const deadline = new Date()
        deadline.setHours(23, 59, 0, 0)

        const tasks = activities.map((title) => ({ title, score: 10, completed: false }))

        setLoading(true)
        try {
            await createRoutine({ deadline, cheatDay: false, completed: false, tasks }).unwrap()
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }

        navigation.navigate('Onboarding', { screen: 'StepReward' })
    }

    return (
        <OnboardingScaffold
            step={2}
            total={3}
            title="Choose your daily checklist"
            subtitle="Pick a few to start — you can change these anytime."
            ctaLabel="Continue"
            onCta={handleContinue}
            ctaDisabled={!canContinue}
            ctaLoading={loading}
            onBack={() => navigation.goBack()}
        >
            <View style={styles.chips}>
                {TEMPLATES.map((t) => {
                    const active = selected.includes(t)
                    return (
                        <Pressable
                            key={t}
                            onPress={() => toggle(t)}
                            style={[styles.chip, active && styles.chipActive]}
                        >
                            <Text style={[styles.chipText, active && styles.chipTextActive]}>{t}</Text>
                        </Pressable>
                    )
                })}
            </View>

            <Text style={styles.addLabel}>Add your own</Text>
            <ChipSelector chipList={custom} setChipList={setCustomList} placeholder="Add your own activity" />
        </OnboardingScaffold>
    )
}

const styles = StyleSheet.create({
    chips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: space.sm,
    },
    chip: {
        paddingVertical: space.md,
        paddingHorizontal: space.lg,
        borderRadius: radius.pill,
        backgroundColor: colors.surface,
        borderWidth: 1.5,
        borderColor: colors.border,
    },
    chipActive: {
        backgroundColor: colors.accentSoft,
        borderColor: colors.accent,
    },
    chipText: {
        fontFamily: font.bold,
        fontWeight: '600',
        fontSize: fontSize.label,
        color: colors.textSecondary,
    },
    chipTextActive: { color: colors.accentText },
    addLabel: {
        fontFamily: font.bold,
        fontWeight: '600',
        fontSize: fontSize.label,
        color: colors.textPrimary,
        marginTop: space.xxl,
        marginBottom: space.md,
    },
})
