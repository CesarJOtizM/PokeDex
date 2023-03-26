import Image from 'next/image'
import tw from 'twin.macro'
import logo from '@/images/Logo.png'
const NavBar: React.FC = () => {
  return (
    <Nav>
      <Wrapper>
        <Image src={logo} alt="Logo" width={150} priority />
        <div>Perfil</div>
      </Wrapper>
    </Nav>
  )
}

export default NavBar

const Nav = tw.header`
w-full
fixed
top-0
z-30
bg-gradient-to-br from-blue-700 to-purple-300
`

const Wrapper = tw.div`
max-w-8xl
w-full
h-full
mx-auto
flex
justify-between
items-center
p-2.5
`
