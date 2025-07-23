import React from 'react'
import viteLogo from '/vite.svg'

const proPic = "https://i.pravatar.cc/150?img=3";


function Card() {

  return (
    <div className='flex '>
      <div>
        <img src={proPic} alt="profile picture" className='h-16 w-16 rounded-full' />
      </div>
      <div className='flex flex-col ml-4 justify-center'>
        <h2 className='text-xl font-semibold'>Name of User</h2>
        <p>Online Status</p>
      </div>
    </div>
  )
}

export default Card
