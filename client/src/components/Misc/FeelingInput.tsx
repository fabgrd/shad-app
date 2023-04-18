import { View, Text, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import React from 'react'

type Props = {}


// Icons
import AngryIcon from '../../../assets/images/Routine/AngryIcon'
import HappyIcon from '../../../assets/images/Routine/HappyIcon'
import SatisfiedIcon from '../../../assets/images/Routine/SatisfiedIcon'
import NeutralIcon from '../../../assets/images/Routine/NeutralIcon'
import { Circle } from 'react-native-svg'

type BorderedIconProps = {
    id: number,
    icon: React.ReactNode,
    feeling: number,
    mainColor: string,
    setFeeling: (feeling: number) => void
}

const BorderedIcon = ({ mainColor, id, icon, feeling, setFeeling }: BorderedIconProps) => {
    return (
        <TouchableHighlight
            underlayColor='white'
            style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: feeling === id ? mainColor : 'black',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                backgroundColor: 'white',
                zIndex: 1,
                transform: [
                    { scale: feeling === id ? 1.2 : 1 }
                ]
            }}
            onPress={() => setFeeling(id)}
        >
            {icon}
        </TouchableHighlight>
    )
}

const Separator = () => {
    return (
        <View
            style={{
                width: '80%',
                zIndex: 0,
                height: 10,
                borderColor: 'black',
                borderTopWidth: 1.5,
                borderBottomWidth: 1.5
            }}
        />
    )
}

const FeelingInput = (props: Props) => {
    const [feeling, setFeeling] = React.useState(-1)

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    maxWidth: '50%'
                }}
            >
                <BorderedIcon mainColor='#FF7575' id={0} setFeeling={setFeeling} feeling={feeling} icon={<AngryIcon />} />
                <Separator />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '50%',
                }}
            >
                <BorderedIcon mainColor='#FFE500' id={1} setFeeling={setFeeling} feeling={feeling} icon={<NeutralIcon />} />
                <Separator />
                <BorderedIcon mainColor='#2AA0FF' id={2} setFeeling={setFeeling} feeling={feeling} icon={<SatisfiedIcon />} />
                <Separator />
                <BorderedIcon mainColor='#26D998' id={3} setFeeling={setFeeling} feeling={feeling} icon={<HappyIcon />} />
            </View>
        </View>
    )
}

export default FeelingInput