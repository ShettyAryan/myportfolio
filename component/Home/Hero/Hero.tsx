'use client'

import { BaseInfo } from '@/Data/data'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { FaDownload } from 'react-icons/fa'
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6'
import gsap from 'gsap'

const Hero = () => {
  // Create properly typed refs for elements we want to animate
  const nameRef = useRef<HTMLHeadingElement>(null);
  const positionRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const profileImageRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    // Reset refs array
    iconRefs.current = [];

    // Main timeline for entrance animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Name animation
    tl.fromTo(nameRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 }
    );
    
    // Position title animation
    tl.fromTo(positionRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      "-=0.6" // Start slightly before the previous animation ends
    );
    
    // Description paragraph animation
    tl.fromTo(descriptionRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    );
    
    // Social icons staggered animation (Make sure iconRefs is populated)
    tl.fromTo(iconRefs.current, 
      { opacity: 0, scale: 0.8, y: 20 }, // Initial state (invisible, smaller, moved)
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1 }, // Final state
      "-=0.4"
    );
    
    // Button animation
    tl.fromTo(buttonRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.2"
    );
    
    // Add pulse animation to button
    gsap.to(buttonRef.current, {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut",
      delay: 2 // Start after entrance animations
    });
    
    // Profile image animation (if visible)
    if (profileImageRef.current) {
      tl.fromTo(profileImageRef.current,
        { scale: 0.9, opacity: 0, rotation: -5 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1 },
        "-=1.2"
      );
      
      // Subtle floating animation for the profile image
      gsap.to(profileImageRef.current, {
        y: "-=10",
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut",
        delay: 2 // Start after entrance animations
      });
    }
    
    // Clean up animations when component unmounts
    return () => {
      tl.kill();
      gsap.killTweensOf(buttonRef.current);
      if (profileImageRef.current) {
        gsap.killTweensOf(profileImageRef.current);
      }
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  // Handle hover animation for download button with type-safe implementation
  const handleButtonMouseEnter = () => {
    const downloadIcon = buttonRef.current?.querySelector('svg');
    if (downloadIcon) {
      gsap.to(downloadIcon, {
        x: 3,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleButtonMouseLeave = () => {
    const downloadIcon = buttonRef.current?.querySelector('svg');
    if (downloadIcon) {
      gsap.to(downloadIcon, {
        x: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  };

  return (
    <div className='w-full pt-[4vh] md:pt-[12vh] h-screen bg-[#0f0715] overflow-hidden relative'>
      <div className='flex justify-center flex-col w-4/5 h-full mx-auto'>
        <div className='grid sm:grid-cols-1 lg:grid-cols-2 items-center gap-12'>
          {/* Content */}
          <div>
            <h1 ref={nameRef} className='text-2xl md:text-3xl lg:text-4xl mb-5 text-gray-300 font-semibold'>I am {BaseInfo.name}</h1>
            <h1 ref={positionRef} className='text-bg text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold md:leading-[3rem] lg:leading-[3.5rem] xl:leading-[4rem] text-white'>{BaseInfo.position}</h1>
            <p ref={descriptionRef} className='mt-6 text-sm md:text-base text-white/60 text-justify'>{BaseInfo.description}</p>
            <div ref={socialIconsRef} className='flex items-center gap-4 pt-3'>
              <a ref={el => {iconRefs.current[0] = el}} href="https://www.linkedin.com/in/aryan-shetty-1972012b0" target='_blank' ><FaLinkedin className='text-white w-7 h-7 hover:scale-125 transition-all duration-300'/></a>
              <a ref={el => {iconRefs.current[1] = el}} href={"https://www.instagram.com/shettyaryan01?igsh=MTE2bXZobTQ5ajZucA=="} target='_blank' ><FaInstagram className='text-white w-7 h-7 hover:scale-125 transition-all duration-300'/></a>
              <a ref={el => {iconRefs.current[2] = el}} href={""} target='_blank' ><FaGithub className='text-white w-7 h-7 hover:scale-125 transition-all duration-300'/></a>
              <a ref={el => {iconRefs.current[3] = el}} href={""} target='_blank' ><FaTwitter className='text-white w-7 h-7 hover:scale-125 transition-all duration-300'/></a>
            </div>
            <a 
              href='https://drive.google.com/file/d/1Wr8Y4Y5wE8DSIVjxpN610sPQiTUYOg9R/view?usp=sharing' 
              target='_blank'
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
            >
              <button 
                ref={buttonRef} 
                className='md:px-8 md:py-2.5 px-6 py-1.5 text-white font-semibold text-sm md:text-lg transition-all duration-200 rounded-lg mt-8 bg-blue-700 hover:bg-blue-900 flex items-center space-x-2'
              >
                <span>Download CV</span>
                <FaDownload />
              </button>
            </a>
          </div>
          {/* Image */}
          <div className='mx-auto hidden lg:block rounded-[3rem] border-[3.5px] border-blue-950 overflow-x-hidden'>
            <div ref={profileImageRef}>
              <Image src={BaseInfo.profilePic} alt={BaseInfo.name} width={500} height={500}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
