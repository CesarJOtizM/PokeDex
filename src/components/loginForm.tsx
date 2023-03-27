import { ErrorMessage, Field, Form, Formik } from 'formik'
import Image from 'next/image'
import { useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import * as Yup from 'yup'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import charizard from '@/images/charizard.png'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Spinner from './spinner'
import logo from '@/images/Logo.png'

interface loginCredentials {
  email: string
  password: string
}
interface inputProps {
  error: boolean
}

const LoginForm: React.FC = () => {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const initialValues: loginCredentials = {
    email: '',
    password: ''
  }
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Ingreses un email valido')
      .required('Ingrese su nombre de usuario'),
    password: Yup.string().required('Ingrese contraseña')
  })

  const handleSubmit = async (values: loginCredentials) => {
    setLoading(true)
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 200) {
      const { accessToken } = await response.json()
      console.log(accessToken)
      sessionStorage.setItem('token', accessToken)
      router.push('/')
      setLoading(false)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El usuario o la contraseña son incorrectos'
      })
      setLoading(false)
    }
  }
  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors, touched }) => (
          <FormStyled method="POST" onSubmit={handleSubmit}>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <Image src={logo} alt="Logo" width={200} priority />
                <H1>Inicio de sesión</H1>
                <InputWrapper>
                  <Label
                    error={errors.email && touched.email ? true : false}
                    htmlFor="email"
                  >
                    Correo electrónico
                  </Label>
                  <InputText
                    error={errors.email && touched.email}
                    id="email"
                    name="email"
                    placeholder="example@gamil.com"
                  />
                  <ErrorWrapper>
                    <ErrorMessage name="email" />
                  </ErrorWrapper>
                </InputWrapper>

                <InputWrapper>
                  <Label
                    error={errors.password && touched.password ? true : false}
                    htmlFor="password"
                  >
                    Contraseña
                  </Label>
                  <PasswordField>
                    <InputText
                      error={errors.password && touched.password}
                      id="password"
                      name="password"
                      type={showPass ? 'text' : 'password'}
                      placeholder="Contraseña"
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <BsEyeSlashFill /> : <BsEyeFill />}
                    </button>
                  </PasswordField>
                  <ErrorWrapper>
                    <ErrorMessage name="password" />
                  </ErrorWrapper>
                </InputWrapper>

                <Button type="submit">Iniciar sesión</Button>
              </>
            )}
          </FormStyled>
        )}
      </Formik>
      <ImgWrapper>
        <Image src={charizard} alt="Poke Api" priority />
      </ImgWrapper>
    </Wrapper>
  )
}

export default LoginForm

const Wrapper = styled.div`
  ${tw`
    w-full
    h-screen
    flex
    justify-center
    relative
    p-5
  `}
`

const FormStyled = styled(Form)`
  ${tw`w-full max-w-md bg-white 
    border border-gray-200 
    rounded-lg shadow
    p-5
    flex
    flex-col
    justify-center
    items-center
    h-fit
    min-h-96
    mt-10
    `}
`
const H1 = tw.h1`
  text-center text-2xl
  font-bold	
  text-blue-700
  my-4
`

const InputWrapper = styled.div`
  ${tw`
  flex
  flex-col
  w-full
  mb-2 z-10
  `}
`
const Label = styled.label`
  ${tw`
  block mb-2 text-sm font-medium text-gray-900 z-10
  `}
  ${(props: inputProps) =>
    props.error &&
    tw`
   text-red-900
  `}
`

const InputText = styled(Field)`
  ${tw`
    bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
   `}
  ${(props: inputProps) =>
    props.error &&
    tw`
    bg-red-50 border-red-500 text-red-900 placeholder-red-700
    focus:ring-red-500 focus:border-red-500
  `}
`

const PasswordField = styled.div`
  ${tw`
    bg-gray-50 border border-gray-300  rounded-lg z-10
    flex
    relative	
   `}

  & button {
    ${tw`
      absolute
      right-2.5
      h-full
      w-fit
      text-xl
      text-blue-900
   `}
  }
`
const ErrorWrapper = styled.div`
  ${tw`
     text-sm text-red-600
   `}
`

const Button = tw.button`
text-white bg-gradient-to-br from-purple-600 to-blue-500 mt-3.5 z-10
hover:bg-gradient-to-bl  hover:scale-105
focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 
`
const ImgWrapper = tw.div`
  absolute
  bottom-0
  
`
