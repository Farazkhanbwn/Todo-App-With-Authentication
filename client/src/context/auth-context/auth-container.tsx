'use client'
import { FC, PropsWithChildren, useLayoutEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { authStateDefaultValues, AuthType } from './auth-interface'
import AuthService from '@/services/auth-service'
import { AuthProvider } from './auth-context'

const AuthContainer: FC<PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState(authStateDefaultValues)
  const router = useRouter()
  const pathname = usePathname()
  const isOnAuthPath = pathname.includes('login')
  const { current: respectiveAuthService } = useRef({
    //   [AuthType.SIGNIN]: AuthService.signinWithEmailAndPasssword,
    //   [AuthType.SIGNUP]: AuthService.signupWithEmailAndPasssword,
  })

  const checkAuthOnLoad = async () => {
    const { isAuthenticated, data } = await AuthService.validateAuth()
    if (!isAuthenticated && !isOnAuthPath) {
      router.push('/login')
    }
    if (isAuthenticated && isOnAuthPath) {
      router.push('/home')
    }
    setAuthState((prevState) => ({
      ...prevState,
      loading: false,
      isAuthenticated,
      user: data,
    }))
  }

  useLayoutEffect(() => {
    checkAuthOnLoad()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setErrorInState = (authErrors: Record<string, string>) => {
    setAuthState((prevState) => ({
      ...prevState,
      authErrors,
    }))
    return
  }

  // const auth = async (email: string, password: string) => {
  //   const { authErrors, hasErrors } = validateEmailAndPassowrd(email, password)
  //   if (hasErrors) {
  //     setErrorInState(authErrors)
  //     return
  //   }
  //   const { isSignedIn, userData } = await respectiveAuthService[authState.authType](email, password)
  //   if (isSignedIn) {
  //     setAuthState((prevState) => ({
  //       ...prevState,
  //       user: userData,
  //     }))
  //     router.push('/')
  //     return
  //   }
  //   setErrorInState({
  //     form: 'Wrong Credentials',
  //   })
  //   return
  // }

  const loginUser = async (email: string, password: string) => {
    const { isAuthenticated, data } = await AuthService.login(email, password)
    if (isAuthenticated) {
      setAuthState((prevState) => ({
        ...prevState,
        user: data,
      }))
      router.push('/home')
      return
    }
    setErrorInState({
      form: 'Google SignOn failed...',
    })
  }

  // const signout = async () => {
  //   await AuthService.signout()
  //   router.push('/auth')
  //   setAuthState({
  //     ...authStateDefaultValues,
  //     loading: false,
  //   })
  // }

  const signUp = async (email: string, password: string) => {
    const { error, data } = await AuthService.signUp(email, password)
    if (data) {
      setAuthState((prevState) => ({
        ...prevState,
        user: data,
      }))
      router.push('/')
      return
    }
    setErrorInState({
      form: 'SignOn failed...',
    })
  }

  if (authState.loading) {
    return null
  }
  return <AuthProvider value={{ ...authState, loginUser, signUp }}>{children}</AuthProvider>
}

export default AuthContainer
