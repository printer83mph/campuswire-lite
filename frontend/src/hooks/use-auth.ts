import { useCallback, useEffect, useState } from 'react'
import { getUser } from '../util/api'

export type AuthState =
  | { loading: true }
  | { loading: false; username: string | null }

const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({ loading: true })

  const getUserCallback = useCallback(async () => {
    try {
      setAuth({ loading: false, username: (await getUser()).data.username })
    } catch (err) {
      if (err.response) {
        setAuth({ loading: false, username: null })
      } else {
        alert('Something unexpected went wrong!')
      }
    }
  }, [])

  useEffect(() => {
    getUserCallback()
  }, [getUserCallback])

  return { auth, fetchAuth: getUserCallback }
}

export default useAuth
