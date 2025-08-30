'use client';
import SectionHeading from '@/component/Helper/SectionHeading';
import { aboutInfo } from '@/Data/data';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Loading from '@/component/Loading';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {

const [loading, setLoading] = useState<boolean>(false)

if(!loading){
 <Loading />
}

useEffect(()=>{
  setLoading(true)
},[])

  // Refs with proper TypeScript types
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Early return if on server-side
    if (typeof window === 'undefined') return;

    // Section background animation
    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        backgroundColor: '#0a0e12',
        duration: 2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          scrub: 1,
        },
      });
    }

    // Section heading animation
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        },
      });
    }

    // Title animation - SIMPLE FADE IN
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 75%',
        },
      });
    }

    // Description animation
    if (descRef.current) {
      gsap.from(descRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        scrollTrigger: {
          trigger: descRef.current,
          start: 'top 75%',
        },
      });
    }

    // Skills animation
    if (skillsRef.current) {
      // Skill items
      gsap.from(skillsRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 70%',
        },
      });

      // Icons
      gsap.from(skillsRef.current.querySelectorAll('.w-7'), {
        scale: 0,
        duration: 0.4,
        stagger: 0.2,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 70%',
        },
      });
    }

    // Stats grid animation
    if (statsRef.current) {
      gsap.from(statsRef.current.children, {
        opacity: 0,
        x: (index) => (index % 2 === 0 ? -50 : 50),
        y: (index) => (index < 2 ? -50 : 50),
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 60%',
        },
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="pt-16 pb-16 bg-[#050709] overflow-hidden">
      <div ref={headingRef}>
        <SectionHeading>About Me</SectionHeading>
      </div>
      <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-20">
        {/* Text content */}
        <div>
          <h1
            ref={titleRef}
            className="text-bg text-[26px] sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-200"
          >
            {aboutInfo.title}
          </h1>

          {/* Rest of the component remains exactly the same */}
          <p
            ref={descRef}
            className="mt-6 text-base text-gray-500 text-justify"
          >
            {aboutInfo.description}
          </p>

          <div ref={skillsRef} className="mt-8">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-7 h-7 bg-blue-800 flex flex-col items-center justify-center">
                <FaCheck className="text-white" />
              </div>
              <p className="text-sm sm:text-base md:text-lg font-bold text-gray-300">
                Frontend Development
              </p>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <div className="w-7 h-7 bg-orange-800 flex flex-col items-center justify-center">
                <FaCheck className="text-white" />
              </div>
              <p className="text-sm sm:text-base md:text-lg font-bold text-gray-300">
                Backend Development
              </p>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <div className="w-7 h-7 bg-green-800 flex flex-col items-center justify-center">
                <FaCheck className="text-white" />
              </div>
              <p className="text-sm sm:text-base md:text-lg font-bold text-gray-300">
                FullStack Development
              </p>
            </div>
          </div>
        </div>

        {/* Stat Content */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 gap-16 items-center lg:mx-auto"
        >
          <div>
            <Image
              src="/images/idea.png"
              alt="Scalable Engineering"
              width={80}
              height={80}
              className="mx-auto"
              priority
            />
            <p className="text-base sm:text-lg text-gray-400 text-center mt-2">
              Scalable Engineering
            </p>
          </div>

          <div>
            <Image
              src="/images/learning.png"
              alt="Product Thinking"
              width={80}
              height={80}
              className="mx-auto"
              priority
            />
            <p className="text-base sm:text-lg text-gray-400 text-center mt-2">
              Product Thinking
            </p>
          </div>

          <div>
            <Image
              src="/images/creativity.png"
              alt="Innovation & Creativity"
              width={80}
              height={80}
              className="mx-auto"
              priority
            />
            <p className="text-base sm:text-lg text-gray-400 text-center mt-2">
              Innovation & Creativity
            </p>
          </div>

          <div>
            <Image
              src="/images/leadership.png"
              alt="Collaboration"
              width={80}
              height={80}
              className="mx-auto"
              priority
            />
            <p className="text-base sm:text-lg text-gray-400 text-center mt-2">
              Collaboration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;