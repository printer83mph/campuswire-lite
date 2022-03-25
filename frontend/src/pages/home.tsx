import React, { useCallback } from 'react'

import Nav from '../components/nav'
import QuestionView from '../components/question-view'
import useAuth from '../hooks/use-auth'
import { logout } from '../util/api'

const HomePage = () => {
  const { auth, fetchAuth } = useAuth()

  const logoutCallback = useCallback(async () => {
    await logout()
    fetchAuth()
  }, [fetchAuth])

  return (
    <div className="container mx-auto my-10">
      <div className="flex flex-row items-center mb-6">
        <h1 className="font-black text-4xl">Campuswire Lite</h1>
        {/* @ts-ignore */}
        {auth.loading || auth.username === null || (
          <div className="ml-auto flex flex-row items-center text-gray-600">
            {/* @ts-ignore */}
            <p className="mr-2">Welcome {auth.username}!</p>
            <button
              type="button"
              onClick={logoutCallback}
              className="px-3 py-2 rounded hover:shadow hover:text-black transition-shadow"
            >
              Log out
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-row">
        <Nav auth={auth} />
        <QuestionView auth={auth} />
      </div>
    </div>
  )
}

export default HomePage
