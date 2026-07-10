import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LeagueLeaderBoardProfile from './LeagueLeaderBoardProfile';
import type { NavigationProps } from '../../../types/Props/NavigationProps';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Moment from 'react-moment';

const LeagueLeaderboard = ({ navigation }: NavigationProps) => {
  const user = useSelector((state: any) => state.user.user);
  const { currentLeague } = user;
  
  const [currentLeagueData, setCurrentLeagueData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchLeagueData = async () => {
      try {
        const response = await axios.get(`/api/leagues/${currentLeague}`); // Remplacez par votre URL API
        setCurrentLeagueData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de la ligue :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueData();
  }, [currentLeague]);

  // Si les données sont encore en cours de chargement, affichez un indicateur de chargement
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Tri des membres de la ligue par score
  currentLeagueData?.members?.sort((a: any, b: any) => b.leagueScore - a.leagueScore);
  
  // Hauteur de la tab bar
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 5,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: tabBarHeight + 50,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        {currentLeagueData?.name} ({currentLeague}) League
      </Text>
      <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>
        Top 10 advance to the next league, bottom 5 may be relegated
      </Text>
      <Text style={{ fontSize: 15, marginBottom: 10 }}>
        Reset <Moment element={Text} fromNow>{currentLeagueData?.resetDate}</Moment>
      </Text>

      {currentLeagueData?.members?.map((user: any, index: number) => (
        <View key={user._id} style={{ width: '100%', marginBottom: 10 }}>
          <LeagueLeaderBoardProfile navigation={navigation} position={index + 1} user={user} />
          <Text style={{ textAlign: 'center', color: index < 10 ? 'green' : index >= currentLeagueData.members.length - 5 ? 'red' : 'black' }}>
            {index < 10 ? '🎉 Eligible for promotion!' : index >= currentLeagueData.members.length - 5 ? '⚠️ At risk of relegation' : 'In safe zone'}
          </Text>
          <Text style={{ fontSize: 12, textAlign: 'center', color: 'gray' }}>
            Score: {user.leagueScore} | Position: {index + 1}
          </Text>
        </View>
      ))}

    </ScrollView>
  );
};

export default LeagueLeaderboard;
