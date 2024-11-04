import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useGetLeaguesQuery } from '../../redux/services/league';
import Colors from '../../styles/colors';

const LeagueSystemTest = () => {
    const { data: leagues, refetch } = useGetLeaguesQuery();
    const [loading, setLoading] = useState(false);

    const handleCreateMockData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/leagues/mock', {
                method: 'POST'
            });
            const data = await response.json();
            console.log('Mock data created:', data);
            refetch();
        } catch (error) {
            console.error('Error creating mock data:', error);
        }
        setLoading(false);
    };

    const handleProcessPromotions = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/leagues/process', {
                method: 'POST'
            });
            const data = await response.json();
            console.log('Promotions processed:', data);
            refetch();
        } catch (error) {
            console.error('Error processing promotions:', error);
        }
        setLoading(false);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleCreateMockData}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>Create Mock Data</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleProcessPromotions}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>Process Promotions</Text>
                </TouchableOpacity>
            </View>

            {leagues?.map((league, index) => (
                <View key={league._id} style={styles.leagueContainer}>
                    <Text style={styles.leagueTitle}>
                        {league.name} League (Level {league.level})
                    </Text>
                    <Text style={styles.memberCount}>
                        Members: {league.members.length}
                    </Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20
    },
    button: {
        backgroundColor: Colors.BLUE,
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    leagueContainer: {
        padding: 16,
        marginBottom: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8
    },
    leagueTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    memberCount: {
        marginTop: 5,
        color: Colors.GRAY
    }
});

export default LeagueSystemTest;