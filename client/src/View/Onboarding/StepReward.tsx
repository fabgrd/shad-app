import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

import Input from '../../components/Misc/Input'
import OnboardingScaffold from '../../components/Onboarding/OnboardingScaffold'
import { useCreateRewardsMutation } from '../../redux/services/reward'
import { useGetUserMutation } from '../../redux/services/auth'
import { colors, radius, space, fontSize, font } from '../../styles/theme'

const DURATIONS = [30, 100, 365]

export default function StepReward({ navigation }: any) {
    const dispatch = useDispatch()
    const [createRewards] = useCreateRewardsMutation()
    const [getUser] = useGetUserMutation()

    const [reward, setReward] = useState('')
    const [days, setDays] = useState(30)
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const error = submitted && !reward.trim() ? 'Name a reward to look forward to.' : undefined

    const finish = async () => {
        setSubmitted(true)
        if (!reward.trim()) return

        dispatch({
            type: 'onboarding/updateStepThreeData',
            payload: { rewards: [{ title: reward.trim(), remainingDays: days }] },
        })

        setLoading(true)
        try {
            await createRewards({ rewards: [{ title: reward.trim(), remainingDays: days }] }).unwrap()
            await getUser({}).unwrap()
            dispatch({ type: 'user/setIsLogged', payload: true })
        } catch (err) {
            console.log(err)
            // Even if the network call fails, complete onboarding so the user isn't stuck.
            dispatch({ type: 'user/setIsLogged', payload: true })
        } finally {
            setLoading(false)
        }
    }

    return (
        <OnboardingScaffold
            step={3}
            total={3}
            title="Set a reward"
            subtitle="Choose something you'll look forward to. You earn it by showing up."
            ctaLabel="Start my journey"
            onCta={finish}
            ctaLoading={loading}
            onBack={() => navigation.goBack()}
        >
            <Input
                label="Your reward"
                placeholder="New running shoes"
                value={reward}
                onChange={setReward}
                autoCapitalize="sentences"
                error={error}
            />

            <Text style={styles.label}>Earn it within</Text>
            <View style={styles.durations}>
                {DURATIONS.map((d) => {
                    const active = d === days
                    return (
                        <Pressable
                            key={d}
                            onPress={() => setDays(d)}
                            style={[styles.duration, active && styles.durationActive]}
                        >
                            <Text style={[styles.durationNum, active && styles.durationNumActive]}>{d}</Text>
                            <Text style={[styles.durationUnit, active && styles.durationUnitActive]}>days</Text>
                        </Pressable>
                    )
                })}
            </View>
        </OnboardingScaffold>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: font.bold,
        fontWeight: '600',
        fontSize: fontSize.label,
        color: colors.textPrimary,
        marginTop: space.xxl,
        marginBottom: space.md,
    },
    durations: {
        flexDirection: 'row',
        gap: space.md,
    },
    duration: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: space.lg,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        borderWidth: 1.5,
        borderColor: colors.border,
    },
    durationActive: {
        backgroundColor: colors.accentSoft,
        borderColor: colors.accent,
    },
    durationNum: {
        fontFamily: font.bold,
        fontWeight: '800',
        fontSize: fontSize.title3,
        color: colors.textPrimary,
    },
    durationNumActive: { color: colors.accentText },
    durationUnit: {
        fontFamily: font.regular,
        fontSize: fontSize.micro,
        color: colors.textTertiary,
        marginTop: 2,
    },
    durationUnitActive: { color: colors.accentText },
})
