import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { AuthState } from '../hooks/use-auth'
import { getQuestion, postAnswer } from '../util/api'
import { Question } from '../util/types'

export interface QuestionViewProps {
  auth: AuthState
}

const QuestionView = ({ auth }: QuestionViewProps) => {
  const [question, setQuestion] = useState<Question>(null)
  const [error, setError] = useState<number | null>(null)
  const { search } = useLocation()
  const { register, reset, handleSubmit } = useForm()

  const fetchQuestion = useCallback(async () => {
    const id = new URLSearchParams(search).get('question')
    if (!id || id.length === 0) {
      setError(-2)
      return
    }
    setQuestion(null)
    try {
      const { data } = await getQuestion(id)
      setQuestion(data.question)
      setError(null)
      reset()
    } catch (e) {
      setError(e.response?.status || -1)
    }
  }, [search, reset])

  useEffect(() => {
    fetchQuestion()
  }, [fetchQuestion, search])

  const onSubmit = useCallback(
    async ({ answer }: { answer: string }) => {
      // eslint-disable-next-line no-underscore-dangle
      await postAnswer(question!._id, answer)
      await fetchQuestion()
    },
    [fetchQuestion, question]
  )

  return error ? (
    <div className="mx-auto text-xl">
      {error === -2 && `Select a post fool`}
      {error === -1 && `Post not found!`}
      {error >= 0 && `Error ${error}`}
    </div>
  ) : (
    <article>
      {question ? (
        <>
          <h2 className="mb-1">{question.author} asks:</h2>
          <h1 className="text-xl font-bold mb-3">{question.questionText}</h1>
          {question.answer && <p className="mb-4">Answer: {question.answer}</p>}
          {/* @ts-ignore */}
          {auth.username && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register('answer')}
                type="text"
                placeholder="Answer"
                className="p-2 shadow mr-3 rounded"
              />
              <button type="submit" className="bg-gray-200 px-3 py-2 rounded">
                Post Answer
              </button>
            </form>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </article>
  )
}

export default QuestionView
