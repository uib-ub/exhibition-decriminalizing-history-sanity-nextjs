import React from 'react'
import Profile from './Profile'
import Compact from './Compact'
import ActorCollectionCard from './Card'
import ActorCollectionCards from './Cards'
import Wrapper from '../Wrapper'
import { Text } from '@chakra-ui/layout'

export default function ActorCollection(props) {
  if (!props || props.disabled === true) {
    return null
  }

  if (props?.items && props?.view === 'profile') {
    return (
      <Wrapper>
        <Profile data={props?.items} />
      </Wrapper>
    )
  }
  if (props?.items && props?.view === 'compact') {
    return (
      <Wrapper>
        <Compact data={props?.items} />
      </Wrapper>
    )
  }
  if (props?.items && props?.view === 'card') {
    return (
      <ActorCollectionCards>
        <ActorCollectionCard data={props?.items} />
      </ActorCollectionCards>
    )
  }

  return (
    <Wrapper>
      <Text>Unknown view type</Text>
    </Wrapper>
  )
}
