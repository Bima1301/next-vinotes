import React from 'react'
import { GoDotFill } from 'react-icons/go'

export default function Card() {
    return (
        <div className='aspect-square md:max-w-[17rem] md:max-h-[17rem]  max-w-[10rem] flex  flex-col space-y-4 md:p-5 p-4 rounded bg-white shadow-lg'>
            <p className='md:text-sm text-xs'>23 June, 2017</p>
            <p className='inline-flex items-center md:text-xl text-base'><GoDotFill className='text-yellow-300' size={20} /><span>The monkey-rope</span></p>
            <p className='md:text-base text-xs'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, error?</p>
        </div>
    )
}
