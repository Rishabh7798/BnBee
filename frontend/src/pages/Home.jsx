import React from 'react'
import Header from '../components/Header'
import LocationMenu from '../components/LocationMenu'
import TopHotels from '../components/TopHotels'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Header />
      <LocationMenu />
      <TopHotels />
      <Banner />
    </div>
  )
}

export default Home