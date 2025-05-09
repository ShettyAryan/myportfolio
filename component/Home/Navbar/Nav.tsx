'use client';

import { navLinks } from '@/constant/constant'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { HiBars3BottomRight } from 'react-icons/hi2'
import gsap from 'gsap'

type Props = {
 openNav: () => void
}

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false)

  // References for animation
  const navRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const linkRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fade-in animation for navbar
    gsap.from(navRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out'
    });

    // Fade-in for logo
    gsap.from(logoRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    });

    // Staggered animation for nav links
    gsap.from(linkRefs.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.4,
      ease: 'power3.out',
      stagger: 0.1,
    });

    // Button animation
    gsap.from(buttonRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      delay: 0.6,
      ease: 'back.out(1.7)',
    });

    // Scroll handler for background change
    const handleScroll = () => {
      setNavBg(window.scrollY >= 90);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={navRef} className={`fixed ${navBg ? 'bg-[#240b39]' : 'fixed'} h-[12vh] z-[10] w-full transition-all duration-200`}>
      <div className='flex items-center h-full justify-between w-[95%] sm:w-[90%] xl:[80%] mx-auto'>
        {/* Logo */}
        <Link href={'#hero'} ref={logoRef}>
          <Image src={"/images/logo.png"} alt='logo' width={120} height={120} className='ml-[0.5rem] sm:ml-20 mt-2' />
        </Link>

        <div className='flex items-center space-x-10'>
          <div className='hidden lg:flex items-center space-x-8'>
            {navLinks.map((navlink, index) => (
              <Link key={navlink.id} href={navlink.url}>
               <p ref={(el) => { linkRefs.current[index] = el }} className='nav__link'>{navlink.label}</p>

              </Link>
            ))}
          </div>
          <div ref={buttonRef} className='flex items-center space-x-4'>
            <button className='md:px-10 md:py-3 px-8 py-3 text-blue-800 font-semibold sm:text-base text-sm bg-white hover:bg-gray-200 transition-all duration-200 rounded-lg'>
              <Link href={'#contact'}>Hire Me</Link>
            </button>
            {/* Burger */}
            <HiBars3BottomRight onClick={openNav} className='w-8 h-8 cursor-pointer text-white lg:hidden' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav;
