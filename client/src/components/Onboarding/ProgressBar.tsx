import { View, Text } from 'react-native'
import React from 'react'

import { StyleSheet } from 'react-native'

// Colors

import colors from '../../styles/colors'

type ProgressBarProps = {
    total: number
    current: number
    offColor?: string
    onColor?: string
}

const { LIGHT_BLUE, GRAY } = colors

const ProgressBar = ({
    total,
    current,
    offColor = GRAY,
    onColor = LIGHT_BLUE,
}: ProgressBarProps) => {
    return (
        <View>
            <View style={styles.progressBarContainer}>
                {
                    Array(total)
                        .fill(0)
                        .slice(0, total > 10 ? 10 : total)
                        .map((_, index) => {
                            const isActive = index < (current / (total / (total > 10 ? 10 : total)))
                            return (
                                <View
                                    key={index}
                                    style={{
                                        ...styles.step,
                                        width: `${100 / (total > 10 ? 10 : total)}%`,
                                        ...(index === 0 ? styles.firstStep : {}),
                                        ...((index === total - 1) || (index === (total > 10 ? 10 - 1 : total - 1)) ? styles.lastStep : {}),
                                        ...(isActive ? {
                                            backgroundColor: onColor,
                                        } : {
                                            backgroundColor: offColor,
                                        }),
                                    }}
                                />
                            )
                        })
                }
            </View>
        </View>
    )
}

export default ProgressBar

const styles = StyleSheet.create({
    progressBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    step: {
        height: 20,
    },
    activeStep: {
        opacity: 0.4
    },
    firstStep: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    lastStep: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
})