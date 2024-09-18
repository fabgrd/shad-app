import { View, Text } from 'react-native';
import React, { useState } from 'react';
// Remplacer l'importation depuis @expo/vector-icons par celle de react-native-vector-icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import de l'icône depuis react-native-vector-icons

// Components
import Input from '../Misc/Input';

type ChipSelectorProps = {
  chipList: string[],
  setChipList: (chipList: string[]) => void,
  placeholder?: string,
};

const Chip = ({ chip, onDelete }: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 100,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center', // Aligner le texte et l'icône verticalement
        marginVertical: 5,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Roboto',
          fontWeight: 'bold',
        }}
      >
        {chip}
      </Text>
      <MaterialIcons
        name="close" // Icône de croix
        size={20}
        color="black"
        style={{ marginLeft: 10 }}
        onPress={() => onDelete(chip)}
      />
    </View>
  );
};

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
          alignItems: 'flex-start',
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
  );
};

export default ChipSelector;
