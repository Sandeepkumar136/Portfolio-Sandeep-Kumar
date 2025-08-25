import React, { useState } from "react";
import data from "../assets/Certficates";
import { Link } from "react-router-dom";

const Achievements = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((element) =>
    element.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="services">
      <h3 className="heading-ser">Credentials that Count.</h3>
      <div className="subtitle-heading-ser">
        Showcasing valuable certifications that highlight expertise, validate{" "}
        <span className="p-highlight">professional skills</span>, build
        <span className="p-highlight">credibility</span>, inspire confidence,
        and strengthen lasting career opportunities
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
      <div className="ac-card-contain">
        {filteredData.length > 0 ? (
          filteredData.map((e, i) => (
            <Link to={`/cert/${i}`} className="ac-card">
              <div className="ac-logo-contain">
                <p className="ac-title">{e.title}</p>
                <i className={`logo-ac ${e.icon}`}></i>
              </div>
              <p className="text-ac-c">{e.short_desc}</p>
            </Link>
          ))
        ) : (
          <div className="n-fo-container">
            <h className="heading-n-fo">Excellence Without Boundaries</h>
            <p className="subtitle-n-fo">
              We strive to deliver outstanding solutions, breaking limits and
              setting <span className="p-highlight">new standards</span> for
              every <span className="p-highlight">client experience</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
