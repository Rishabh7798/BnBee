import React from 'react'

const SearchBar = () => {
  return (
    <div className="flex flex-col items-center pb-5">

      {/* --------- Search Bar Container --------- */}
      <div className="flex items-center w-full max-w-4xl rounded-full shadow-lg px-4 py-2">

        {/* --------- Location Input --------- */}
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium text-gray-600">Location</label>
          <input
            type="text"
            placeholder="Which city do you prefer?"
            className="outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="w-px h-12 bg-gray-300 mx-4"></div>

        {/* --------- Check In Input --------- */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Check In</label>
          <input
            type="date"
            className="outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="w-px h-12 bg-gray-300 mx-4"></div>

        {/* --------- Check Out Input --------- */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Check Out</label>
          <input
            type="date"
            className="outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="w-px h-12 bg-gray-300 mx-4"></div>

        {/* --------- Guests Input --------- */}
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium text-gray-600">Guests</label>
          <input
            type="text"
            placeholder="Add Guests"
            className="outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* --------- Search Button --------- */}
        <button className="ml-4 p-3 bg-black rounded-full text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M18 10a8 8 0 11-16 0 8 8 0 0116 0z"
            />
          </svg>
        </button>
      </div>

    </div>
  )
}

export default SearchBar
