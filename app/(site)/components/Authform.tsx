'use client'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import AuthSocialButton from './AuthSocialButton'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Variant = 'LOGIN' | 'REGISTER'
export default function Authform() {
    const session = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/home');
        }
    }, [session?.status, router]);

    const [variant, setVariant] = useState<Variant>('LOGIN');
    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
                .then(() => signIn('credentials', data))
                .catch((err) => {
                    toast.error(err.response.data);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false,
            }).then((res) => {
                if (res?.error) {
                    toast.error(res?.error);
                }
                if (res?.ok && !res?.error) {
                    toast.success('Logged in successfully');
                    router.push('/home');
                }
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);
        signIn(action, {
            redirect: false,
        }).then((res) => {
            if (res?.error) {
                toast.error(res?.error);
            }

            if (res?.ok && !res?.error) {
                toast.success('Logged in successfully');
            }
        }).finally(() => {
            setIsLoading(false);
        });
    }
    return (
        <section className='md:mt-10 mt-7'>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                />
                <Input
                    id='password'
                    type='password'
                    label='Password'
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                />
                {variant === 'REGISTER' && (
                    <Input
                        id='confirmPassword'
                        type='password'
                        label='Confirm Password'
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                )}
                {/* {variant === 'LOGIN' && (
                    <label htmlFor="remember" className='inline-flex items-center md:text-sm text-xs  text-gray-700 mb-1'>
                        <input type="checkbox" name="remember" id="remember" className='mr-1 h-4 w-4 accent-[#946263]' />
                        <span>Remember me</span>
                    </label>
                )} */}
                <Button disable={isLoading} fullWidth type="submit" className='bg-[#94ADD7]  hover:bg-[#8196bb] transition-colors duration-300 mt-8' >
                    {variant === 'REGISTER' ? 'Register' : 'Sign in'}
                </Button>
                <div className="relative mt-5">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center md:text-sm text-xs">
                        <span className="bg-white px-2 text-gray-500 ">Or continue with</span>
                    </div>
                </div>
                <div className="mt-6 flex gap-2 md:text-sm text-xs">
                    <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} >
                        <p className="font-semibold">Github</p>
                    </AuthSocialButton>
                    <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} >
                        <p className="font-semibold">Google</p>
                    </AuthSocialButton>
                </div>
                <div className='flex flex-row justify-center md:text-sm text-xs mt-6 px-2 text-gray-500 gap-2'>
                    {variant === 'LOGIN' ? "New to Vichat Messenger?" : "Already have an account?"}
                    <span onClick={toggleVariant} className="underline cursor-pointer ">
                        {variant === 'LOGIN' ? "Create an account" : "Login"}
                    </span>
                </div>
            </form>
        </section>
    )
}
