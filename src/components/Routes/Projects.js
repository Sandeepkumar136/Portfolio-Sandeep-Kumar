import React, { useEffect, useState } from "react";
import { useLang } from "../context/LanguageContext";
import { useFilter } from "../context/FilterContext";
import ProjectDetails from "../contents/ProjectDetails";

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [createdFrom, setCreatedFrom] = useState("");
  const [createdTo, setCreatedTo] = useState("");
  const [updatedFrom, setUpdatedFrom] = useState("");
  const [updatedTo, setUpdatedTo] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(null);

  const { openFilter, closeFilter, isFilterOpen } = useFilter();
  const { openLang, closeLang, isLangOpen } = useLang();

  // ✅ Fetch Repos
  useEffect(() => {
    fetch("https://api.github.com/users/Sandeepkumar136/repos")
      .then((res) => res.json())
      .then((data) => {
        const publicRepos = data.filter((repo) => !repo.private);
        setRepos(publicRepos);
      })
      .catch((err) => console.error("Fetched Error:", err));
  }, []);

  // ✅ Reusable Date Filter
  const filterByDate = (repoDate, from, to) => {
    const date = new Date(repoDate);
    if (from && date < new Date(from)) return false;
    if (to && date > new Date(to)) return false;
    return true;
  };

  // ✅ Filtering logic
  const filteredRepos = repos.filter((repo) => {
    const matchesSearch = repo.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCreated = filterByDate(
      repo.created_at,
      createdFrom,
      createdTo
    );
    const matchesUpdated = filterByDate(
      repo.updated_at,
      updatedFrom,
      updatedTo
    );
    const matchesLanguage = selectedLanguage
      ? repo.language === selectedLanguage
      : true;

    return matchesSearch && matchesCreated && matchesUpdated && matchesLanguage;
  });

  // ✅ Unique Languages
  const languages = [
    ...new Set(repos.map((repo) => repo.language).filter(Boolean)),
  ];

  return (
    <div className="project">
      {/* 🔹 Search + Filter UI (only when NO repo selected) */}
      {!selectedRepo && (
        <>
          <div className="p-g-inp-container">
            <div className="p-heading-contain">
              <h3 className="heading-project">Creative work, reimagined</h3>
              <h6 className="subtitle-project">
                Interactive <span className="p-highlight">frontend</span>,
                optimized <span className="p-highlight">backend</span>, seamless
                user experience.
              </h6>
            </div>

            {/* 🔹 Search Input */}
            <div className="p-inp-contain">
              <i className="p-search bx bx-search"></i>
              <input
                className="input"
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* 🔹 Filter + Language Buttons */}
            <div className="button-p-inp-contain">
              <button className="btn-p-inp" onClick={openFilter}>
                Filter
              </button>
              <button className="btn-p-inp" onClick={openLang}>
                Languages
              </button>
            </div>
          </div>

          {/* 🔹 Project Cards */}
          <div className="project-cards">
            {filteredRepos.map((repo) => (
              <div
                key={repo.id}
                className="project-card"
                onClick={() => setSelectedRepo(repo)}
              >
                {repo.name}
              </div>
            ))}
          </div>
        </>
      )}

      {/* 🔹 Project Details */}
      {selectedRepo && (
        <div className="project-details-container">
          <button className="close-p-d-btn" onClick={() => setSelectedRepo(null)}><i className="fas fa-angle-left" ></i> Back</button>
          <ProjectDetails repo={selectedRepo} />
        </div>
      )}

      {/* 🔹 Filter Dialog */}
      {isFilterOpen && (
        <div className="dialog-overlay" onClick={closeFilter}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <h4 className="heading-l-d-box">Filter by Date</h4>
          <div className="filter-container">
              <div className="filter-inputs">
              <label>Created From:</label>
              <input
                type="date"
                value={createdFrom}
                onChange={(e) => setCreatedFrom(e.target.value)}
              />
              <label>To:</label>
              <input
                type="date"
                value={createdTo}
                onChange={(e) => setCreatedTo(e.target.value)}
              />
            </div>
            <div className="filter-inputs">
              <label>Updated From:</label>
              <input
                type="date"
                value={updatedFrom}
                onChange={(e) => setUpdatedFrom(e.target.value)}
              />
              <label>To:</label>
              <input
                type="date"
                value={updatedTo}
                onChange={(e) => setUpdatedTo(e.target.value)}
              />
            </div>
          </div>
          </div>
        </div>
      )}

      {/* 🔹 Language Dialog */}
      {isLangOpen && (
        <div className="dialog-overlay" onClick={closeLang}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <h4 className="heading-l-d-box">Select Language</h4>
            <div className="lang-btn-group">
              <button
                onClick={() => setSelectedLanguage("")}
                className={
                  selectedLanguage === "" ? "lang-btn active" : "lang-btn"
                }
                type="button"
              >
                All
              </button>
              {languages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLanguage(lang)} // ✅ FIXED
                  className={
                    selectedLanguage === lang ? "lang-btn active" : "lang-btn"
                  }
                >
                  {lang}
                </button>
              ))}
            </div>
            <div className="l-c-btn-contain">
              <button className="lang-close-btn" onClick={closeLang}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
