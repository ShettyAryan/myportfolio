"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/component/Helper/SectionHeading";
import { projectData } from "@/Data/data";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/component/Loading";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  if (!loading) {
    <Loading />;
  }

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        });
      }

      // Animate project cards
      gsap.from(cardRefs.current, {
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      ScrollTrigger.refresh(); // ensure correct layout
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="pt-16 pb-16 bg-[#050709]">
      <div ref={headingRef}>
        <SectionHeading>My Projects</SectionHeading>
      </div>
      <div className="w-[80%] mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-center">
        {projectData.map((project) => (
          <div
            key={project.id}
            // ref={(el) => {(cardRefs.current[index] = el)}}
            className="bg-blue-950 p-6 rounded-lg hover:scale-105 transition-all duration-300"
          >
            <Link href={project.url} target="_blank">
              <Image
                src={project.image}
                alt="project"
                width={300}
                height={200}
                className="w-full"
              />
            </Link>
            <div className="space-y-3 py-4">
              <h3 className="text-xl font-semibold text-white">
                {project.title}
              </h3>
              <p className="text-sm text-gray-300">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.techStack.map((tech, i) => (
                <span
                  className="bg-blue-800 text-xs px-4 py-2 rounded-full text-white"
                  key={i}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
