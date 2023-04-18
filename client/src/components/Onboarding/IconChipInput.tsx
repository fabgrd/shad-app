import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'

// Components
import Input from '../Misc/Input'

type IconChipInputProps = {
  icon: React.FunctionComponent,
  chipList: string[],
  setChipList: (chipList: string[]) => void,
  placeholder?: string
}

type ChipWithIconProps = {
  icon: React.FunctionComponent
  title: string
  description: string
}

const ChipWithIcon = (
  {
    title,
    description,
    icon: Icon,
  }
    : ChipWithIconProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      }}
    >
      {Icon && <Icon />}
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Roboto-Bold',
          marginLeft: 10,
        }}
      >{title}:</Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Roboto',
          marginLeft: 10,
        }}
      >{description}</Text>
    </View>
  )
}

const IconChipInput = (
  {
    icon,
    chipList,
    setChipList,
    placeholder
  }
    : IconChipInputProps) => {
  const [newChip, setNewChip] = useState<string>('')

  const createChip = (chip: string) => {
    if (chip === '') {
      return
    }
    if (chipList.includes(chip)) {
      setNewChip('')
      return
    }
    setChipList([...chipList, chip])
    setNewChip('')
  }

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
          placeholder={placeholder || 'Add a new chip'}
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
      <ScrollView
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          height: '100%'
        }}
      >
        {chipList?.map((chip) => (
          <ChipWithIcon
            key={chip}
            title={chip}
            description="description"
            icon={icon}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default IconChipInput