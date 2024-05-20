import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
<div className="footer-content">
    <div className="footer-content-left">
        <img src={assets.logo} className='logo' alt="" />
        <p>Welcome to Tomato Order delicious meals from your favorite restaurants with just a few taps</p>
        <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
    </div>
    <div className="footer-content-center">
        <h2>COMPANY</h2>
        <ul>
            <li>Home</li>
        <li>About us</li>
        <li>Delivery</li>
        <li>Privacy Policy</li>
        </ul>
    </div>
    <div className="footer-content-right">
        <h2>GET IN TOUCH</h2>
        <ul>
            <li>8300706522</li>
            <li>haritrance28@gmail.com</li>
        </ul>
    </div>
    
</div>
<hr />
<p className='footer-copyright'>Copyright 2024 🦸 haribalajee - All Right Reserved.</p>
    </div>
  )
}

export default Footer