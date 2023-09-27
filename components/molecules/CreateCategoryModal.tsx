'use client'

import { ColorPicker, Input, Modal } from 'antd'
import { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { LiaTimesSolid } from 'react-icons/lia'
import createCategory from '@/actions/createCategory'
import { categoryType } from '@/lib/types'
import Button from '../atoms/Button'

type CreateCategoryModalProps = {
    showModal: boolean
    setShowModal: (value: boolean) => void
}
export default function CreateCategoryModal({ showModal, setShowModal, }: CreateCategoryModalProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>(null);

    const [categoryForm, setCategoryForm] = useState<categoryType>({
        name: '',
        color: ''
    })

    const createCategoryAction = async () => {
        setIsLoading(true)
        const response = await createCategory(categoryForm)
        if (response.status === "error") {
            toast.dismiss()
            setIsLoading(false)
            if (response.type === "validation") {
                setErrors(response.errors)
                return
            } else {
                toast.error(response.message)
                return
            }
        }
        if (response.status === "success") {
            formRef.current?.reset()
            setIsLoading(false)
            toast.success(response.message)
            setErrors(null)
            setShowModal(false)
        }
    }

    console.log("errors", errors);
    return (
        <>
            <Toaster />
            <Modal open={showModal} onCancel={
                () => setShowModal(false)
            } width={1000} closeIcon={false} footer={false}  >
                <header className='flex justify-between items-center w-full mt-2 mb-5 md:text-2xl text-lg font-semibold'>
                    <p className=''>Add New Category</p>
                    <button onClick={() => setShowModal(false)} >
                        <LiaTimesSolid className="text-gray-500" />
                    </button>
                </header>

                <form
                    ref={formRef}
                    action={createCategoryAction}
                >
                    <div className='flex flex-col items-start w-full mb-3'>
                        <label htmlFor="name" className='md:text-sm text-xs font-semibold text-gray-700 mb-1'>Name
                            <span className='text-red-500'>*</span>
                        </label>
                        <Input
                            size='large'
                            type="text"
                            className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                            placeholder='Category Name'
                            id='name'
                            disabled={isLoading}
                            onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        />
                        {errors?.name && <small className='text-red-500 text-sm mt-1'>{errors.name[0]}  </small>}
                    </div>

                    <div
                        className='flex flex-col items-start w-full mb-3'
                    >
                        <label htmlFor="name" className='md:text-sm text-xs font-semibold text-gray-700 mb-1'>Color
                            <span className='text-red-500'>*</span>
                        </label>
                        <ColorPicker showText
                            disabled={isLoading}
                            onChange={(e, hex) => setCategoryForm({ ...categoryForm, color: hex })}
                        />
                        {errors?.color && <small className='text-red-500 text-sm mt-1'>{errors.color[0]}  </small>}
                    </div>

                    <div
                        className='flex justify-end gap-2 mt-5'
                    >
                        <button
                            className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300'
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                        <Button
                            className=
                            {`bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-all duration-300`}
                            type='submit'
                            onClick={() => setIsLoading(true)}
                        >
                            Save
                        </Button>

                    </div>
                </form>
            </Modal>
        </>
    )
}
