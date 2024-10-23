import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { useDeleteGoalsMutation } from '../../redux/services/goal';
import Goals from '../../../assets/images/Onboarding/Rewards'; // Assurez-vous que le chemin est correct
import colors from '../../styles/colors'; // Importation des couleurs

interface Props {
    visible: boolean;
    onClose: () => void;
    userName: string;
    goalTitle: string;
    goalId: string;
    goalCreatedAt: string;
}

const CongratulationsModalForGoals: React.FC<Props> = ({ visible, onClose, userName, goalTitle, goalId, goalCreatedAt }) => {
    const dispatch = useDispatch();
    const [deleteGoal] = useDeleteGoalsMutation();
    const scaleValue = new Animated.Value(0);

    React.useEffect(() => {
        if (visible) {
            Animated.spring(scaleValue, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }).start();
        } else {
            scaleValue.setValue(0);
        }
    }, [visible]);

    const handleClose = async () => {
        try {
            await deleteGoal({ goalsToRemove: [goalId] });
            onClose();
        } catch (error) {
            console.error('Error deleting goal:', error);
        }
    };

    const calculateDaysElapsed = (createdAt: string) => {
        const creation = new Date(createdAt);
        const now = new Date();
        const differenceInTime = now.getTime() - creation.getTime();
        return Math.floor(differenceInTime / (1000 * 3600 * 24));
    };

    const daysElapsed = calculateDaysElapsed(goalCreatedAt);

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalContainer}>
                <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleValue }] }]}>
                    <Text style={styles.congratsText}>Congratulations {userName}!</Text>
                    <Goals />
                    <Text style={styles.goalText}>You well deserved...</Text>
                    <Text style={styles.congratsText}>{goalTitle}</Text>
                    <Text style={styles.daysText}>It took you {daysElapsed} days of routine to achieve this goal!</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    congratsText: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.BLUE,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    goalText: {
        fontSize: 20,
        marginBottom: 10,
        color: colors.GRAY,
        fontStyle: 'italic',
    },
    daysText: {
        fontSize: 18,
        marginBottom: 20,
        color: colors.LIGHT_GRAY,
        fontWeight: '600',
    },
    closeButton: {
        backgroundColor: colors.ACCENT,
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CongratulationsModalForGoals;
