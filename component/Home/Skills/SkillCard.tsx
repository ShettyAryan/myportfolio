import Image from 'next/image';
import React from 'react'

type Props={
    item: {
        id: number;
        title: string;
        image: string;
        percent: string;
    }
}

const SkillCard = ({item}:Props) => {
    const {image,percent,title}= item;
  return (
    <div className='p-6 hover:bg-blue-900 duration-300 transition-all cursor-pointer text-center rounded-lg bg-gray-900'>
        <Image src={image} alt={title} width={80} height={80} className='object-cover mx-auto'/>
        <h1 className='text-[18px] text-white mt-4 font-[600]'>{title}</h1>
    </div>
  )
}

export default SkillCard