import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { getPokemonDetails } from '@/libs/getPokemonDetails'
const URI = 'https://pokeapi.co/api/v2/'

export interface results {
  name: string
  url: string
}

interface allPokemons {
  count: number
  next: string | null
  previous: string | null
  results: results[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { offset, limit }
    } = req

    const { data }: { data: allPokemons } = await axios.get(
      `${URI}/pokemon?offset=${offset}&limit=${limit}`
    )

    const { results } = data
    const pokemonDetails = await getPokemonDetails(results)

    res.status(200).json({
      count: data.count,
      next: data.next,
      previous: data.previous,
      results: pokemonDetails
    })
  } catch (error) {
    res.status(500).json({
      error: {
        timestamp: new Date(),
        status: 500,
        error: 'Internal Server Error',
        message: "Could not obtain the pokemon's list",
        path: req.url
      }
    })
  }
}
