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

  useEffect(() => {
    fetch("https://api.github.com/users/Sandeepkumar136/repos")
      .then((res) => res.json())
      .then((data) => {
        const publicRepos = data.filter((repo) => !repo.private);
        setRepos(publicRepos);
      })
      .catch((err) => console.error("Fetched Error:", err));
  }, []);

  const filterByDate = (repoDate, from, to) => {
    const date = new Date(repoDate);
    if (from && date < new Date(from)) return false;
    if (to && date > new Date(to)) return false;
    return true;
  };

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

  const languages = [
    ...new Set(repos.map((repo) => repo.language).filter(Boolean)),
  ];

  return (
    <div className="project">
      {/* ✅ Only show search + filter when NO repo is selected */}
      {!selectedRepo && (
        <>
          {/* 🔹 Search + Buttons */}
          <div className="p-g-inp-container">
            <div className="p-heading-contain">
              <h3 className="heading-project">Creative work, reimagined</h3>
              <h6 className="subtitle-project">
                Interactive <span className="p-highlight">frontend</span>, optimized{" "}
                <span className="p-highlight">backend</span>, seamless user experience.
              </h6>
            </div>
            <div className="p-inp-contain">
              <i className=" p-search bx bx-search"></i>
              <input
                className="input"
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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

      {/* ✅ Show details directly in DOM (not modal) */}
      {selectedRepo && (
        <div className="project-details-container">
          <button onClick={() => setSelectedRepo(null)}>← Back</button>
          <ProjectDetails repo={selectedRepo} />
        </div>
      )}

      {/* 🔹 Filter Dialog */}
      {isFilterOpen && (
        <div className="dialog-overlay" onClick={closeFilter}>
          <div
            className="dialog-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Filter by Date</h4>
            <div>
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
            <div>
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
            <button onClick={closeFilter}>Close</button>
          </div>
        </div>
      )}

      {/* 🔹 Language Dialog */}
      {isLangOpen && (
        <div className="dialog-overlay" onClick={closeLang}>
          <div
            className="dialog-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Select Language</h4>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="">All Languages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <button onClick={closeLang}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
