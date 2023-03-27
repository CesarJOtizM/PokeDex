import LoginForm from '@/components/loginForm'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import pokeball from '@/images/Pokeball.jpg'
import { useRouter } from 'next/router'
import { useUser } from '@/context/authContext'

const login: NextPage = () => {
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
        <title>Iniciar sesión - Pokepedia</title>
      </Head>

      <Wrapper>
        <LoginForm />
        <ImgWrapper>
          <Image
            src={pokeball}
            alt="Poke Api"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw"
            priority
          />
        </ImgWrapper>
      </Wrapper>
    </>
  )
}

export default login

const Wrapper = styled.div`
  ${tw`
    w-full
    h-screen
    flex
    justify-center
    relative
    md:grid grid-cols-2
  `}
`
const ImgWrapper = tw.div`
    w-full
    h-screen
    justify-center
    relative
    hidden
    md:flex
  `
