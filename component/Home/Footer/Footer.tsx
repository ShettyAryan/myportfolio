import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='pt-16 pb-16 bg-[#0f0715]'>
        <div>
            <Image src={'/images/logo.png'} alt='logo' width={160} height={160} className='mx-auto'/>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-10 text-white font-bold mt-3'>
            <div><Link href={'#home'}>Home</Link></div>
            <div><Link href={'#services'}>Services</Link></div>
            <div><Link href={'#projects'}>Projects</Link></div>
            {/* <div><Link href={'#home'}>Reviews</Link></div> */}
            <div><Link href={'#contact'}>Contact</Link></div>            
        </div>
        <p className='text-white/60 mt-6 text-center'>© 2025 All Rights Reserved by Aryan Shetty</p>
    </div>
  )
}

export default Footer