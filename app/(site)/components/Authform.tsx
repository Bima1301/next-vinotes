'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import AuthSocialButton from './AuthSocialButton'
import { BsGithub, BsGoogle } from 'react-icons/bs'

type Variant = 'LOGIN' | 'REGISTER'
export default function Authform() {
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })
    const socialAction = (action: string) => {
        setIsLoading(true);

    }
    return (
        <section className='mt-10'>
            <form action="">
                {variant === 'REGISTER' && (
                    <Input
                        id='name'
                        label='Name'
                        type='text'
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                )}
                <Input
                    id='email'
                    type='email'
                    label='Email'
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    placeholder='Enter your email'
                />
                <Input
                    id='password'
                    type='password'
                    label='Password'
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    placeholder='Enter your password'
                />
                {variant === 'LOGIN' && (
                    <label htmlFor="remember" className='inline-flex items-center text-sm  text-gray-700 mb-1'>
                        <input type="checkbox" name="remember" id="remember" className='mr-1 h-4 w-4 accent-[#946263]' />
                        <span>Remember me</span>
                    </label>
                )}
                <Button disable={isLoading} fullWidth type="submit" className='bg-[#94ADD7] hover:bg-[#8196bb] transition-colors duration-300 mt-8' >
                    {variant === 'REGISTER' ? 'Register' : 'Sign in'}
                </Button>
                <div className="relative mt-5">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500 ">Or continue with</span>
                    </div>
                </div>
                <div className="mt-6 flex gap-2">
                    <AuthSocialButton icon={BsGithub} onClick={() => socialAction('gitbub')} >
                        <p className="font-semibold">Github</p>
                    </AuthSocialButton>
                    <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} >
                        <p className="font-semibold">Google</p>
                    </AuthSocialButton>
                </div>
            </form>
        </section>
    )
}
