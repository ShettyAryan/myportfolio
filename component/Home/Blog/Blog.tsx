import SectionHeadinig from '@/component/Helper/SectionHeading'
import { blogs } from '@/Data/data'
import React from 'react'
import BlogCard from './BlogCard'

const Blog = () => {
  return (
    <div className='pt-16 pb-16 bg-[#0f0715]'>
        <SectionHeadinig>Blog</SectionHeadinig>
        <div className='w-[80%] mt-20 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-12'>
            {blogs.map((item)=>{
               return(
                <div key={item.id}>
                    <BlogCard item = {item}/>
                </div>
               )
            })}
        </div>
    </div>
  )
  
}

export default Blog