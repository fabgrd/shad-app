import { View, StyleSheet, Text } from 'react-native'
import React from 'react'

type SectionProps = {
    children: React.ReactNode,
    title?: string | React.ReactNode
}

const Section = (
    {
        children,
        title
    }
        : SectionProps) => {
    return (
        <View
            style={styles.container}
        >
            {title ?
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: 'Roboto-Bold',
                        marginBottom: 20,
                    }}

                >{title}</Text>
                : null}
            {children}
        </View>
    )
}

export default Section

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '90%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
});