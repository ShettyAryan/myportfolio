"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../Helper/SectionHeading";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string[];
  technologies: string[];
}

interface ExperienceTimelineProps {
  experiences?: Experience[];
}

const ExperienceTimeline = ({
  experiences = defaultExperiences,
}: ExperienceTimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const markersRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

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
      gsap.from(cardRefs.current.filter(Boolean), {
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { height: 0 },
          {
            height: "100%",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
          }
        );
      }

      // Animate cards and markers
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const marker = markersRef.current[index];
        const isEven = index % 2 === 0;

        // Card animation
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            x: isEven ? -50 : 50,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Marker animation
        if (marker) {
          gsap.fromTo(
            marker,
            {
              scale: 0,
              backgroundColor: "#4a5568",
            },
            {
              scale: 1,
              backgroundColor: "#804cec",
              duration: 0.5,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, timelineRef);

    return () => ctx.revert();
  }, [experiences]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#080d0e] py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={headingRef}>
          <SectionHeading>Experience</SectionHeading>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative mt-12">
          {/* Timeline Line */}
          <div className="absolute left-1/2 -top-2 transform -translate-x-1/2 w-1 bg-gray-700 h-full hidden md:block">
            <div
              ref={lineRef}
              className="w-full bg-gradient-to-b from-[#804cec] to-[#250a39] transition-all duration-300"
              style={{ height: 0 }}
            />
          </div>

          {/* Mobile Timeline Line */}
          <div className="absolute left-8 w-1 bg-gray-700 h-full md:hidden">
            <div
              ref={lineRef}
              className="w-full bg-gradient-to-b from-[#804cec] to-[#250a39] transition-all duration-300"
              style={{ height: 0 }}
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative">
                  {/* Timeline Marker */}
                  <div
                    ref={(el) => {
                      if (el && !markersRef.current[index]) {
                        markersRef.current[index] = el;
                      }
                    }}
                    className="absolute left-1/2 -top-8 transform -translate-x-1/2 w-6 h-6 bg-[#804cec] rounded-full border-4 border-[#080d0e] z-9 hidden md:block shadow-lg shadow-[#804cec]/30"
                  />

                  {/* Mobile Timeline Marker */}
                  <div
                    ref={(el) => {
                      if (el && !markersRef.current[index]) {
                        markersRef.current[index] = el;
                      }
                    }}
                    className="absolute left-8 transform -translate-x-1/2 w-4 h-4 bg-[#804cec] rounded-full border-2 border-[#080d0e] z-9 md:hidden shadow-lg shadow-[#804cec]/30"
                  />

                  {/* Experience Card */}
                  <div
                    ref={(el) => {
                      cardRefs.current[index] = el;
                      cardsRef.current[index] = el;
                    }}
                    className={`
                      relative bg-[#172456] rounded-2xl p-6 md:p-8 shadow-2xl 
                      border border-gray-700/30 backdrop-blur-sm
                      hover:shadow-[#804cec]/20 hover:shadow-2xl hover:-translate-y-2
                      transition-all duration-300 group
                      ${isEven ? "md:mr-[55%] md:ml-0" : "md:ml-[55%] md:mr-0"}
                      ml-20 md:ml-auto md:mr-auto
                    `}
                  >
                    {/* Connector Line to Timeline (Desktop) */}
                    {/* <div
                      className={`
                        absolute top-8 w-8 h-0.5 bg-[#804cec] hidden md:block
                        ${
                          isEven
                            ? "right-0 translate-x-8"
                            : "left-0 -translate-x-8"
                        }
                      `}
                    /> */}

                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#804cec]/10 to-[#250a39]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-9">
                      {/* Company and Duration */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#804cec] transition-colors duration-300">
                          {exp.company}
                        </h3>
                        <span className="text-[#804cec] font-semibold text-sm md:text-base mt-1 md:mt-0">
                          {exp.duration}
                        </span>
                      </div>

                      {/* Role */}
                      <h4 className="text-xl text-gray-300 font-semibold mb-4">
                        {exp.role}
                      </h4>

                      {/* Description */}
                      <ul className="space-y-2 mb-6 text-gray-300">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-[#804cec] mr-3 text-sm">
                              ▸
                            </span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-[#250a39] text-[#804cec] rounded-full text-sm font-medium border border-[#804cec]/30 hover:bg-[#804cec]/10 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#804cec]"></div>
            <span className="text-sm">Ready for the next opportunity</span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#804cec]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Default experience data
const defaultExperiences: Experience[] = [
  {
    company: "TATA Consultancy Services (TCS)",
    role: "AI Intern",
    duration: "Jun 2025 - Aug 2025",
    description: [
      "Developed an AI-powered financial advisory tool delivering personalized mutual fund recommendations based on user profile, chat history, and context-aware inputs",
      "Built a full-stack application supporting email notifications, SIP reminders, and WhatsApp confirmations using agentic workflows",
      "Contributed to a modular, multi-agent architecture integrating mutual fund, fixed deposit, lending, and real estate advisors to deliver holistic financial guidance",
      "Applied Generative AI, agent orchestration, and full-stack engineering to build scalable financial automation systems",
    ],
    technologies: [
      "Next.js",
      "FastAPI",
      "Supabase",
      "Green API",
      "LangChain",
      "Tavily",
      "Gemini",
      "Mistral",
      "Twilio (SendGrid)",
    ],
  },
  {
    company: "AIGenAgentic Solutions, Ireland (Remote)",
    role: "Freelance Full-Stack Developer (Contract)",
    duration: "Aug 2025",
    description: [
      "Designed, built, and deployed the agency’s public website using NextJS, TailwindCSS, TypeScript, and MongoDB",
      "Integrated scheduling functionality with automated confirmations",
      "Set up hosting, deployment workflows, and analytics for production readiness",
      "Delivered within tight timelines, enabling the agency to launch operations",
    ],
    technologies: [
      "Next.js",
      "TailwindCSS",
      "TypeScript",
      "MongoDB",
      "Vercel",
      "Google Analytics",
      "NodeMailer"
    ],
  },
];


export default ExperienceTimeline;
