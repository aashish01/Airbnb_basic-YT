import React from 'react'
import Image from 'next/image'

function MediumCard({ title, img }) {
    return (
        <div className='cursor-pointer hover:scale-105 transform 
        transition duration-300 ease-out '>
            <div className='relative h-80 w-80'>
                <Image
                    src={img}
                    layout="fill"
                    className='rounded-xl'
                />
            </div>
            <h3 className='text-2xl mt-3'>
        {/* <h3 className='text-2xl mt-3 absolute top-0 left-5 text-black font-semibold'> */}
                {title}
            </h3>
        </div>
    )
}

export default MediumCard