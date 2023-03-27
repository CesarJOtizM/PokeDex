import Pokedex from '@/components/pokedex'
import { useUser } from '@/context/authContext'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    const isAuth = user.isUserAuthenticated()
    if (!isAuth) router.push('/login')
    else router.push('/')
  }, [])

  return (
    <>
      <Head>
        <title>Pokepedia - Pokedex</title>
      </Head>

      <Pokedex />
    </>
  )
}
