'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '@/component/Helper/SectionHeading'
import { servicesData } from '@/Data/data'
import ServiceCard from './ServiceCard'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  // Populate refs for card animations
  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        })
      }

      // Cards animation
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="pt-16 pb-16 bg-[#0f0715]">
      <div ref={headingRef}>
        <SectionHeading>Services</SectionHeading>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mx-auto w-[80%] items-center mt-20">
        {servicesData.map((service) => (
          <div key={service.id} ref={addToCardsRef}>
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
