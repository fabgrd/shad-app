import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { useDeleteRewardsMutation } from '../../redux/services/reward';
import Rewards from '../../../assets/images/Onboarding/Rewards'; // Assurez-vous que le chemin est correct
import colors from '../../styles/colors'; // Importation des couleurs

interface Props {
    visible: boolean;
    onClose: () => void;
    userName: string;
    rewardTitle: string;
    rewardId: string;
    rewardCreatedAt: string; // Utilisation de createdAt
}

const CongratulationsModal: React.FC<Props> = ({ visible, onClose, userName, rewardTitle, rewardId, rewardCreatedAt }) => {
    const dispatch = useDispatch();
    const [deleteReward] = useDeleteRewardsMutation();
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
            await deleteReward({ rewardsToRemove: [rewardId] });
            onClose();
        } catch (error) {
            console.error('Error deleting reward:', error);
        }
    };

    // Calcul du nombre de jours écoulés
    const calculateDaysElapsed = (createdAt: string) => {
        const creation = new Date(createdAt);
        const now = new Date();
        const differenceInTime = now.getTime() - creation.getTime();
        return Math.floor(differenceInTime / (1000 * 3600 * 24));
    };

    const daysElapsed = calculateDaysElapsed(rewardCreatedAt);

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalContainer}>
                <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleValue }] }]}>
                    <Text style={styles.congratsText}>Congratulations {userName}!</Text>
                    <Rewards />
                    <Text style={styles.rewardText}>You well deserved...</Text>
                    <Text style={styles.congratsText}>{rewardTitle}</Text>
                    <Text style={styles.daysText}>It took you {daysElapsed} days of routine to achieve this reward!</Text>
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
        padding: 30, // Augmentation du padding
        borderRadius: 10,
        alignItems: 'center',
    },
    congratsText: {
        fontSize: 26, // Augmentation de la taille de la police
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.BLUE,
        textShadowColor: 'rgba(0, 0, 0, 0.25)', // Ajout d'une ombre au texte
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    rewardText: {
        fontSize: 20, // Augmentation de la taille de la police
        marginBottom: 10,
        color: colors.GRAY,
        fontStyle: 'italic', // Ajout d'un style italique
    },
    daysText: {
        fontSize: 18, // Augmentation de la taille de la police
        marginBottom: 20,
        color: colors.LIGHT_GRAY,
        fontWeight: '600', // Ajout d'un poids de police
    },
    closeButton: {
        backgroundColor: colors.ACCENT, // Utilisation de la couleur définie
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18, // Augmentation de la taille de la police
        fontWeight: 'bold', // Ajout d'un poids de police
    },
});

export default CongratulationsModal;
