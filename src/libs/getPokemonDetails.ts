import { results } from '@/pages/api/getPokemons'
import { Abilities, PokemonDetailRaw } from '@/types/pokemon'
import axios from 'axios'

export interface pokemonsWithDetail {
  name: string
  url: string
  image: string
  weight: number
  moves: Abilities[]
}

const getPokemonDetails = async (
  results: results[]
): Promise<pokemonsWithDetail> => {
  return new Promise(async resolve => {
    const max = results.length
    try {
      const pokeDetail: any = []
      results.forEach(async el => {
        const detail = await axios.get(el.url)

        const { data }: { data: PokemonDetailRaw } = detail

        pokeDetail.push({
          ...el,
          image: data.sprites.front_default,
          weight: data.weight,
          moves: data.abilities
        })

        if (pokeDetail.length >= max) return resolve(pokeDetail)
      })
    } catch (error) {
      console.log(error)
    }
  })
}
export { getPokemonDetails }
