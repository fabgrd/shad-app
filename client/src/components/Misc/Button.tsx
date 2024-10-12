import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons' // Assurez-vous d'avoir installé cette bibliothèque
import Colors from '../../styles/colors'

type ButtonProps = {
    onClick: () => void
    primary?: boolean
    children: React.ReactNode,
    style?: any,
    disabled?: boolean,
    icon?: string, // Nouveau prop pour l'icône
    isAddButton?: boolean, // Nouveau prop pour le bouton d'ajout
}

export default function Button(
    {
        onClick,
        children,
        primary = true,
        style,
        disabled = false,
        icon,
        isAddButton = false,
        ...props
    }: ButtonProps) {
    return (
        <TouchableOpacity
            {...props}
            onPress={onClick}
            disabled={disabled}
            style={[
                styles.button,
                disabled ? styles.disabled : {},
                style,
                primary ? { backgroundColor: Colors.BLUE } : { backgroundColor: 'white', borderColor: Colors.BLUE, borderWidth: 1 },
            ]}
        >
            <View style={styles.contentContainer}>
                {isAddButton && <Icon name="add" size={24} color={primary ? 'white' : Colors.BLUE} style={styles.icon} />}
                {icon && !isAddButton && <Icon name={icon} size={24} color={primary ? 'white' : Colors.BLUE} style={styles.icon} />}
                <Text style={[
                    styles.labelText,
                    primary ? { color: 'white' } : { color: Colors.BLUE },
                ]}>
                    {children}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 8,
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabled: {
        opacity: 0.5,
    }
});