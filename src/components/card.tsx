import { pokemonsWithDetail } from '@/libs/getPokemonDetails'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Card: React.FC<pokemonsWithDetail> = ({
  image,
  moves,
  name,
  url,
  weight
}) => {
  const date = new Date().toLocaleDateString()
  return (
    <Wrapper>
      <ImgWrapper>
        <Img
          src={image}
          alt="Pokemon"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw"
        />
        <InfoWrapper>
          <Info>{date}</Info>
          <Info>Peso: {weight / 10}Kg</Info>
        </InfoWrapper>
      </ImgWrapper>

      <TextWrapper>
        <Title>{name}</Title>
        <TagsWrapper>
          {moves &&
            moves.map(
              (el, i) =>
                i >= 1 && <Tags key={el.ability.url}>#{el.ability.name} </Tags>
            )}
        </TagsWrapper>
      </TextWrapper>
    </Wrapper>
  )
}

export default Card

const Wrapper = tw.div`
  max-w-s
  h-85
  bg-white
  border
  border-gray-400
  rounded-lg
  shadow-2xl
  overflow-hidden
  w-s
`
const ImgWrapper = tw.div`
  relative
  w-full
  h-s
  flex
  p-2
  items-end
`
const InfoWrapper = styled.div`
  ${tw`
  w-full
  flex
  justify-between
  z-10
`}
  &:first-child {
    border: solid 1px red;
  }
`

const Info = tw.p`
  text-white bg-blue-700
  font-medium rounded-full
  text-sm px-2 py-2.5
  text-center
`

const Img = styled(Image)`
  background-size: contain;
  ${tw`
  rounded-t-lg
    `};
`
const TextWrapper = tw.div`
  p-4
  border-t-2
  border-t-indigo-500
`

const Title = tw.div`mb-2 text-2xl font-bold tracking-tight text-black`

const TagsWrapper = tw.div`
flex
flex-wrap
mt-3
`
const Tags = tw.p`mr-1 font-normal text-green-800 `
