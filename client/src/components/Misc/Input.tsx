// React
import { StyleSheet, TextInput, View, Text } from 'react-native'
import React, { useState } from 'react'

import { KeyboardTypeOptions } from 'react-native'

// Icons
import { Feather } from '@expo/vector-icons';

// Date picker
import DateTimePicker from '@react-native-community/datetimepicker';

export type InputProps = {
    onChange: ([args]: any) => void
    value: string | Date
    placeholder: string
    keyboardType: KeyboardTypeOptions | undefined,
    autoCapitalize: 'none' | 'sentences' | 'words' | 'characters',
    date?: boolean,
    dateMode?: 'date' | 'time',
    isPassword?: boolean,
}

export default function Input(
    {
        onChange,
        value,
        placeholder,
        keyboardType,
        autoCapitalize,
        date,
        dateMode,
        isPassword = false,
        ...props
    }: InputProps) {

    const [show, setShow] = useState(false);
    return (
        date ? (
            <DateTimePicker
                testID="dateTimePicker"
                value={value as Date}
                mode={dateMode || 'date'}
                style={styles.dateInput}
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || value;
                    onChange(currentDate as Date);
                }}
            />
        ) : (
            !isPassword ? (
                <TextInput
                    placeholder={placeholder}
                    onChangeText={text => onChange(text)}
                    value={value as string}
                    secureTextEntry={isPassword}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    style={styles.input}
                    {...props}
                />)
                : (
                    <View>
                        <TextInput
                            placeholder={placeholder}
                            onChangeText={text => onChange(text)}
                            value={value as string}
                            secureTextEntry={!show}
                            keyboardType={keyboardType}
                            autoCapitalize={autoCapitalize}
                            style={styles.input}
                            {...props}
                        />
                        {
                            <View
                                style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: 14,
                                }}
                            >
                                <Text>
                                    {!show ? (
                                        <Feather
                                            name="eye"
                                            size={24}
                                            color="black"
                                            onPress={() => setShow(true)}
                                        />
                                    ) : (
                                        <Feather
                                            name="eye-off"
                                            size={24}
                                            color="black"
                                            onPress={() => setShow(false)}
                                        />
                                    )}
                                </Text>
                            </View>
                        }
                    </View>
                )
        )
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 20,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    dateInput: {
        alignSelf: 'center',
    }
});