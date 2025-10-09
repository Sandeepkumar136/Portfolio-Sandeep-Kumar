import React from "react";
import { Link, useParams } from "react-router-dom";
import servicesDetails from "./ServicesData";

const ServicesDetails = () => {
  const { id } = useParams();
  const service = servicesDetails[id];

  if (!service) {
    return (
      <div className="service-err">
        <h2 className="heading-err">Services Not Found!</h2>
      </div>
    );
  }

  return (
    <div className="services-d-container">
      <div className="heading-contain-sr-d">
        <h3 className="heading-sr-d">{service.title}</h3>
        <p className="subtitle-sr-d">{service.shortDesc}</p>
      </div>
      <p className="desc-sr-d">{service.description}</p>
      <div className="sr-d-f-contain">
        {service.features.map((e, i) => (
          <ul key={i} className="sr-d-list">
            <li className="sr-d-item">{e}</li>
          </ul>
        ))}
      </div>
      <div className="sr-d-p-contain">
        <h3 className="heading-sr-d-p">Price:</h3>
        <p className="text-p-sr-d">{service.price}</p>
      </div>
      <Link to={service.link} className="btn-sr-d">{service.cta}</Link>
    </div>
  );
};

export default ServicesDetails;
