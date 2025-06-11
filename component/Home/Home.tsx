'use client';

import React, { useEffect, useState } from 'react'
import Hero from './Hero/Hero'
import About from './About/About'
import Services from './Services/Services'
import Projects from './Projects/Projects'
import Skills from './Skills/Skills'
import Reviews from './Reviews/Reviews'
import Blog from './Blog/Blog'
import Contact from './Contact/Contact'

import Loading from '../Loading';


const Home = () => {

const [loading, setLoading] = useState<boolean>(false)

if(!loading){
 <Loading />
}

useEffect(()=>{
  setLoading(true)
},[])

  return (
    <div className='overflow-hidden'>
      <section id='home'><Hero /></section>
      <section id='about' className='scroll-mt-12vh'><About /></section>
      <section id='services' className='scroll-mt-12vh'><Services /></section>
      <section id='projects' className='scroll-mt-12vh'><Projects /></section>
      <section id='skills'><Skills /></section>
      {/* <section id='reviews' className='scroll-mt-12vh'><Reviews /></section> */}
      {/* <section id='blog'><Blog /></section> */}
      <section id='contact'><Contact /></section>
           
    </div>
  )
}

export default Home