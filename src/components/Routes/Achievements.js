import React, { useState } from "react";
import data from "../assets/Certficates";

const Achievements = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((title) =>
    title.id.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="serv-card-contain">
        {
          filteredData.length > 0 ? (
            filteredData.map((e, i)=>(
              <div className="serv-card">
                <p className="text-serv-card">{e.title}</p>
              </div>
            ))
          ):(
                      <div className="n-fo-container">
            <h className="heading-n-fo">Excellence Without Boundaries</h>
            <p className="subtitle-n-fo">
              We strive to deliver outstanding solutions, breaking limits and
              setting <span className="p-highlight">new standards</span> for every <span className="p-highlight">client experience</span>.
            </p>
          </div>
          )
        }
      </div>
    </div>
  );
};

export default Achievements;
