import React, { useState } from "react";
import servicesDetails from "../contents/ServicesData";
import { Link } from "react-router-dom";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = servicesDetails.filter((service) =>
    service.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="services">
      <h3 className="heading-ser">Driven By Excellence</h3>
      <div className="subtitle-heading-ser">
        We deliver innovative, reliable, and <span className="p-highlight">high-quality</span> solutions that
        consistently exceed <span className="p-highlight">client expectations</span> with unmatched dedication.
      </div>
      <div className="ser-inp-container">
        <div className="p-inp-contain">
          <i className="p-search bx bx-search"></i>
          <input
            type="text"
            placeholder="Search Services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="serv-card-contain">
        {filteredServices.length > 0 ? (
          filteredServices.map((e, i) => (
            <Link to={`/services/${i}`} key={i} className="serv-card">
              <p className="text-serv-card">{e.title}</p>
            </Link>
          ))
        ) : (
          <div className="n-fo-container">
            <h className="heading-n-fo">Excellence Without Boundaries</h>
            <p className="subtitle-n-fo">
              We strive to deliver outstanding solutions, breaking limits and
              setting <span className="p-highlight">new standards</span> for every <span className="p-highlight">client experience</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
