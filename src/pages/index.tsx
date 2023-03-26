import Pokedex from '@/components/pokedex'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>

      <Pokedex />
    </>
  )
}
