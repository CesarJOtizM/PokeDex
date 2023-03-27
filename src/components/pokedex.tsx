import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import forest from '@/images/wallPaper.jpg'
import Card from './card'
import { pokemonsWithDetail } from '@/libs/getPokemonDetails'
import Pagination from './pagination'
import Swal from 'sweetalert2'
import Spinner from './spinner'
import NavBar from './navBar'

interface styledProps {
  image: {
    src: string
  }
}

const Pokedex: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<pokemonsWithDetail[]>()
  const [currentPage, setCurrentPage] = useState<number>(2)
  const [loading, setLoading] = useState<boolean>(true)
  const [totalPokemons, setTotalPokemons] = useState<number>(0)

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      try {
        const response = await fetch('/api/getPokemons/?offset=0&limit=10')
        if (response.status === 200) {
          const { results, count } = await response.json()
          setPokemonList(results)
          setTotalPokemons(count)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor revisa la conexión de tu pokedex y vuelve a intentarlo'
        })
        console.log(error)
      }
    })()
  }, [])

  const handleChangePage = async (pageNumber: number, next = false) => {
    if (pageNumber == currentPage) return

    setLoading(true)
    let offset = 0

    if (pageNumber == 1 || pageNumber == 10) {
      offset = 0
    } else if (next) {
      offset = pageNumber
    } else offset = pageNumber * 10

    try {
      const response = await fetch(
        `/api/getPokemons/?offset=${offset}&limit=10`
      )
      if (response.status === 200) {
        const { results } = await response.json()
        setPokemonList(results)
        setCurrentPage(next ? pageNumber / 10 : pageNumber)

        setLoading(false)
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor revisa la conexión de tu pokedex y vuelve a intentarlo'
      })
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <Wrapper image={forest}>
      <NavBar />
      {loading ? (
        <WrapperLoader>
          <Spinner />
        </WrapperLoader>
      ) : (
        <CardsWrapper>
          <Cards>
            {pokemonList &&
              pokemonList.map(el => (
                <Card
                  key={el.name}
                  name={el.name}
                  image={el.image}
                  moves={el.moves}
                  url={el.url}
                  weight={el.weight}
                />
              ))}
          </Cards>
          <Pagination
            currentPage={currentPage}
            items={totalPokemons}
            itemsPerPage={10}
            onChangePage={handleChangePage}
          />
        </CardsWrapper>
      )}
    </Wrapper>
  )
}

export default Pokedex

const Wrapper = styled.div`
  background-image: url(${(props: styledProps) => props.image.src});
  background-size: cover;
  z-index: -10;

  ${tw`
  w-full
  h-fit	
  min-h-screen
  md:grid
  gap-5
  items-center
  justify-center
  flex-col
  md:[grid-template-rows: 75px auto]
`};
`
const Cards = tw.div`
  max-w-8xl
  mx-auto
  flex
  flex-col
  justify-center
  items-center
  gap-2.5
  flex-wrap
  md:flex-row md:gap-5
`

const CardsWrapper = tw.div`
row-start-2	
h-full
mt-20
md:mt-0
`
const WrapperLoader = tw.div`
h-full
row-start-2
min-h-screen
flex
justify-center
`
