import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Images_Exported from "../Pictures/ImageExporter";

const ResumeContain = () => {
  const ResumeImagesData = [
    Images_Exported.resume_pages.page_1,
    Images_Exported.resume_pages.page_2,
    Images_Exported.resume_pages.page_3,
    Images_Exported.resume_pages.page_4,
    Images_Exported.resume_pages.page_5,
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="res-container">
        <div className="pro-heading-contain">
            <h3 className="heading-pro">Experience Unfolded.</h3>
            <h6 className="subtitle-pro">Explore my professional journey, showcasing skills, experiences, and achievements that reflect dedication, creativity, and commitment to meaningful growth</h6>
        </div>
      <div className="resume-wrapper">
        <Slider {...settings}>
          {ResumeImagesData.map((src, i) => (
            <div key={i} className="slider-card">
              <img
                src={src}
                alt={`Resume Page ${i + 1}`}
                className="resume-image"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="resume-links-container">
        <a href={Images_Exported.resumedoc} download={Images_Exported.resumedoc} className="resume-links doc">
          <i class="bx bxs-file-doc"></i>
          <span className="title-reslink">Download Doc</span>
        </a>
        <a href={Images_Exported.resumepdf} download={Images_Exported.resumepdf} className="resume-links pdf">
          <i class="bx bxs-file-pdf"></i>
          <span className="title-reslink">Download PDF</span>
        </a>
        <a href={Images_Exported.resumepdf} rel="noreferrer" target="_blank" className="resume-links img">
          <i class="bx bxs-file-image"></i>
          <span className="title-reslink">Download JPG</span>
        </a>
      </div>
    </div>
  );
};

export default ResumeContain;
