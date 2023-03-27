import Image from 'next/image'
import tw from 'twin.macro'
import logo from '@/images/Logo.png'
import DropDown from './dropDown'

const NavBar: React.FC = () => {
  return (
    <Nav>
      <Wrapper>
        <Image src={logo} alt="Logo" width={160} height={100} priority />

        <DropDown />
      </Wrapper>
    </Nav>
  )
}

export default NavBar

const Nav = tw.header`
w-screen
fixed
top-0
z-30
// [height: inherit]
bg-gradient-to-br from-blue-700 to-purple-300
`

const Wrapper = tw.div`
max-w-8xl
mx-auto
flex
justify-between
items-center
px-3
h-full
`
