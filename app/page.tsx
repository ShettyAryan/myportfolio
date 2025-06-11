"use client"
import Home from '@/component/Home/Home'
import Loading from '@/component/Loading'
import React, { useEffect, useState } from 'react'

const HomePage = () => {

const [loading, setLoading] = useState<boolean>(false)

if(!loading){
 <Loading />
}

useEffect(()=>{
  setLoading(true);
},[])

  return (
    <div>
      <Home />
    </div>
  )
}

export default HomePage