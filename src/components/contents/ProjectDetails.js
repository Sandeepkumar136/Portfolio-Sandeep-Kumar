import React from "react";

const ProjectDetails = ({ repo }) => {
  return (
    <div className="project-details">
      <h2>{repo.name}</h2>
      <p>{repo.description || "No description available"}</p>
      <p>
        <strong>Language:</strong> {repo.language || "N/A"}
      </p>
      <p>
        <strong>Created:</strong> {new Date(repo.created_at).toDateString()}
      </p>
      <p>
        <strong>Last Updated:</strong>{" "}
        {new Date(repo.updated_at).toDateString()}
      </p>
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        View on GitHub
      </a>
    </div>
  );
};

export default ProjectDetails;
