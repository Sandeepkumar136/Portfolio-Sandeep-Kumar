import React, { useEffect, useState } from "react";

const ProjectDetails = ({ repo }) => {
  const [commitCount, setCommitCount] = useState(null);

  useEffect(() => {
    const fetchCommitCount = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`
        );

        // GitHub sends commit total in the Link header (last page number)
        const linkHeader = response.headers.get("Link");

        if (linkHeader) {
          const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
          if (match) {
            setCommitCount(parseInt(match[1], 10));
            return;
          }
        }

        // fallback → if no Link header, assume at least 1 commit
        setCommitCount(1);
      } catch (err) {
        console.error("Error fetching commits:", err);
        setCommitCount("N/A");
      }
    };

    fetchCommitCount();
  }, [repo.owner.login, repo.name]);

  return (
    <div className="project-details">
      <div className="p-d-heading-contain">
        <h2 className="heading-p-d">{repo.name}</h2>
        <p className="subtitle-p-d">
          {repo.description || "No description available"}
        </p>
      </div>

      {/* Config section */}
      <div className="config-p-d-contain">
        <div className="config-p-d">
          <p className="subtitle-c-p-d">Language</p>
          <p className="item-c-p-d">{repo.language || "N/A"}</p>
        </div>
        <div className="config-p-d">
          <p className="subtitle-c-p-d">Created</p>
          <p className="item-c-p-d">
            {new Date(repo.created_at).toDateString()}
          </p>
        </div>
        <div className="config-p-d">
          <p className="subtitle-c-p-d">Last Updated</p>
          <p className="item-c-p-d">
            {new Date(repo.updated_at).toDateString()}
          </p>
        </div>
        <div className="config-p-d">
          <p className="subtitle-c-p-d">Last Pushed</p>
          <p className="item-c-p-d">
            {new Date(repo.pushed_at).toDateString()}
          </p>
        </div>
        <div className="config-p-d">
          <p className="subtitle-c-p-d">Visibility</p>
          <p className="item-c-p-d">
            {repo.visibility || (repo.private ? "Private" : "Public")}
          </p>
        </div>
      </div>

      {/* Actions: Stars, Watchers, Forks, Issues, Size, Commits */}
      <div className="p-d-acp-container">
        <div className="p-d-acp-contain">
          <p className="subtitle-acp-p-d">Stars</p>
          <p className="content-acp-p-d-c">
            <i className="bx bx-star"></i>
            <span className="item-acp-p-d-c">{repo.stargazers_count}</span>
          </p>
        </div>
        <div className="p-d-acp-contain">
          <p className="subtitle-acp-p-d">Watchers</p>
          <p className="content-acp-p-d-c">
            <i className="bx bx-time"></i>
            <span className="item-acp-p-d-c">{repo.watchers_count}</span>
          </p>
        </div>
        <div className="p-d-acp-contain">
          <p className="subtitle-acp-p-d">Forks</p>
          <p className="content-acp-p-d-c">
            <i className="bx bx-git-repo-forked"></i>
            <span className="item-acp-p-d-c">{repo.forks_count}</span>
          </p>
        </div>
        <div className="p-d-acp-contain">
          <p className="subtitle-acp-p-d">Open Issues</p>
          <p className="content-acp-p-d-c">
            <i className="bx bx-bug"></i>
            <span className="item-acp-p-d-c">{repo.open_issues_count}</span>
          </p>
        </div>
        <div className="p-d-acp-contain">
          <p className="subtitle-acp-p-d">Size</p>
          <p className="content-acp-p-d-c">
            <i className="bx bx-archive"></i>
            <span className="item-acp-p-d-c">{repo.size}KB</span>
          </p>
        </div>

        {/* 🔥 New Commits section */}
        <div className="p-d-acp-contain">
          <p className="subtitle-acp-p-d">Commits</p>
          <p className="content-acp-p-d-c">
            <i className="bx bx-git-commit"></i>
            <span className="item-acp-p-d-c">
              {commitCount !== null ? commitCount : "..."}
            </span>
          </p>
        </div>
      </div>

      {/* Owner details */}
      <div className="p-d-ow-d-container">
        <div className="heading-p-d-ow">Owner Details</div>
        <div className="p-e-ow-pcv">
          <div className="p-e-ow-d-contain">
            <p className="heading-ow-p-d">
              <img
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                className="w-12 h-12 rounded-full mt-2"
              />
              <a
                href={repo.owner.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                {repo.owner.login}
              </a>
            </p>
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="link-v-g"
          >
            <i className="p-icon-g bx bxl-github"></i> View on Github
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
