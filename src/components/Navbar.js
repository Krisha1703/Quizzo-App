import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div>
        <Image src="/Assets/hovered-logo.png" width={100} height={100} alt="logo"className="cursor-pointer"/>
    </div>
  )
}

export default Navbar