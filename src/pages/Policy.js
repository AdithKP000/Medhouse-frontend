import React from 'react'
import Layout from '../components/layout/layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
    <div className="row contactus ">
      <div className="col-md-6 ">
        <img
          src="/images/contactus.jpeg"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
      At MedHouse, we prioritize your health, safety, and privacy.
       All our medicines are sourced from certified suppliers and dispensed by licensed pharmacists. We follow strict quality control and comply with local health regulations. 
       <br/><br/>Returns are only accepted for damaged or incorrect products, and prescriptions are required for all regulated medicines. Your data is handled securely and confidentially.
      </div>
    </div>
  </Layout>
  )
}

export default Policy