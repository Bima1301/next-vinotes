import Image from 'next/image'
import React from 'react'
import { GoDotFill } from 'react-icons/go'

type CardProps = {
    date: Date
    title: string
    content: string
    image: string | null

}
export default function Card(
    { date, title, content, image }: CardProps
) {
    const stringDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
    return (
        <div className='aspect-square md:w-[17rem] w-[9.4rem] flex  flex-col space-y-4 md:p-5 p-4 rounded bg-white shadow-lg'>
            <p className='md:text-sm text-xs'>
                {stringDate}
            </p>
            <p className='inline-flex items-center md:text-xl text-base font-semibold break-all'><GoDotFill className='text-yellow-300' size={20} />
                {title.length > 20 ? title.slice(0, 20) + '...' : title} </p>
            {
                image ? (
                    <Image
                        src={image}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                        className='rounded-md'
                    />

                ) :
                    (<p className='md:text-base text-xs text-justify'>
                        {content.length > 50 ? content.slice(0, 100) + '...' : content}
                    </p>)
            }
        </div >
    )
}
