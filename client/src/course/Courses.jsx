import React from 'react'
import Navbar from '../components/Navbar'
import Course from '../components/Course'
import Footer from '../components/Footer'

export default function Courses() {
  return (
    <div>
      
<Navbar />
<div className=" min-h-screen">
        <Course />
      </div>

{/* <Course/> */}
<Footer/>


    </div>
  )
}
