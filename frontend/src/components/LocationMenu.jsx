import React from 'react'
import { locationData } from '../assets/assets'
import { Link } from 'react-router-dom'

const LocationMenu = () => {
    return (
        <div id='location' className='flex flex-col items-center gap-4 py-16 text-[#262626]'>
            <h1 className='text-3xl font-medium'></h1>
            <p className='sm:w-1/3 text-center text-sm'>Find your perfect stay in the best destinations.<br />Explore, book, and relax!</p>
            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll '>
                {locationData.map((item, index) => (
                    <Link to={`/hotels/${item.location}`} onClick={() => scrollTo(0, 0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index}>
                        <img className='w-16 sm:w-24 mb-2 ' src={item.image} alt="" />
                        <p>{item.location}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default LocationMenu