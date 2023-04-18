// React
import { StyleSheet, Text, View } from 'react-native';

// Components
import Button from '../components/Misc/Button';

// Images
import Cup from '../../assets/images/Welcome/Cup';
import CheckList from '../../assets/images/Welcome/CheckList';
import Goals from '../../assets/images/Welcome/Goals';

export default function Welcome({ navigation }: any) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Welcome to Shad.</Text>
          <Text style={styles.caption}>
            Do you want to become a better version of yourself?
          </Text>
        </View>
        <View style={styles.methodsContainer}>
          <Text>
            Here’s our method to help you :
          </Text>
          <View style={styles.methodContainer}>
            <Goals />
            <Text style={styles.method}>
              Fix your own goals
            </Text>
          </View>
          <View style={styles.methodContainer}>
            <Cup />
            <Text style={styles.method}>
              Fix your own rewards
            </Text>
          </View>
          <View style={styles.methodContainer}>
            <CheckList />
            <Text style={styles.method}>
              Complete your daily
              check-list or... retry
            </Text>
          </View>
        </View>
        <Button
          onClick={() => navigation.navigate('Auth', { screen: "Register" })}
        >
          Get Started
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  caption: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 40,
  },
  methodsContainer: {
    fontFamily: 'Roboto',
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  method: {
    fontSize: 18,
    width: '60%',
  },
});
