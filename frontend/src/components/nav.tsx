import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AuthState } from '../hooks/use-auth'
import { Question } from '../util/types'
import NewQuestionPanel from './new-question-panel'

export interface NavProps {
  questions: Question[]
  auth: AuthState
}

const Nav = (props: NavProps) => {
  const { questions, auth } = props
  const [newQ, setNewQ] = useState(false)
  const [searchParams] = useSearchParams()

  // @ts-ignore
  const loggedIn = !auth.loading && auth.username !== null

  return (
    <>
      <nav>
        {questions ? (
          <div className="flex flex-col w-96">
            {loggedIn ? (
              <button
                type="button"
                onClick={() => setNewQ(true)}
                className="p-3 bg-blue-200 font-semibold"
              >
                {loggedIn ? 'New question' : 'Sign in to post a question'}
              </button>
            ) : (
              <Link
                to="/login"
                replace={false}
                className="p-3 bg-blue-200 font-semibold"
              >
                Sign in to post a question
              </Link>
            )}

            {questions.map(({ questionText, _id }) => {
              const selected = searchParams.get('question') === _id
              return (
                <Link
                  key={_id}
                  to={{ search: `?question=${_id}` }}
                  replace
                  className={`p-3 font-semibold ${
                    selected ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {questionText}
                </Link>
              )
            })}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </nav>
      {/* {newQ && <NewQuestionPanel onClose={() => setNewQ(false)} />} */}
    </>
  )
}

export default Nav
