'use client'

import InputForm from '@/components/atoms/InputForm'
import { TNoteSchema, noteSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal, Select, Space } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LiaTimesSolid } from 'react-icons/lia'
import Dragger from 'antd/es/upload/Dragger'
import { BsInbox } from 'react-icons/bs'
import Image from 'next/image'
import { GoDotFill } from 'react-icons/go'

type CreateModalProps = {
    showModal: boolean
    setShowModal: (value: boolean) => void
    category: {} | null
}

export default function CreateModal({ showModal, setShowModal, category }: CreateModalProps) {
    const [categoryList, setCategoryList] = useState<Array<{ value: string, label: string }> | null>(null)
    useEffect(() => {
        if (category) {
            const arrCategory = Object.values(category).map((item: any) => { return { value: item.color, label: item.name } })
            setCategoryList(arrCategory)

        }
    }, [category])
    const { Option } = Select;
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting }, reset, setError } = useForm<TNoteSchema>({
        resolver: zodResolver(noteSchema)
    })
    const imageSrc = watch('imageSrc')


    const onSubmit = async (data: TNoteSchema) => {
        toast.loading('Creating note...')
        setIsLoading(true)
        try {
            const { status } = await axios.post('/api/notes', data)
            if (status === 201) {
                setIsLoading(false)
                setShowModal(false)
                toast.dismiss()
                toast.success('Note created successfully!')
                reset()
            }
        } catch (error: any) {
            setIsLoading(false)
            toast.dismiss()
            const response = error
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

    function handleImageUpload(e: File) {
        const file = e
        if (!file.type.includes('image')) {
            alert('Please upload an image!');

            return;
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            const result = reader.result as string;
            setValue('imageSrc', result, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true
            })
        }
        return false;
    }


    return (
        <Modal open={showModal} onCancel={
            () => setShowModal(false)
        } width={1000} closeIcon={false} footer={false}  >
            <header className='flex justify-between items-center w-full mt-2 mb-5 md:text-2xl text-lg font-semibold'>
                <p className=''>Add New Note</p>
                <button onClick={() => {
                    setShowModal(false);
                    reset();
                }} >
                    <LiaTimesSolid className="text-gray-500" />
                </button>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                {imageSrc && (
                    <div className='flex justify-center mb-3'>
                        <Image src={imageSrc} width={500} height={200} alt='Note Image' />
                    </div>
                )}
                <div className='mb-5'>
                    <Dragger
                        beforeUpload={(e) => handleImageUpload(e)}
                        maxCount={1}
                        onRemove={() => setValue('imageSrc', "")}
                        accept='image/*'
                    >
                        <div className='flex justify-center'>
                            <BsInbox size={50} />
                        </div>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
                </div>
                <InputForm
                    key={'title'}
                    label='Title'
                    placeholder='Title'
                    id='title'
                    type='text'
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    errorMessage={errors.title?.message}
                />
                <InputForm
                    label='Content'
                    placeholder='Content'
                    id='content'
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    errorMessage={errors.content?.message}
                />
                <div className='flex flex-col '>
                    <label className='md:text-sm text-xs font-semibold text-gray-700 mb-1'>Category</label>
                    <Select
                        size='large'
                        style={{ width: '100%' }}
                        placeholder="select one country"
                        defaultValue={['china']}
                        optionLabelProp="label"
                        showSearch
                    >
                        {categoryList?.map((item, index) => (
                            <Option key={index} value={item.value} label={item.label}>
                                <Space>
                                    <GoDotFill size={20}
                                        style={{ color: item.value }}
                                    />
                                    {item.label}
                                </Space>
                            </Option>

                        ))}
                    </Select>
                </div>
                <div
                    className='flex justify-end gap-2 mt-5'
                >
                    <button
                        className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300'
                        onClick={() => {
                            setShowModal(false)
                            reset()
                        }}
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
        </Modal >
    )
}
