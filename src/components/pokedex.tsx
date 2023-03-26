import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import forest from '@/images/wallPaper.jpg'
import Card from './card'
import { pokemonsWithDetail } from '@/libs/getPokemonDetails'
import Pagination from './pagination'
import Swal from 'sweetalert2'
import Spinner from './spinner'

interface styledProps {
  image: {
    src: string
  }
}

const Pokedex: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<pokemonsWithDetail[]>()
  const [currentPage, setCurrentPage] = useState<number>(1)
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
    setLoading(true)
    const offset = next ? pageNumber : pageNumber * 10
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
      <header>barra</header>
      {loading ? (
        <Spinner />
      ) : (
        <>
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
        </>
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
  h-full
  min-h-screen
  flex
  items-center
  justify-center
  flex-col
`}
`
const Cards = tw.div`
  p-5
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
