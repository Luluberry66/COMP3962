import { useEffect } from 'react'
import React from 'react'
import Hero from '../Components/Hero/Hero'

const Home = () => {

  useEffect(() => {
    fetch("/api").then(res => res.json()).then(data => console.log(data))
  }, [])

  return (
    <div>
      <Hero/>
    </div>
  )
}

export default Home
