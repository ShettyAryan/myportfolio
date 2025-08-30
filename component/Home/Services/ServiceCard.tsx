'use client';

import Loading from '@/component/Loading';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'

type Props={
    service:{
    id: number;
    title: string;
    description: string;
    icon: string;
}
}

const ServiceCard = ({service}:Props) => {

const [loading, setLoading] = useState<boolean>(false)

if(!loading){
 <Loading />
}

useEffect(()=>{
  setLoading(true)
},[])

  return (
    <Tilt className='shadow-2xl p-6 rounded-lg bg-[#814ced] flex flex-col  h-full'>
      <Image src={`${service.icon}`} alt={service.description} width={50} height={50}/>
      <h1 className='mt-4 text-lg font-bold text-gray-100'>{service.title}</h1>
      <p className='mt-3 text-sm text-white/80'>{service.description}</p>

    </Tilt>
  )
}

export default ServiceCard