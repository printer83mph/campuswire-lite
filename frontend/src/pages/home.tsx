import React, { useCallback, useEffect, useState } from 'react'

import Nav from '../components/nav'
import useAuth from '../hooks/use-auth'
import { getQuestions, logout } from '../util/api'
import { Question } from '../util/types'

const HomePage = () => {
  const [questions, setQuestions] = useState<Question[]>(null)
  const { auth, fetchAuth } = useAuth()

  const getPostsCallback = useCallback(async () => {
    try {
      setQuestions((await getQuestions()).data.questions)
    } catch (err) {
      alert('Something unexpected went wrong!')
    }
  }, [])

  const logoutCallback = useCallback(async () => {
    await logout()
    fetchAuth()
  }, [fetchAuth])

  useEffect(() => {
    getPostsCallback()
  }, [getPostsCallback])

  return (
    <div className="container mx-auto my-10">
      <div className="flex flex-row items-center mb-5">
        <h1 className="font-black text-4xl">Campuswire Lite</h1>
        {/* @ts-ignore */}
        {auth.loading || auth.username === null || (
          <div className="ml-auto flex flex-row items-center text-gray-600">
            {/* @ts-ignore */}
            <p className="mr-2">Welcome {auth.username}!</p>
            <button
              type="button"
              onClick={logoutCallback}
              className="px-3 py-2 rounded hover:shadow transition-shadow"
            >
              Log out
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-row">
        <Nav questions={questions} auth={auth} />
      </div>
    </div>
  )
}

export default HomePage
