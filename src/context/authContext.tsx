import { createContext, useContext, useState } from 'react'

interface IContext {
  authState: {
    token: string
  }
  isUserAuthenticated: () => boolean
  setAuthState: (userAuthInfo: string) => void
  logOut: () => void
}

const AuthContext = createContext({} as IContext)
const { Provider } = AuthContext

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState({
    token: ''
  })

  const setUserAuthInfo = (token: string) => {
    sessionStorage.setItem('token', token)

    setAuthState({
      token
    })
  }

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    const token = sessionStorage.getItem('token')
    console.log('Storage Token ' + token)

    if (!token) {
      return false
    }
    return true
  }

  const logOut = () => {
    sessionStorage.clear()
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo: string) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
        logOut
      }}
    >
      {children}
    </Provider>
  )
}

const useUser = () => {
  const user = useContext(AuthContext)
  return { user }
}

export { useUser, AuthProvider }
