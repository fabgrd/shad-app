import React, { useMemo, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

import Input from '../../components/Misc/Input'
import OnboardingScaffold from '../../components/Onboarding/OnboardingScaffold'
import { useSignUpMutation } from '../../redux/services/auth'
import { space } from '../../styles/theme'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function StepOne({ navigation }: any) {
    const dispatch = useDispatch()
    const [signUp] = useSignUpMutation()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const errors = useMemo(() => {
        const e: Record<string, string> = {}
        if (!name.trim()) e.name = 'Tell us your name.'
        if (!email.trim()) e.email = 'Email is required.'
        else if (!EMAIL_RE.test(email)) e.email = 'Enter a valid email.'
        if (!password) e.password = 'Choose a password.'
        else if (password.length < 6) e.password = 'At least 6 characters.'
        return e
    }, [name, email, password])

    const isValid = Object.keys(errors).length === 0
    const showError = (key: string) => (submitted ? errors[key] : undefined)

    const handleSubmit = async () => {
        setSubmitted(true)
        if (!isValid) return

        const payload = { name, email, password }
        dispatch({ type: 'onboarding/updateStepOneData', payload })

        setLoading(true)
        try {
            await signUp(payload).unwrap()
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }

        navigation.navigate('Onboarding', { screen: 'StepTwo' })
    }

    return (
        <OnboardingScaffold
            step={1}
            total={3}
            title="Tell us about you"
            subtitle="Just the essentials. This stays private."
            ctaLabel="Continue"
            onCta={handleSubmit}
            ctaLoading={loading}
        >
            <View style={styles.form}>
                <Input
                    label="What should we call you?"
                    placeholder="Camille"
                    value={name}
                    onChange={setName}
                    autoCapitalize="words"
                    error={showError('name')}
                />
                <Input
                    label="Email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={showError('email')}
                />
                <Input
                    label="Password"
                    placeholder="••••••••"
                    value={password}
                    onChange={setPassword}
                    isPassword
                    autoCapitalize="none"
                    error={showError('password')}
                />
            </View>
        </OnboardingScaffold>
    )
}

const styles = StyleSheet.create({
    form: { gap: space.xl },
})
