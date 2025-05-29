import React from 'react'

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-bounce">
        <img 
          src="/images/logo.png" // Replace with your image path
          alt="Loading..."
          className="h-24 w-24" // Adjust size as needed
        />
      </div>
    </div>
  )
}

export default loading