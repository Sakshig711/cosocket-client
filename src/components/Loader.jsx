import React from 'react'
import { ClipLoader, ScaleLoader } from 'react-spinners'

const Loader = ({ className }) => {
  return (
    <div className={`${className} fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50`}>
        <ScaleLoader
            color='#1F2937'
            speedMultiplier={2}
        />
    </div>
  )
}

export default Loader