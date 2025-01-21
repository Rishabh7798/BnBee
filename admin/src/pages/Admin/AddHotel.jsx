import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddHotel = () => {

    const [hotImg, setHotImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hotelSince, setHotelSince] = useState('')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [location, setLocation] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {

            if (!hotImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();

            formData.append('image', hotImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('hotelSince', hotelSince)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('location', location)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(backendUrl + '/api/admin/add-hotel', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setHotImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>

            <p className='mb-3 text-lg font-medium'>Add Hotel</p>

            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="hot-img">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={hotImg ? URL.createObjectURL(hotImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setHotImg(e.target.files[0])} type="file" name="" id="hot-img" hidden />
                    <p>Upload hotel <br /> picture</p>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Hotel name</p>
                            <input onChange={e => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Hotel Email</p>
                            <input onChange={e => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Set Password</p>
                            <input onChange={e => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Hotel Since</p>
                            <select onChange={e => setHotelSince(e.target.value)} value={hotelSince} className='border rounded px-2 py-2' required>
                                <option value="" disabled>Select Year</option>
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Years</option>
                                <option value="3 Year">3 Years</option>
                                <option value="4 Year">4 Years</option>
                                <option value="5 Year">5 Years</option>
                                <option value="6 Year">6 Years</option>
                                <option value="7 Year">7 Years</option>
                                <option value="8 Year">8 Years</option>
                                <option value="9 Year">9 Years</option>
                                <option value="10 Year">10 Years</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Fees</p>
                            <input onChange={e => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Hotel fees' required />
                        </div>

                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Location</p>
                            <select onChange={e => setLocation(e.target.value)} value={location} className='border rounded px-2 py-2' required>
                                <option value="" disabled>Select State</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Tamil_Nadu">Tamil Nadu</option>
                                <option value="Uttar_Pradesh">Uttar Pradesh</option>
                                <option value="Jammu_Kashmir">Jammu Kashmir</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Maharastra">Maharastra</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Address</p>
                            <input onChange={e => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
                            <input onChange={e => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='Address 2' required />
                        </div>

                    </div>

                </div>

                <div>
                    <p className='mt-4 mb-2'>About Hotel</p>
                    <textarea onChange={e => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' rows={5} placeholder='write about hotel'></textarea>
                </div>

                <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add hotel</button>

            </div>

        </form>
    )
}

export default AddHotel
