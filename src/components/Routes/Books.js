import React from 'react'
import Image_Exported from '../assets/ImageExporter'

const Books = () => {
  return (
    <div className='b-container'>
      <div className="b-contain">
        <h3 className="heading-b-n">Stories Brewing Soon</h3>
        <p className="subtitle-b-n">A fresh collection of untold tales, slowly crafted to inspire, entertain, and spark imagination worldwide.</p>
      </div>
      <img src={Image_Exported['Book-not-found']} itemType='svg' alt="Book not Found" className="img-b-n" />
      
    </div>
  )
}

export default Books
