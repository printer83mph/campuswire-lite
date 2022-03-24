import React from 'react'
import { Dialog } from '@headlessui/react'
import { useForm } from 'react-hook-form'

export interface NewQuestionPanelProps {
  open: boolean
  onClose: () => void
  onSubmit: (questionText: string) => void
}

const NewQuestionPanel = (props: NewQuestionPanelProps) => {
  const { open, onClose, onSubmit } = props
  const { register, handleSubmit } = useForm()

  const onFormSubmit = (data: { questionText: string }) =>
    onSubmit(data.questionText)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white rounded-md max-w-sm mx-auto w-96 p-4">
          <Dialog.Title className="mb-4 text-xl font-semibold">
            New Question
          </Dialog.Title>
          <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col">
            <input
              {...register('questionText', { required: true })}
              placeholder="Question"
              className="p-2 shadow"
            />
            <button
              type="submit"
              className="w-auto ml-auto mt-3 px-3 py-2 rounded bg-gray-200"
            >
              Submit Question
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  )
}

export default NewQuestionPanel
