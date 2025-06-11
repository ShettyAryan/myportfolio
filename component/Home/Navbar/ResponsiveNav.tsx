'use client';

import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import MobileNav from './MobileNav'
import Loading from '@/component/Loading';

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);
  const showNavHandler = ()=>setShowNav(true);
  const closeNavHandler = ()=>setShowNav(false);
  const [loading, setLoading] = useState<boolean>(false)

if(!loading){
 <Loading />
}

useEffect(()=>{
  setLoading(true)
},[])

  return (
    <div>
        <Nav openNav = {showNavHandler}/>
        <MobileNav showNav={showNav} closeNav={closeNavHandler}/>
    </div>
  )
}

export default ResponsiveNav