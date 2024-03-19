import React from 'react'
import Banner from '../Components/Hero/Banner'
import './CSS/About.css'
import about_banner from '../Components/Assets/cloud2.png'

const About = () => {
  return (
    <div>
    <Banner title="About Us" eyebrow="Learn More About Our Team!" image={about_banner}/>
      <div class="container">
  <div class="team-member">
    <img src="avatar1.jpg" alt="Team Member"/>
    <h2>Adam Doe</h2>
    <p>Lead Developer</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisi nec fermentum suscipit, nulla justo commodo purus, ac laoreet urna purus id lacus.</p>
  </div>
  
  <div class="team-member">
    <img src="avatar2.jpg" alt="Team Member"/>
    <h2>Lulu Smith</h2>
    <p>Graphic Designer</p>
    <p>Phasellus dictum purus a sem vulputate, nec maximus nunc tempor. Mauris fringilla diam eget magna aliquam, sit amet dignissim sapien posuere.</p>
  </div>

  <div class="team-member">
    <img src="avatar2.jpg" alt="Team Member"/>
    <h2>Grace Smith</h2>
    <p>Graphic Designer</p>
    <p>Phasellus dictum purus a sem vulputate, nec maximus nunc tempor. Mauris fringilla diam eget magna aliquam, sit amet dignissim sapien posuere.</p>
  </div>


</div>
    </div>
  )
}

export default About
