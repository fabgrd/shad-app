import { View, Text } from 'react-native'
import React from 'react'

// Components
import Section from '../Section'
import CommentInput from './CommentInput'

const Comment = () => {
  return (
    <Section title="Any comment ?">
      <CommentInput />
    </Section>
  )
}

export default Comment