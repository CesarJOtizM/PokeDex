import { pokemonsWithDetail } from '@/libs/getPokemonDetails'
import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import defaultImage from '@/images/pokeball-2.png'
import Modal from '@/hooks/useModal'
import Details from './details'

const Card: React.FC<pokemonsWithDetail> = ({
  image,
  moves,
  name,
  url,
  weight
}) => {
  const date = new Date().toLocaleDateString()
  const [openModal, setOpenModal] = useState(false)

  const handleModal = () => {
    setOpenModal(!openModal)
  }
  return (
    <>
      <Wrapper onClick={handleModal}>
        <ImgWrapper>
          <Img
            src={image ? image : defaultImage}
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
              moves.map(el => (
                <Tags key={el.ability.url}>#{el.ability.name} </Tags>
              ))}
          </TagsWrapper>
        </TextWrapper>
        {openModal && (
          <Modal>
            <Details url={url} closeModal={handleModal} />
          </Modal>
        )}
      </Wrapper>
    </>
  )
}

export default Card

const Wrapper = tw.div`
  max-w-s
  min-h-96
  bg-white
  border
  border-gray-400
  rounded-lg
  shadow-2xl
  overflow-hidden
  w-s
  cursor-pointer
  hover:scale-110 
  transition-all
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
`

const Info = tw.p`
bg-blue-900 text-blue-300 
text-xs font-medium mr-2 
px-2.5 py-0.5 rounded-full
`

const Img = styled(Image)`
  background-size: contain;
  ${tw`
  rounded-t-lg
  w-auto
  h-auto
    `};
`
const TextWrapper = tw.div`
  border-t-2
  px-4
  pt-2
  pb-5
  border-t-indigo-500
`

const Title = tw.div`text-2xl font-extrabold tracking-tight text-black`

const TagsWrapper = tw.div`
flex
flex-wrap
`
const Tags = tw.p`mr-1 text-sm text-green-800 `
