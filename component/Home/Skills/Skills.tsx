'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '@/component/Helper/SectionHeading'
import { skillsData } from '@/Data/data'
import SkillCard from './SkillCard'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Reset refs on re-render
  cardRefs.current = []

  const addToCardRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardRefs.current[index] = el
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section heading
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        })
      }

      // Animate skill cards with fade and scale-up
      gsap.from(cardRefs.current, {
        opacity: 0,
        scale: 0.9,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="pt-16 pb-16 bg-[#0f0715]">
      <div ref={headingRef}>
        <SectionHeading>My Skills</SectionHeading>
      </div>
      <div className="mt-20 w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center">
        {skillsData.map((item, index) => (
          <div key={item.id} ref={(el) => addToCardRefs(el, index)}>
            <SkillCard item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
