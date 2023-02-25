import React from 'react'

export default function Blog({ title, date, image, description }) {
    
    return (
        <div className='py-12 lg:px-48 md:px-24 px-8'>
            <div className='h-96 w-full'>
                <img src={image} alt="" className='w-full h-full object-cover' />
            </div>
            <div className='py-10'>
                <h1 className='text-2xl sm:text-4xl md:text-5xl font-semibold font-cutiveMono'>{title}</h1>
                <time className="block text-xs sm:text-base text-gray-500 pt-4">
                    {date}
                </time>
            </div>
            <div className='prose md:prose-2xl sm:prose-lg prose-base font-cutiveMono' dangerouslySetInnerHTML={{__html:description}}>
            </div>
        </div>
    )
}
