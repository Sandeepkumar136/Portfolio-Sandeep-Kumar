import React, { useState } from "react";
import data from "../assets/Certficates";
import { useCert } from "../context/CertDialogueContext";
import Chart from "../contents/Chart";
import Client_Data from "../contents/ClientRowData";
import Images from "../Pictures/ImageProvider";
import { motion } from "framer-motion";

const StarRating = ({ rating }) => {
  const totalStars = 5;

  const getStarClass = (index) => {
    if (rating >= index + 1) {
      return "star full";
    } else if (rating >= index + 0.5) {
      return "star half";
    } else {
      return "star empty";
    }
  };

  return (
    <div className="star-rating">
      {Array.from({ length: totalStars }, (_, index) => (
        <span key={index} className={getStarClass(index)}>
          &#9733;
        </span>
      ))}
    </div>
  );
};

const Achievements = () => {
  const ContRowdata = [
    {
      img: Images.Partners.Partner_One,
      Partner: "Rakesh Sharma",
      job: "Frontend Developer",
      text: "Frontend developers design and implement user interfaces, ensuring websites are responsive, visually appealing, and provide excellent user experiences.",
    },
    {
      img: Images.Partners.Partner_Two,
      Partner: "Sumit Goshwami",
      job: "Backend Developer",
      text: "Backend developers build and maintain server-side logic, databases, and APIs, ensuring smooth data flow and efficient functionality behind the scenes.",
    },
    {
      img: Images.Partners.Partner_Three,
      Partner: "Ranjan Mishra",
      job: "Data Analytics",
      text: "Data analysts interpret data, identify trends, and provide insights to help organizations make informed decisions and improve performance.",
    },
    {
      img: Images.Partners.Partner_four,
      Partner: "Kiran Gupta",
      job: "Backend Developer",
      text: "Backend developers manage server-side programming, databases, and API integrations, ensuring seamless communication between the client and server systems.",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const { openCert, closeCert, isCertDialogOpen } = useCert();

  const filteredData = data.filter((element) =>
    element.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  // Animation variants
  const cardVariant = {
    hidden: { y: 60, scale: 0.95, opacity: 1 },
    visible: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  const containerVariant = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="services">
      <h3 className="heading-ser">Credentials that Count.</h3>
      <div className="subtitle-heading-ser">
        Showcasing valuable certifications that highlight expertise, validate{" "}
        <span className="p-highlight">professional skills</span>, build
        <span className="p-highlight"> credibility</span>, inspire confidence,
        and strengthen lasting career opportunities
      </div>

      {/* Search */}
      <div className="ser-inp-container">
        <div className="p-inp-contain">
          <i className="p-search bx bx-search"></i>
          <input
            type="text"
            placeholder="Search Certificates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Certificates */}
      <motion.div
        className="ac-card-contain"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((e, i) => (
            <motion.div
              key={i}
              className="ac-card"
              onClick={() => handleCardClick(e)}
              variants={cardVariant}
            >
              <div className="ac-logo-contain">
                <p className="ac-title">{e.title}</p>
                <i className={`logo-ac ${e.icon}`}></i>
              </div>
              <p className="text-ac-c">{e.short_desc}</p>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="n-fo-container"
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <h className="heading-n-fo">Excellence Without Boundaries</h>
            <p className="subtitle-n-fo">
              We strive to deliver outstanding solutions, breaking limits and
              setting <span className="p-highlight">new standards</span> for
              every <span className="p-highlight">client experience</span>.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Modal */}
      {selectedItem && (
        <div className="modal-overlay">
          <motion.div
            className="modal-box"
            initial={{ y: 100, scale: 0.9 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <div className="a-m-d-up-contain">
              <div className="a-m-t-contain">
                <h3 className="title-a-m-t">{selectedItem.title}</h3>
                <i className={`logo-a-m ${selectedItem.icon}`}></i>
              </div>
              <h4 className="subtitle-a-m">{selectedItem.short_desc}</h4>
              <h5 className="desc-a-m">{selectedItem.desc}</h5>
            </div>
            <div className="b-item-a-m">
              <div className="a-m-com">{selectedItem.company}</div>
              <div className="a-m-obt-date">{selectedItem.obtain}</div>
              <div className="add-a-m">
                <span className="add-a-m-city">
                  {selectedItem.address_city}
                </span>
                <span className="add-a-m-country">
                  {selectedItem.address_country}
                </span>
              </div>
            </div>
            <div className="btn-wrap-contain-a-m">
              <a
                href={selectedItem.img}
                download
                target="_blank"
                rel="noopener noreferrer"
                type="button"
                className="btn-a-m"
              >
                <i className="icon-d-a-m bx bx-arrow-to-bottom-stroke"></i>
              </a>
              <button onClick={handleClose} className="btn-a-m">
                <i className="icon-d-a-m  bx bx-x"></i>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Contributors */}
      <div>
        <div className="heading-inf">Contributors</div>
        <motion.div
          className="cont-container"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {ContRowdata.map((item, index) => (
            <motion.div key={index} className="cont-card" variants={cardVariant}>
              <div className="logo-contain-cont">
                <img src={item.img} alt={item.Partner} className="logo-cont" />
                <div className="title-contain-cont">
                  <h5 className="title-cont">{item.Partner}</h5>
                  <p className="subtitle-cont">{item.job}</p>
                </div>
              </div>
              <p className="text-cont">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Clients */}
        <div className="heading-inf">Top Client Reviews</div>
        <motion.div
          className="client-container"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {Client_Data.map((client, index) => (
            <motion.div key={index} className="cli-contain" variants={cardVariant}>
              <div className="cli-logo-contain">
                <img
                  src={client.img}
                  alt={client.client}
                  className="cli-logo"
                />
                <h5 className="title-cli">{client.client}</h5>
              </div>
              <StarRating rating={parseFloat(client.star)} />
              <p className="text-cli">{client.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart */}
        <div className="heading-inf">Contribution Chart</div>
        <motion.div
          className="con-chart"
          initial={{ y: 80, scale: 0.9 }}
          whileInView={{ y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <Chart />
        </motion.div>
      </div>
    </div>
  );
};

export default Achievements;
