import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import defaultImage from '@/images/pokeball-2.png'
import Swal from 'sweetalert2'
import { Abilities, Ability } from '@/types/pokemon'
import Spinner from './spinner'

interface Iprops {
  url: string
  closeModal: () => void
}

const Details: React.FC<Iprops> = ({ url, closeModal }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<any>()
  const date = new Date().toLocaleDateString()

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      try {
        const response = await fetch(url)
        if (response.status === 200) {
          const data = await response.json()
          setData(data)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor revisa la conexión de tu pokedex y vuelve a intentarlo'
        })
        closeModal()
        console.log(error)
      }
    })()
  }, [])

  return (
    <ModalWrapper onClick={closeModal}>
      {loading ? (
        <Spinner />
      ) : (
        <Wrapper>
          <ImgWrapper>
            <Img
              src={data.sprites.front_default}
              alt="Pokemon"
              fill
              sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw"
            />
            <InfoWrapper>
              <Info>{date}</Info>
              <Info>Peso: {data.weight / 10}Kg</Info>
            </InfoWrapper>
          </ImgWrapper>

          <TextWrapper>
            <Title>{data.name}</Title>
            <TagsWrapper>
              {data.abilities &&
                data.abilities.map((el: Abilities) => (
                  <Tags key={el.ability.url}>#{el.ability.name} </Tags>
                ))}
            </TagsWrapper>
          </TextWrapper>
        </Wrapper>
      )}
    </ModalWrapper>
  )
}

export default Details

const ModalWrapper = tw.div`
  fixed top-0
  left-0 right-0
  z-50
  w-full
  p-4 overflow-x-hidden
  overflow-y-auto
  flex
  justify-center
  items-center
  md:inset-0 h-[calc(100%-1rem)] md:h-full
  backdrop-blur
`

const Wrapper = tw.div`
  max-w-2xl
  min-h-96
  bg-white
  border
  border-gray-400
  rounded-lg
  shadow-2xl
  overflow-hidden
  w-80
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
