import React from 'react'
import { useParams } from 'react-router-dom'
import data from '../assets/Certficates';

const CertificateDetails = () => {
    const {id} = useParams();
    const element = data[id];

      if (!element) {
    return (
      <div className="service-err">
        <h2 className="heading-err">Certificates Not Found!</h2>
      </div>
    );
  }
  return (
    <div>
      Cert
    </div>
  )
}

export default CertificateDetails
