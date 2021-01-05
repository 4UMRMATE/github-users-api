import { useEffect, useState } from "react";
import octokit from "./Octokit";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faUser } from "@fortawesome/free-solid-svg-icons";

export default function User(props) {
  const [repos, setRepos] = useState([]);
  const [info, setInfo] = useState("");
  const gridView = useSelector((state) => state.usersView);

  const fetchUserRepos = async (user) => {
    let userRepos = [];
    return await octokit
      .request(`GET https://api.github.com/users/${user}/repos`)
      .then((response) => {
        if (response.data.length > 0) {
          for (let i = 0; i < 3; i++) {
            if (response.data[i] !== undefined) {
              userRepos.push({
                name: response.data[i].name,
                url: response.data[i].html_url,
              });
            }
          }
        } else {
          // This user doesn't have a public repository
          setInfo("No Repositories");
        }
        return userRepos;
      });
  };

  useEffect(() => {
    fetchUserRepos(props.name).then((repoData) => setRepos(repoData));
  }, [props.name]);

  return (
    <div
      className={`User ${
        gridView
          ? "col-6 col-xs-4 .direction-row"
          : "col-12 col-xs-12 .direction-column"
      }`}
      style={gridView ? { fontSize: "2vmin" } : { fontSize: "3vmin" }}
    >
      <div
        className="userImage"
        style={
          gridView
            ? { width: "100%", height: "60%", padding: "2vmin 0" }
            : { width: "40%", height: "100%" }
        }
      >
        <img
          className="flex-img border-radius"
          src={props.avatar}
          alt="avatar"
        ></img>
      </div>
      <div
        className="userInfo"
        style={
          gridView
            ? { width: "100%", height: "40%" }
            : { width: "60%", height: "100%" }
        }
      >
        <div className="user-info">
          <h3 className="title">
            <FontAwesomeIcon icon={faUser} />
            {props.type}
          </h3>
          <Link className="link" to={`/${props.name}`}>
            <h4 className="user-name">{props.name}</h4>
          </Link>
        </div>
        <div className="user-repos">
          <h3 className="title">
            <FontAwesomeIcon icon={faBook} />
            Repositories
          </h3>
          {!info ? (
            repos.map((repo, idx) => {
              return (
                <a
                  key={idx}
                  className="link"
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <li>{repo.name}</li>
                </a>
              );
            })
          ) : (
            <p>{info}</p>
          )}
        </div>
      </div>
    </div>
  );
}
