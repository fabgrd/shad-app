import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import type { ProfileUserParamsList, AchievementsParamsList } from './ParamList';

export type NavigationProps = {
    navigation: NavigationProp<ParamListBase>,
    route: RouteProp<AchievementsParamsList | ProfileUserParamsList>
}