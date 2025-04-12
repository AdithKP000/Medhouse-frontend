import React from 'react'
import Layout from '../components/layout/layout.js'

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
    <div className="row contactus ">
      <div className="col-md-6 ">
        <img
          src="/images/about.jpeg"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
        <p className="text-justify mt-5">
                Welcome to MedHouse, your one-stop destination for quality medicines, wellness products, and personalized healthcare solutions.
                <br/><br/>At MedHouse, we believe that good health begins with trust, care, and convenience. Whether you're picking up a prescription, looking for over-the-counter products, or seeking expert advice, our team is here to serve you with professionalism and compassion.

<br/><br/>        From chronic care to daily wellness, MedHouse is here to keep you and your family healthy—every step of the way.
        </p>
      </div>
    </div>
  </Layout>
  )
}

export default About