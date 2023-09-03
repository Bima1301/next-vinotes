'use client'

import Input from '@/components/atoms/Input'
import ImageUpload from '@/components/atoms/ImageUpload'
import { TNoteSchema, noteSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { LiaTimesSolid } from 'react-icons/lia'

type CreateModalProps = {
    showModal: boolean
    setShowModal: (value: boolean) => void
}
export default function CreateModal({ showModal, setShowModal, }: CreateModalProps) {
    const [imageData, setImageData] = useState<string | undefined>(undefined);


    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError } = useForm<TNoteSchema>({
        resolver: zodResolver(noteSchema)
    })
    const onSubmit = async (data: TNoteSchema) => {
        toast.loading('Creating note...')
        try {
            const { status } = await axios.post('/api/notes', {
                ...data,
                image: imageData
            })
            if (status === 201) {
                setShowModal(false)
                toast.dismiss()
                toast.success('Note created successfully!')
                reset()
            }
        } catch (error: any) {
            toast.dismiss()
            const { response } = error
            if (response.status === 400) {
                const { errors } = response.data
                if (errors.title) {
                    setError('title', {
                        type: 'server',
                        message: errors.title
                    })
                } else if (errors.content) {
                    setError('content', {
                        type: 'server',
                        message: errors.content
                    })
                } else {
                    toast.error('Something went wrong!')
                }
            } else {
                toast.error(error.response.data || 'Something went wrong!')
            }
        }


    }
    return (
        <>
            <Toaster />
            <Modal open={showModal} onCancel={
                () => setShowModal(false)
            } width={1000} closeIcon={false} footer={false}  >
                <header className='flex justify-between items-center w-full mt-2 mb-5 md:text-2xl text-lg font-semibold'>
                    <p className=''>Add New Note</p>
                    <button onClick={() => setShowModal(false)} >
                        <LiaTimesSolid className="text-gray-500" />
                    </button>
                </header>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ImageUpload
                        id="image" 
                        label="Image" 
                        onChange={(base64: string) => setImageData(base64)} 
                        value={imageData} 
                        disabled={isSubmitting}
                        errors={errors} 
                    />
                    <Input
                        key={'title'}
                        label='Title'
                        placeholder='Title'
                        id='title'
                        type='text'
                        register={register}
                        errors={errors}
                        errorMessage={errors.title?.message}
                    />
                    <Input
                        label='Content'
                        placeholder='Content'
                        id='content'
                        register={register}
                        errors={errors}
                        errorMessage={errors.content?.message}
                    />
                    <div
                        className='flex justify-end gap-2 mt-5'
                    >
                        <button
                            className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300'
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            disabled={isSubmitting}
                            className=
                            {`bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-all duration-300 ${isSubmitting && 'cursor-not-allowed'}`}
                            type='submit'
                        >
                            Save
                            {isSubmitting && (
                                <svg className="animate-spin -mr-1 ml-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                            )}
                        </button>

                    </div>
                </form>
            </Modal>
        </>
    )
}
