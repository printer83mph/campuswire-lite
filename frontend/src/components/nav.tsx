import React, { useCallback, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AuthState } from '../hooks/use-auth'
import { getQuestions, postQuestion } from '../util/api'
import { Question } from '../util/types'
import NewQuestionPanel from './new-question-panel'

export interface NavProps {
  auth: AuthState
}

const Nav = (props: NavProps) => {
  const { auth } = props
  const [showNewQ, setShowNewQ] = useState(false)
  const [questions, setQuestions] = useState<Question[]>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  // @ts-ignore
  const loggedIn = !auth.loading && auth.username !== null

  const getPostsCallback = useCallback(async () => {
    try {
      setQuestions((await getQuestions()).data.questions)
    } catch (err) {
      alert('Something unexpected went wrong!')
    }
  }, [])

  useEffect(() => {
    getPostsCallback()
    const inter = setInterval(getPostsCallback, 2000)
    return () => clearInterval(inter)
  }, [getPostsCallback])

  const onSubmitNewQuestion = async (questionText: string) => {
    setShowNewQ(false)
    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      data: { _id },
    } = await postQuestion(questionText)
    await getPostsCallback()
    setSearchParams({ question: _id })
  }

  return (
    <>
      <nav className="mr-6">
        {questions ? (
          <div className="flex flex-col w-96">
            {loggedIn ? (
              <button
                type="button"
                onClick={() => setShowNewQ(true)}
                className="p-3 bg-blue-500 font-semibold rounded-md text-white mb-3"
              >
                {loggedIn ? 'New question' : 'Sign in to post a question'}
              </button>
            ) : (
              <Link
                to="/login"
                replace={false}
                className="p-3 bg-blue-500 font-semibold rounded-md text-white mb-3"
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
                  className={`p-3 font-semibold rounded-md ${
                    selected ? 'text-gray-900 shadow' : 'text-gray-400'
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
      <NewQuestionPanel
        open={showNewQ}
        onClose={() => setShowNewQ(false)}
        onSubmit={onSubmitNewQuestion}
      />
    </>
  )
}

export default Nav
