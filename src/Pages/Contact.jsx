import React from 'react'
import Banner from '../Components/Hero/Banner'
import './CSS/Contact.css'
import contact_banner from '../Components/Assets/cloud3.png'

const Contact = () => {
  return (
    <div>
      <Banner title="Contact Us" eyebrow="eyebrow" image={contact_banner}/>
      <div class="container">
  <div class="contact-info">
    <h2>Reach Out to Us</h2>
    <p>We're here to help and answer any question you might have. We look forward to hearing from you!</p>
    <ul>
      <li><strong>Email:</strong> info@example.com</li>
      <li><strong>Phone:</strong> +1 (123) 456-7890</li>
      <li><strong>Address:</strong> 123 Main Street, City, Country, 12345</li>
    </ul>
  </div>
  
  <div class="contact-form"/>
    <h2>Send Us a Message</h2>
    <form action="#" method="post">
      <label for="name">Your Name:</label><br/>
      <input type="text" id="name" name="name" required/><br/><br/>
      <label for="email">Your Email:</label><br/>
      <input type="email" id="email" name="email" required/><br/><br/>
      <label for="message">Your Message:</label><br/>
      <textarea id="message" name="message" rows="5" required></textarea><br/><br/>
      <button type="submit">Send Message</button>
    </form>
  </div>
</div>

  )
}

export default Contact
