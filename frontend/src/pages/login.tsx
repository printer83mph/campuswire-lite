import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { login, signup } from '../util/api'

const LoginPage = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onLogin = useCallback(
    async (data) => {
      try {
        await login(data.username, data.password)
        navigate('/')
      } catch (err) {
        alert(err)
      }
    },
    [navigate]
  )

  const onSignup = useCallback(
    async (data) => {
      try {
        await signup(data.username, data.password)
        await login(data.username, data.password)
        navigate('/')
      } catch (err) {
        alert(err)
      }
    },
    [navigate]
  )

  return (
    <div className="container max-w-lg mx-auto my-10 px-2">
      <h1 className="text-4xl font-bold mb-4">Authenticate Yo Self</h1>
      <form onSubmit={handleSubmit(onLogin)} className="flex flex-col text-xl">
        <input
          {...register('username', { required: true })}
          type="text"
          placeholder="Your Username"
          className="px-3 py-2 mb-2 rounded shadow"
        />
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Password"
          className="px-3 py-2 mb-4 rounded shadow"
        />
        <div className="flex flex-row justify-end">
          <button
            type="submit"
            className="px-4 py-3 bg-slate-600 text-white rounded-md mr-2 hover:shadow transition-shadow"
          >
            Log in
          </button>
          <button
            type="button"
            className="px-4 py-3 border-slate-300 border-[1px] rounded-md hover:shadow transition-shadow"
            onClick={handleSubmit(onSignup)}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
