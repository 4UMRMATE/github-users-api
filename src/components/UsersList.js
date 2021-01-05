import React, { useState, useEffect } from "react";
import octokit from "./Octokit";

import User from "./User";
import { useSelector } from "react-redux";

const fetchGithubUsers = async () => {
  return await octokit
    // Fetch Most Followed Github Users by followers
    .request(`GET https://api.github.com/search/users?q=followers:%3E1`)
    .then((response) => {
      sessionStorage.setItem("usersData", JSON.stringify(response.data.items));
      return response.data.items;
    });
};

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const byNameAsc = useSelector((state) => state.sortByNameAsc);
  const byNameDesc = useSelector((state) => state.sortByNameDesc);
  const byFollowersAsc = useSelector((state) => state.sortByFollowersAsc);

  useEffect(() => {
    sessionStorage.usersData === undefined
      ? fetchGithubUsers().then((usersData) => {
          setUsers(usersData);
        })
      : setUsers(JSON.parse(sessionStorage.usersData));
  }, []);
  return (
    <div className="UsersList">
      <div className="grid">
        {byNameAsc
          ? users
              .slice()
              .sort(function (a, b) {
                return a.login.toLocaleLowerCase() > b.login.toLocaleLowerCase()
                  ? 1
                  : -1;
              })
              .map((user) => {
                return (
                  <User
                    key={user.id}
                    avatar={user.avatar_url}
                    name={user.login}
                    page={user.html_url}
                    type={user.type}
                  />
                );
              })
          : byNameDesc
          ? users
              .slice()
              .sort(function (a, b) {
                return a.login.toLocaleLowerCase() < b.login.toLocaleLowerCase()
                  ? 1
                  : -1;
              })
              .map((user) => {
                return (
                  <User
                    key={user.id}
                    avatar={user.avatar_url}
                    name={user.login}
                    page={user.html_url}
                    type={user.type}
                  />
                );
              })
          : byFollowersAsc
          ? users
              .slice()
              .reverse()
              .map((user) => {
                return (
                  <User
                    key={user.id}
                    avatar={user.avatar_url}
                    name={user.login}
                    page={user.html_url}
                    type={user.type}
                  />
                );
              })
          : users.slice().map((user) => {
              return (
                <User
                  key={user.id}
                  avatar={user.avatar_url}
                  name={user.login}
                  page={user.html_url}
                  type={user.type}
                />
              );
            })}
      </div>
    </div>
  );
}
