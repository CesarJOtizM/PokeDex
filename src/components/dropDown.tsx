import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { createAvatar } from '@dicebear/core'
import { pixelArtNeutral } from '@dicebear/collection'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useUser } from '@/context/authContext'

const DropDown: React.FC = () => {
  const [show, setShow] = useState(false)
  const router = useRouter()
  const { user } = useUser()

  const handleShow = () => {
    setShow(!show)
  }

  const avatar = createAvatar(pixelArtNeutral, {
    seed: 'Felix'
  })

  const img = avatar.toDataUriSync()

  const singOut = () => {
    user.logOut()
    router.push('/login')
  }

  return (
    <Wrapper>
      <button id="dropdownHoverButton" type="button" onClick={handleShow}>
        <Img src={img} alt="Logo" width={50} height={60} priority />
      </button>
      {show && (
        <DropWrapper id="dropdownHover">
          <Ul aria-labelledby="dropdownHoverButton">
            <Li>
              <a href="#">Profile</a>
            </Li>
            <Li onClick={singOut}>
              <a href="#">Sign out</a>
            </Li>
          </Ul>
        </DropWrapper>
      )}
    </Wrapper>
  )
}

export default DropDown

const Wrapper = tw.div`
  relative
`
const DropWrapper = tw.div`
  z-10 
  bg-white 
  divide-y 
  divide-gray-100 
  rounded-lg 
  shadow w-44 
  absolute
  right-0
  top-14
`

const Ul = tw.ul`
  py-2 text-sm text-gray-700 
`
const Li = tw.li`
  block px-4 py-2 hover:bg-gray-100 
`
const Img = styled(Image)`
  ${tw`rounded-full`}
`
