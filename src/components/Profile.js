import { useEffect, useState } from "react";
import octokit from "./Octokit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faMapMarkerAlt,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { toggleResults } from "../actions";

import NotFound from "./NotFound";
import GoBack from "./GoBack";

const fetchUserRepos = async (user) => {
  let userRepos = [];
  try {
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
        }
        return userRepos.length ? userRepos : "";
      });
  } catch (error) {
    console.error(error);
  }
};

export default function Profile({ match }) {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [orgs, setOrgs] = useState([]);
  const [info, setInfo] = useState("");
  const [notFound, setNotFound] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleResults(false));
  });

  const fetchUser = async (user) => {
    try {
      return await octokit
        .request(`GET https://api.github.com/users/${user}`)
        .then((response) => {
          return response.data;
        });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserOrgs = async (user) => {
    try {
      return await octokit
        .request(`GET https://api.github.com/users/${user}/orgs`)
        .then((response) => {
          if (response.data.length > 0) {
            return response.data;
          } else {
            setInfo("No Organizations");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  let recentVisits = [];
  if (sessionStorage.recentVisits) {
    recentVisits = JSON.parse(sessionStorage.recentVisits);
  }

  const addRecentlyVisited = (user) => {
    recentVisits.unshift({
      name: `${user.login}`,
      image: `${user.avatar_url}`,
    });
    if (recentVisits.length > 3) recentVisits.pop();
    sessionStorage.setItem("recentVisits", JSON.stringify(recentVisits));
  };

  useEffect(() => {
    fetchUser(match.params.username).then((userData) => {
      if (userData !== undefined) {
        setUser(userData);
        addRecentlyVisited(userData);
        fetchUserRepos(match.params.username).then((userRepos) =>
          setRepos(userRepos)
        );
        fetchUserOrgs(match.params.username).then((userOrgs) =>
          setOrgs(userOrgs)
        );
      } else {
        setNotFound(true);
      }
    });
  }, [match.params.username]);

  return (
    <div className="SearchResult">
      {/* If Requested User Exists  */}
      {user ? (
        <div className="Profile">
          <GoBack />
          <div className="user-main">
            <img
              className="flex-img circle"
              src={user.avatar_url}
              alt="avatar"
            ></img>
            <div className="user-main-info">
              <p className="user-main-details">
                <FontAwesomeIcon icon={faInfoCircle} />
                {user.type}
              </p>
              <a
                className="user-link user-main-details"
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
              >
                {user.login}
              </a>
            </div>
            <div className="user-alt-info">
              {user.bio ? <p className="user-main-details">{user.bio}</p> : ""}
              {user.company ? (
                <p className="user-main-details">
                  <FontAwesomeIcon icon={faBuilding} /> {user.company}
                </p>
              ) : (
                ""
              )}
              {user.location ? (
                <p className="user-main-details">
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {user.location}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="user-details">
            <div className="user-repositories">
              <h1>Repositories</h1>
              {repos ? (
                repos.map((repo, idx) => {
                  return (
                    <a
                      className="alt-link"
                      key={idx}
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {repo.name}
                    </a>
                  );
                })
              ) : (
                <p>No Repositories</p>
              )}
            </div>
            <div className="user-organizations">
              <h1 className="w100">Organizations</h1>
              {!info ? (
                orgs.map((org, idx) => {
                  return (
                    <div className="organization" key={idx}>
                      <img
                        src={org.avatar_url}
                        alt="organization logo"
                        width="50"
                        height="50"
                      ></img>
                      <a
                        className="alt-link"
                        key={idx}
                        href={`https://github.com/${org.login}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {org.login}
                      </a>
                    </div>
                  );
                })
              ) : (
                <p>{info}</p>
              )}
            </div>
          </div>
        </div>
      ) : // If not found
      notFound ? (
        <NotFound />
      ) : (
        ""
      )}
    </div>
  );
}
