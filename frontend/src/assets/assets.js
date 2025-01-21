import booking_img from './booking_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import hotel1 from './hotel1.png'
import hotel2 from './hotel2.png'
import hotel3 from './hotel3.png'
import hotel4 from './hotel4.png'
import hotel5 from './hotel5.png'
import hotel6 from './hotel6.png'
import hotel7 from './hotel7.png'
import Delhi from './Delhi.svg'
import Tamil_Nadu from './Tamil_Nadu.svg'
import Uttar_Pradesh from './Uttar_Pradesh.svg'
import Jammu_Kashmir from './Jammu_Kashmir.svg'
import Rajasthan from './Rajasthan.svg'
import Maharastra from './Maharastra.svg'


export const assets = {
    booking_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const locationData = [
    {
        location: 'Delhi',
        image: Delhi
    },
    {
        location: 'Tamil Nadu',
        image: Tamil_Nadu
    },
    {
        location: 'Uttar Pradesh',
        image: Uttar_Pradesh
    },
    {
        location: 'Jammu Kashmir',
        image: Jammu_Kashmir
    },
    {
        location: 'Rajasthan',
        image: Rajasthan
    },
    {
        location: 'Maharastra',
        image: Maharastra
    },
]

export const hotels = [
    { 
        _id: 'hotel1',
        name: 'Sunshine Residency',
        image: hotel1,
        location: 'Maharashtra',
        hotelSince: '6 Years',
        about: 'Sunshine Residency is a premium hotel known for its picturesque views of the Arabian Sea, modern facilities, and unparalleled hospitality. Located in the bustling city of Mumbai, it offers easy access to major attractions and a tranquil retreat from the citys hustle and bustle.',
        fees: 3500,
        address: {
            line1: 'Plot No. 45, Marine Drive',
            line2: 'Opposite Gateway of India, Mumbai'
        }
    },
    {
        _id: 'hotel2',
        name: 'Royal Orchid',
        image: hotel2,
        location: 'Rajasthan',
        hotelSince: '9 Years',
        about: 'Royal Orchid is a luxurious hotel located near the iconic Hawa Mahal, offering a perfect blend of heritage and modern amenities. Known for its royal hospitality and exquisite Rajasthani cuisine.',
        fees: 5000,
        address: {
            line1: 'Hawa Mahal Road',
            line2: 'Jaipur, Rajasthan'
        }
    },
    {
        _id: 'hotel3',
        name: 'Sunview Resort',
        image: hotel3,
        location: 'Tamil Nadu',
        hotelSince: '8 years',
        about: 'Sunview Resort is a serene beachfront property, offering breathtaking views of the Arabian Sea. Ideal for a peaceful getaway with top-notch facilities.',
        fees: 3000,
        address: {
            line1: 'Marina Beach Road',
            line2: 'Chennai, Tamil Nadu'
        }
    },
    {
        _id: 'hotel4',
        name: 'Himalayan Retreat',
        image: hotel4,
        location: 'Jammu Kashmir',
        hotelSince: '1 year',
        about: 'Himalayan Retreat offers cozy accommodations with stunning views of Dal Lake. A perfect destination for a tranquil escape in the lap of nature.',
        fees: 4000,
        address: {
            line1: 'Dal Lake Road',
            line2: 'Srinagar, Jammu and Kashmir'
        }
    },
    {
        _id: 'hotel5',
        name: 'The Oberoi Trident',
        image: hotel5,
        location: 'Maharashtra',
        hotelSince: '4 years',
        about: 'A luxurious hotel situated in Mumbai, overlooking the Arabian Sea with modern amenities.',
        fees: 2500,
        address: {
            line1: 'Nariman Point',
            line2: 'Mumbai, Maharashtra'
        }
    },
    {
        _id: 'hotel6',
        name: 'Heritage Palace',
        image: hotel6,
        location: 'Rajasthan',
        hotelSince: '3 years',
        about: 'Experience the royal lifestyle in this heritage hotel located in Jaipur, Rajasthan.',
        fees: 3000,
        address: {
            line1: 'Amber Fort Road',
            line2: 'Jaipur, Rajasthan'
        }
    },
    {
        _id: 'hotel7',
        name: 'Residency Towers',
        image: hotel7,
        location: 'Delhi',
        hotelSince: '7 years',
        about: 'A luxurious hotel in the heart of Delhi, offering premium facilities and excellent service.',
        fees: 4500,
        address: {
            line1: '19, Ashoka Road',
            line2: 'Connaught Place, Delhi'
        }
    }
]