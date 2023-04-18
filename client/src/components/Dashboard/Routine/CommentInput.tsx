import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

type Props = {}

const CommentInput = (props: Props) => {
    return (

        <TextInput
            style={{
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                padding: 10,
                textAlignVertical: 'top',
            }}
        >
        </TextInput>
    )
}

export default CommentInput

const styles = StyleSheet.create({})