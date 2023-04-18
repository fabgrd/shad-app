import { View, Text } from 'react-native'
import React, { useState } from 'react'

// Components
import Input from '../Misc/Input'

type ChipSelectorProps = {
    chipList: string[],
    setChipList: (chipList: string[]) => void,
    placeholder?: string,
}

const Chip = ({ chip, onDelete }: any) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 100,
                padding: 10,
                justifyContent: 'space-between',
                marginVertical: 5,
            }}
        >
            <Text
                style={{
                    fontSize: 16,
                    fontFamily: 'Roboto',
                }}
            >
                {chip}
            </Text>
            <Text
                style={{
                    fontSize: 16,
                    fontFamily: 'Roboto',
                    marginLeft: 10,
                }}
                onPress={() => onDelete(chip)}
            >
                X
            </Text>
        </View>
    )
}

const ChipSelector = (
    {
        chipList,
        setChipList,
        placeholder
    }: ChipSelectorProps) => {
    const [newChip, setNewChip] = useState<string>('');

    const createChip = (chip: string) => {
        if (chip === '') {
            return;
        }
        if (chipList.includes(chip)) {
            setNewChip('');
            return;
        }
        setChipList([...chipList, chip]);
        setNewChip('');
    };

    const deleteChip = (chip: string) => {
        setChipList(chipList.filter((c) => c !== chip));
    };

    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Input
                    placeholder={placeholder || 'Add a chip'}
                    value={newChip}
                    onChange={setNewChip}
                    keyboardType='default'
                    autoCapitalize='none'
                />
                <Text
                    style={{
                        fontSize: 32,
                        position: 'absolute',
                        right: 20,
                        bottom: 15,
                        fontFamily: 'Roboto',
                    }}
                    onPress={() => createChip(newChip)}
                >
                    +
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems:'flex-start',
                }}
            >
                {chipList?.map((chip) => (
                    <Chip
                        chip={chip}
                        onDelete={deleteChip}
                        key={chip}
                    />
                ))}
            </View>
        </View>
    )
}

export default ChipSelector