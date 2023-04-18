import { View, Text } from 'react-native'
import React from 'react'

// Components
import Section from '../Section'
import FeelingInput from '../../Misc/FeelingInput'

type Props = {}

const FeelingRating = (props: Props) => {
  return (
    <Section title="How are you feeling today?">
      <FeelingInput />
    </Section>
  )
}

export default FeelingRating