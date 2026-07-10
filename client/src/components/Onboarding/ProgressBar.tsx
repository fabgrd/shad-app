import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors, radius, space } from '../../styles/theme'

type ProgressBarProps = {
    total: number
    current: number
    offColor?: string
    onColor?: string
}

const ProgressBar = ({
    total,
    current,
    offColor = colors.surfaceMuted,
    onColor = colors.accent,
}: ProgressBarProps) => {
    const count = Math.min(total, 10)
    return (
        <View style={styles.container}>
            {Array(count)
                .fill(0)
                .map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.step,
                            { backgroundColor: index < current ? onColor : offColor },
                        ]}
                    />
                ))}
        </View>
    )
}

export default ProgressBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        gap: space.sm,
    },
    step: {
        flex: 1,
        height: 5,
        borderRadius: radius.pill,
    },
})
