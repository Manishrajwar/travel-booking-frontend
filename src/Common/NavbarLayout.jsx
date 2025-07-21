import React, { useState } from 'react'
import Popup from './Popup';
import toast from 'react-hot-toast';

function NavbarLayout({children ,showAbout , showContact , setShowContact , setShowAbout}) {
    

  return (
    <>
      {children}

       <Popup isOpen={showAbout} onClose={() => setShowAbout(false)}>
        <h2>About Us</h2>
        <p>
          We are a passionate travel booking agency helping you explore the
          world with tailored trips, best hotels, and unforgettable experiences.
        </p>
      </Popup>

      <Popup isOpen={showContact} onClose={() => setShowContact(false)}>
        <h2>Contact Us</h2>
        <p>
          Have questions? Reach out to us anytime. Our team is ready to assist
          you with your travel plans and make your journey smooth and memorable.
        </p>

      <form onSubmit={(e)=>{
         e.preventDefault();
          toast.success("Our team will Contact you soon!");
          setShowContact(false);
          
      }} className="inputbtns">
           <input  type="text" placeholder="Enter Phone Number" required />

         <button type="submit">Submit</button>
         </form>
      </Popup>
    </>
  )
}

export default NavbarLayout