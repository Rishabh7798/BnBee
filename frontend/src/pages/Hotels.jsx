import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Hotels = () => {

  const { location } = useParams()

  const [filterHot, setFilterHot] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { hotels } = useContext(AppContext)

  const applyFilter = () => {
    if (location) {
      setFilterHot(hotels.filter(hot => hot.location === location))
    } else {
      setFilterHot(hotels)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [hotels, location])

  return (
    <div>
      <p className='text-gray-600'>Explore Hotels.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => location === 'Delhi' ? navigate('/hotels') : navigate('/hotels/Delhi')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === 'Delhi' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Delhi</p>
          <p onClick={() => location === 'Tamil_Nadu' ? navigate('/hotels') : navigate('/hotels/Tamil_Nadu')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === 'Tamil_Nadu' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Tamil Nadu</p>
          <p onClick={() => location === 'Uttar_Pradesh' ? navigate('/hotels') : navigate('/hotels/Uttar_Pradesh')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === 'Uttar_Pradesh' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Uttar Pradesh</p>
          <p onClick={() => location === 'Jammu_Kashmir' ? navigate('/hotels') : navigate('/hotels/Jammu_Kashmir')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === 'Jammu_Kashmir' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Jammu and Kashmir</p>
          <p onClick={() => location === 'Rajasthan' ? navigate('/hotels') : navigate('/hotels/Rajasthan')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === 'Rajasthan' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Rajasthan</p>
          <p onClick={() => location === 'Maharashtra' ? navigate('/hotels') : navigate('/hotels/Maharashtra')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === 'Maharashtra' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Maharashtra</p>
          <p onClick={() => location === 'Andhra_Pradesh' ? navigate('/hotels') : navigate('/hotels/Andhra_Pradesh')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === 'Andhra_Pradesh' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Andhra Pradesh</p>
          <p onClick={() => location === 'Gujarat' ? navigate('/hotels') : navigate('/hotels/Gujarat')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === 'Gujarat' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Gujarat</p>
          <p onClick={() => location === 'West_Bengal' ? navigate('/hotels') : navigate('/hotels/West_Bengal')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === 'West_Bengal' ? 'bg-[#E2E5FF] text-black ' : ''}`}>West Bengal</p>
          <p onClick={() => location === 'Goa' ? navigate('/hotels') : navigate('/hotels/Goa')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === 'Goa' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Goa</p>
          <p onClick={() => location === 'Nagaland' ? navigate('/hotels') : navigate('/hotels/Nagaland')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === 'Nagaland' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Nagaland</p>
          <p onClick={() => location === 'Madhya_Pradesh' ? navigate('/hotels') : navigate('/hotels/Madhya_Pradesh')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${location === 'Madhya_Pradesh' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Madhya Pradesh</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterHot.map((item, index) => (
            <div onClick={() => { navigate(`/booking/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
              <img className='bg-[#EAEFFF]' src={item.image} alt="" />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                </div>
                <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hotels